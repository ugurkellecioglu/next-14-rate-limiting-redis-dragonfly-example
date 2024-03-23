"use client"

import db from "@/lib/db"
import { Button } from "./ui/button"
import { todo } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { updateTodo } from "@/actions"

export default async function UpdateButton({
  id,
  completed,
}: {
  id: number
  completed: boolean
}) {
  return (
    <Button onClick={async () => updateTodo(id, completed)}>Update Todo</Button>
  )
}
