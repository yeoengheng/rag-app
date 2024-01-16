'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';

export default function Home() {
    const [inputValue, setInputValue] = useState(""); // Initialize with an empty string
    const [answerValue, setAnswerValue] = useState("Response will appear here...")
    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Form submitted with input:", inputValue);
        try {
            const response = await fetch('api/retrieval/chat/',{
                method:'POST',
                headers:{
                    'Content-Type':'text-plain'
                },
                body:inputValue

            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
      
              const responseData = await response.json();
              console.log('Response:', responseData);
              // Handle successful response here
              setAnswerValue(responseData.message)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    const isInputEmpty = !inputValue.trim()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center py-12 px-6 bg-indigo-300">
            <div className='flex flex-col items-center justify-center w-[60vh] space-y-4 bg-white shadow-md rounded-lg p-6'>
                <h2 className='text-3xl font-semibold text-gray-800'>Ask about your Chinese Zodiac</h2>
                <form onSubmit={handleSubmit} className='flex flex-col w-full items-center space-y-4'>
                    <input 
                        type='text' 
                        className='border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 rounded-md w-full h-12 px-4' 
                        value={inputValue} 
                        onChange={onInputChange}
                    />
                    <button 
                        type='submit' 
                        disabled={isInputEmpty}
                        className='w-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white rounded-md py-2 disabled:opacity-25'
                    >
                        Ask Away
                    </button>
                </form>
                <div className='w-full mt-4 p-4 border-t border-gray-300'>
                    <p className='text-gray-600'>{answerValue}</p>
                </div>
            </div>
        </main>
    )
}
