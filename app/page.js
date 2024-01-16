'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useState } from 'react'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = (e)=>{
    setInputValue(e.target.value)
  }
  // add a function to call the POST request 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Assuming your API endpoint is '/api/test/route'
    const response = await fetch('/api/test/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: inputValue }),
    });

    // Handle the response if necessary
    const data = await response.json();
    console.log(data); // or handle the response data as needed
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-indigo-300">
      <div className='flex justify-center w-5/12 items-center flex-col gap-4'>
        <h2 className='text-3xl text-blue-900 font-bold'> RAG APP</h2>
        <form className='w-full flex justify-center flex-col gap-4 items-center' onSubmit={handleSubmit}>
          <Input className='bg-white w-full h-24' value={inputValue} onChange={handleInputChange}/>
          <Button type='submit' className='w-full'>Enter</Button>
        </form>
      </div>
    </main>
  )
}
