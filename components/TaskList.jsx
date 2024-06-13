"use client";

import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from "react-icons/hi"

const getTasks = async() => {
    try {
        const result = await fetch('http://localhost:3000/api/v1/tasks', {
            cache: "no-store",
        });

        if(!result.ok){
            throw new Error('Failed to Fetch Tasks')
        }
        return result.json()
    } catch (error) {
        console.log('Error Loading Tasks: ', error)
    }
}

export default async function TaskList() {
    const { tasks } = await getTasks()

  return (
    <>
    {tasks.map((t) => (
        <div className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
            <div key={t._id}>
                <h2 className='text-xl font-bold'>{t.task}</h2>
                <div>{t.description}</div>
            </div>

            <div className='flex gap-2'>
                <RemoveBtn id={t._id}/>
                <Link href={`/editTask/${t._id}`}>
                    <HiPencilAlt size={24} />
                </Link>
            </div>
        </div>
    ))}
    </>
  )
}


