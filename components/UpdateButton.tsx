"use client"

import db from "@/lib/db"
import { Button } from "./ui/button"
import { todo } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { updateTodo } from "@/actions"
import { toast } from "./ui/use-toast"

export default async function UpdateButton({
  id,
  completed,
}: {
  id: number
  completed: boolean
}) {
  const onClick = async () => {
    const res = await updateTodo(id, completed)
    console.log("res", res)
    toast({
      description: res?.message,
      variant: res?.success ? "default" : "destructive",
    })
  }

  return <Button onClick={onClick}>Update Todo</Button>
}
