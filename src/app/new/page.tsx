import { prisma } from "@/db"
import { redirect } from "next/navigation"
import Link from "next/link"

async function createTodo(data:FormData){
"use server"
const title = data.get("title")?.valueOf()// name of input field below
if(typeof title !=="string"|| title.length===0){
    throw new Error("Invalid Title")
}
await prisma.todo.create({data:{
    title,complete:false
    
}})
redirect("/")
}

export default function Page(){
    return (
        <>
            <header className="flex justify-between">
      <h1 className="text-2xl">New</h1>
    </header>
    <form className="flex gap-2 flex-col" action={createTodo}>
        <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-50"/>
        <div className="flex gap-2 justify-end">
            <Link href=".." className="border border-slate-100 text-slate-300 rounded px-2 py-1
                outline-none hover:bg-slate-700">Cancel</Link>
            <button type="submit" className="border border-slate-100 text-slate-300 rounded px-2 py-1
                outline-none hover:bg-slate-700">Create</button>
        </div>
    </form>
    </>
    )
}