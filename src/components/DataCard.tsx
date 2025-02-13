import Image from 'next/image'
import React from 'react'

export default function DataCard({image, title, value}: {image: string, title: string, value: string}) {
  return (
    <div className='bg-black w-48 h-32 text-white flex justify-center items-center gap-5 rounded-lg shadow-lg shadow-gray-400/40'>

      <div className='h-10 w-10 rounded-full flex justify-center items-center bg-white'>
        <Image src={`/images/${image}`} alt='views' height={30} width={30} />
      </div>


      <div>
        <h1 className='text-xl font-medium'>{value}</h1>
        <p className='text-xs text-gray-300'>{title}</p>
      </div>
    </div>
  )
}
