"use client"

import { addTodo } from "@/actions"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useFormState } from "react-dom"

export default function AddTodoForm() {
  const [formState, formAction] = useFormState(addTodo, null)

  return (
    <form
      action={formAction}
      className="flex flex-col  justify-center gap-2 w-2/5"
    >
      <label htmlFor="description">Description</label>
      <Input id="description" name="description" type="text" />
      <Button type="submit">Add Todo</Button>
      <p className={formState?.success ? "text-green-500" : "text-red-500"}>
        {formState?.message}
      </p>
    </form>
  )
}
