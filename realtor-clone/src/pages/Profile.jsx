import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email
  });
  const {name, email} = formData
  return (
    <>
      <section className='w-full md:w-[40%] flex justify-center items-center flex-col mx-auto'>
        <h1 className='text-center my-6 text-3xl font-bold'>My Profile</h1>
        <div className='w-full'>
          <form>
            <input type="text" id='name' value={name} className="w-full rounded bg-white text-gray-700 text-xl border border-gray-300 disabled"/>
            <input type="text" id='email' value={email} className="w-full rounded bg-white text-gray-700 text-xl border border-gray-300 disabled my-6"/>
            <div className='flex justify-between whitespace-nowrap text-sm md:text-lg'>
              <p>Do you want to change your name? <span className='ml-1 text-red-600 hover:text-red-800 transition ease-in-out cursor-pointer'>Edit</span></p>
              <p className='ml-1 text-blue-600 hover:text-blue-800 transition ease-in-out cursor-pointer'>Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
