import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='w-full p-4 m-0 bg-white'>
      <Link to="/">
        <div className='text-xl font-bold'>Workout Buddy</div>
      </Link>
    </div>
  )
}

export default Navbar
