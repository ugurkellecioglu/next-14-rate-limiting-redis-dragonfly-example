import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import db from "@/lib/db"
import { todo } from "@/lib/schema"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { addTodo, getTodos } from "@/actions"
import UpdateButton from "@/components/UpdateButton"

export default async function Home() {
  const todos = await getTodos()

  return (
    <main className="flex min-h-screen flex-col items-center  p-24 gap-4">
      <h1>Todo App with Rate Limiting Dragonfly, Redis alternative.</h1>
      <form
        action={addTodo}
        className="flex flex-col  justify-center gap-2 w-2/5"
      >
        <label htmlFor="description">Description</label>
        <Input id="description" name="description" type="text" />
        <Button type="submit">Add Todo</Button>
      </form>

      <Table>
        <TableCaption>Todos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Description</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.description}</TableCell>
              <TableCell>{todo.completed ? "Yes" : "No"}</TableCell>
              <TableCell>
                <UpdateButton id={todo.id} completed={todo.completed} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
