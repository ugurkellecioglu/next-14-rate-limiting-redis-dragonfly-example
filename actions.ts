"use server"
import { revalidatePath } from "next/cache"
import db from "./lib/db"
import { todo } from "./lib/schema"
import { desc, eq } from "drizzle-orm"

export const getTodos = async () => {
  const todos = await db.select().from(todo).orderBy(desc(todo.createdAt))

  return todos
}
export const addTodo = async (formData: FormData) => {
  const description = formData.get("description") as string

  await db.insert(todo).values({
    description,
  })

  revalidatePath("/")
}

export const updateTodo = async (id: number, completed: boolean) => {
  await db.update(todo).set({ completed: !completed }).where(eq(todo.id, id))
  revalidatePath("/")
}
