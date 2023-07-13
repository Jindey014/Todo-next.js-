import Link from "next/link"
import { prisma } from "@/db"
import { TodoItem } from "@/components/TodoItem"

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id:string, complete:boolean){
  "use server"

  await prisma.todo.update({where:{id}, data:{complete}})
  // console.log(id, complete)
}

export default async function Home() {

  const todos = await getTodos()
  // await prisma.todo.create({data:{title:"test", complete:false}})
  return (<>
    <header className="flex justify-between">
      <h1 className="text-2xl">Todos</h1>
      <Link href="/new" className="border border-slate-100 text-slate-300 rounded px-2 py-1
  outline-none hover:bg-slate-700">New</Link>
    </header>

    <ul className="pl-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
      ))}
    </ul>
  </>
  )
}