'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTaskForm({id, task, description}) {
  const [ newTask, setNewTask ] = useState(task);
  const [ newDescription, setNewDescription ] = useState(description)
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ task: newTask, description: newDescription })
      })

      if(!res.ok){
        throw new Error('Failed to Update Task...')
      }
      router.refresh();
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
            className='border border-slate-500 px-8 py-2'
            type='text'
            placeholder='Task Title'
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
        />

        <input
            className='border border-slate-500 px-8 py-2'
            type='text'
            placeholder='Task Description'
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
        />

        <button type="submit" className='bg-green-600 text-white py-3 px-6 w-fit'>Update Task</button>
    </form>
  )
}
