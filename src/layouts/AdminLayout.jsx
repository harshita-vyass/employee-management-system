import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className=''>
            <Navbar />
            <div className='ml-[20%]'>
        <Outlet />
      </div>
            </div>
    )
}

export default AdminLayout