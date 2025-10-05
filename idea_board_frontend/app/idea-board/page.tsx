import AddIdea from '@/app/idea-board/(components)/AddIdea'
import { Sparkles } from 'lucide-react'
import React from 'react'
import ListIdeas from './(components)/ListIdeas'

const IdeaBoard = () => {
  return (
    <section className='container mx-auto p-4 pt-16'>
        <AddIdea />
       
       {/* Beautiful Ideas Section Header */}
      <div className='mt-12 sm:mt-16 mb-8 flex flex-col items-center'>
        {/* Decorative Line */}
        <div className='w-full max-w-4xl flex items-center gap-4 mb-6'>
          <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300' />
          <div className='flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100 shadow-sm'>
            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md'>
              <Sparkles className='w-4 h-4 text-white' fill='currentColor' />
            </div>
            <h3 className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Ideas
            </h3>
          </div>
          <div className='flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300' />
        </div>
        
        <p className='text-sm text-gray-500 text-center max-w-md'>
          Explore creative thoughts shared by our community
        </p>
      </div>

      {/* Ideas List Container */}
      <div className='mt-8 flex flex-col gap-4 justify-center items-center'>
        {/* Your ideas will go here */}
        <ListIdeas />
      </div>
    </section>
  )
}

export default IdeaBoard