"use server"
import { revalidatePath } from "next/cache"
import db from "./lib/db"
import { todo } from "./lib/schema"
import { desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { getIp } from "./helpers/getIp"
import client from "./lib/redis"
import { redirect } from "next/navigation"

export const checkRateLimit = async () => {
  const ip = getIp()
  if (!ip) {
    return {
      success: false,
      message: "IP not found",
    }
  }

  const currentExecution = Number(await client.GET(ip)) || 0
  if (currentExecution > 4) {
    return {
      success: false,
      message: "Rate limit exceeded check back in 60 seconds",
    }
  }

  await client.SET(ip, currentExecution + 1, {
    EX: 60,
  })

  return {
    success: true,
  }
}

export const getTodos = async () => {
  const todos = await db.select().from(todo).orderBy(desc(todo.createdAt))

  return todos
}
export const addTodo = async (prevState: any, formData: FormData) => {
  const rateLimit = await checkRateLimit()
  if (!rateLimit.success) {
    return rateLimit
  }

  const description = formData.get("description") as string

  await db.insert(todo).values({
    description,
  })
  revalidatePath("/")

  return {
    success: true,
    message: "Todo added",
  }
}

export const updateTodo = async (id: number, completed: boolean) => {
  const rateLimit = await checkRateLimit()
  if (!rateLimit.success) {
    return rateLimit
  }

  await db.update(todo).set({ completed: !completed }).where(eq(todo.id, id))
  revalidatePath("/")
  return {
    success: true,
    message: "Todo updated",
  }
}
