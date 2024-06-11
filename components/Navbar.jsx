import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center bg-sky-500 px-8 py-3'>
        <Link className='text-white' href={"/"}>Codeolima.</Link>
        <Link className='bg-white p-2' href={"/addTask"}>Add Task</Link>
    </nav>
  )
}
