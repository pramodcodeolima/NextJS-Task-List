"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addTask() {
  const [ task, setTask ] = useState('')
  const [ description, setDescription ] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!task || !description) {
      alert('Task and Description are Required...');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task, description }),
      });

      if (res.ok){
        router.push("/")
      }else{
        throw new Error('Failed to Create New Task...')
      }
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
            onChange={(e) => setTask(e.target.value)}
            value={task}
        />

        <input
            className='border border-slate-500 px-8 py-2'
            type='text'
            placeholder='Task Description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
        />

        <button type="submit" className='bg-green-600 text-white py-3 px-6 w-fit'>Add Task</button>
    </form>
  )
}
