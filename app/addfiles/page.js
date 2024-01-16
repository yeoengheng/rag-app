'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Update the state to the first file, if one is selected
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile); // 'file' is the key expected by the server

      try {
        const response = await fetch('/api/retrieval/embedfiles/', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
        // Handle successful response here
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error here
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-indigo-300">
      <div className='flex flex-col items-center space-y-6'>
        <h2>Add your files here</h2>
        <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-6'>
          <Input type='file' onChange={handleFileChange} className='bg-white'/>
          <Button type='submit' className='w-full'>Submit</Button>
        </form>
      </div>
    </main>
  )
}
