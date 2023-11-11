import React from 'react'
import {AiFillFacebook, AiFillInstagram, AiFillRedditCircle, AiFillTwitterCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='flex flex-col md:flex-row px-16 mt-4 bg-gray-800 text-white'>
        <div className='flex-1 mt-6 flex flex-col gap-4'>
          <div className='flex flex-col gap-2 border-b-2 pb-4'>
            <div className='flex flex-col gap-1'>
              <p className='font-semibold text-xl'>Contact Us</p>
              <p>Toll Free - 1800 1800 0909</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-semibold text-xl'>Connect With Us</p>
              <div className='flex gap-3'>
                <a href="" className='hover:scale-110 transition-all delay-100 ease-in-out'><AiFillFacebook size={35}/></a>
                <a href="" className='hover:scale-110 transition-all delay-100 ease-in-out'><AiFillInstagram size={35}/></a>
                <a href="" className='hover:scale-110 transition-all delay-100 ease-in-out'><AiFillTwitterCircle size={35}/></a>
                <a href="" className='hover:scale-110 transition-all delay-100 ease-in-out'><AiFillRedditCircle size={35}/></a>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 pb-4'>
            <div className='flex gap-8'>
              <Link>
                <p className='pr-6 border-r-2 hover:underline'>Privacy Policy</p>
              </Link>
              <Link>
                <p className='pr-6 border-r-2 hover:underline'>Terms and Condition</p>
              </Link>
              <Link>
                <p className='pr-6 border-r-2 hover:underline'>Feedback</p>
              </Link>
              <Link>
                <p className='hover:underline'>Safety Guide</p>
              </Link>
            </div>
            <div className='text-sm'>
              @2023 xKinG Estate, LLC. All Rights Reserved
            </div>
          </div>
        </div>
        <div className='flex-1 flex flex-col items-end mt-6 gap-3'>
            <h3 className='font-bold text-3xl'>xKinG Estate</h3>
            <p className='italic text-sm'>The campaign for building on distinction</p>
            <p>All trademarks are the property of their respective owners.</p>
        </div>
    </div>
  )
}
