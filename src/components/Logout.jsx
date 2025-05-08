import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({ toggleLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Logic to handle logout
        console.log("User logged out");
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
            <div className='bg-white w-[90%] md:w-[30%] p-5 rounded-md flex flex-col gap-5'>
                <h1 className='text-center text-lg font-bold'>Are you sure you want to logout?</h1>
                <div className='flex justify-between'>
                    <button className='bg-green-800 text-white px-3 py-2 rounded-md' onClick={handleLogout}>Yes</button>
                    <button className='bg-red-800 text-white px-3 py-2 rounded-md' onClick={toggleLogout}>No</button>
                </div>
            </div>
        </div>

    )
}

export default Logout