import Image from 'next/image'
import React from 'react'
import Sidebar from './Sidebar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Header() {
    return (
        <div className='flex justify-between items-center w-screen px-6 bg-black'>
            <div className='flex gap-5 justify-center items-center'>
                <Sidebar />
                <Image src={"/images/logo.png"} alt="logo" width={80} height={80} className='hidden md:block' />
            </div>

            <div className='hidden md:flex gap-5'>
                <div className='h-8 w-8 bg-gray-600/80 rounded-full flex justify-center items-center' >

                    <Image src={"/images/message.svg"} alt='message' height={20} width={20} className='fill-white' />
                </div>
                <div className='h-8 w-8 bg-gray-600/80 rounded-full flex justify-center items-center'>
                    <Image src={"/images/notification.svg"} alt='notification' height={20} width={20} className='' />
                </div>
                <div className='flex gap-2 text-white'>
                    <div >
                        <p>Habib Ullah</p>
                        <p>Admin</p>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

            </div>
                <Image src={"/images/logo.png"} alt="logo" width={80} height={80} className='block md:hidden' />
        </div>
    )
}

export default Header