import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-indigo-300">
      <div className='flex justify-center items-center flex-col gap-4'>
        <h2 className='text-3xl text-blue-900 font-bold'> RAG APP</h2>
        <Input></Input>
      </div>
    </main>
  )
}
