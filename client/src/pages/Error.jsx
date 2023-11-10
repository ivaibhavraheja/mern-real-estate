import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='flex items-center justify-center max-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-black h-screen overflow-y-hidden'>
        <div className='flex flex-col items-center justify-center gap-y-4 text-white'>
            <h2 className='text-7xl font-bold'>404</h2>
            <h4 className='text-3xl font-semibold'>Oops! Page Not Found</h4>
            <p className='font-semibold'>The page you were looking for does not exist. You may have
                mistyped the address or the page may have moved.
            </p>
            <Link to={"/"}>
                <p className='opacity-70 bg-pink-700 p-3 rounded-md hover:opacity-90'>Back To Home</p>
            </Link>
        </div>
        
    </div>
  )
}
