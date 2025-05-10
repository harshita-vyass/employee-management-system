import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <Navbar />

      <div className='lg:ml-[15%] lg:py-0 py-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout