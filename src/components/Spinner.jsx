import React from 'react'
import loading from "../assets/loading.svg"


export default function Spinner() {
  return (
    <div className='flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 z-50 bg-black
    bg-opacity-50'>
        <div>
      <img src={loading} alt="loading..."  className='h-24'/>
        </div>
    </div>
  )
}
