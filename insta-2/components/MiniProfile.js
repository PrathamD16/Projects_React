import React from 'react'
import {useSession, signOut} from 'next-auth/react'

export default function MiniProfile() {
  const {data: session} = useSession()
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img src= {session?.user?.image} alt='Profile_Photo' className='rounded-full border p-[2px] w-14 h-14'/>
        <div className='flex-1 mx-4'>
            <h2 className='font-bold'>{session?.user?.username}</h2>
            <h3 className='text-sm text-gray-400'>Welcome to instagram 2.0</h3>
        </div>
        <button onClick={signOut} className='text-blue-400 text-sm font-semibold mx-4'>Sign out</button>
    </div>
  )
}
