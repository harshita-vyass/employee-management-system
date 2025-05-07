import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className=''>
            <Navbar />
            <div className='md:ml-[20%]  md:py-0 py-10'>
        <Outlet />
      </div>
            </div>
    )
}

export default AdminLayout