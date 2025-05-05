import React, { useReducer, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { IoNotificationsCircle } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TbUserSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Notification from './Notification';

const links = [
  { to: "/", icon: <FaHome />, label: "Home" },
  { to: "/leaves", icon: <SlCalender />, label: "Leaves" },
  { to: "/admin/users", icon: <TbUserSearch />, label: "Users" },
  { to: "/admin/projects", icon: <TbUserSearch />, label: "Projects" },
  { to: "/admin/clients", icon: <TbUserSearch />, label: "Clients" }
];
const Navbar = () => {
  const [open, setIsOpened] = useReducer((flag) => !flag, false);
  const [openNotifications, toggleNotifications] = useReducer((flag) => !flag, false)
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  const getDisplayName = () => {
    return `${JSON.parse(localStorage.getItem("employee"))?.firstName} ${JSON.parse(localStorage.getItem("employee"))?.lastName
      }`;
  };



  const handleLogOut = () => {
    alert("You were logged out")
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className='w-full'>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-800 text-white p-2 rounded"
        onClick={() => setShowSidebar(prev => !prev)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className={`bg-green-800 lg:w-[20%] sm:w-[30%] w-[70%] h-[100vh] fixed z-40 transition-transform duration-300 ease-in-out
      ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} >

        <div className="flex flex-col justify-between min-h-[100dvh]  text-white ">
          <div className="">
            <img src={'/assets/IMG_6061-Photoroom.png'} alt="Company Logo" />
            {links.map((link, index) => (
              <p key={index} className="font-semibold text-lg">
                <Link to={link.to} className='flex items-center gap-2 hover:bg-white/10 p-3'>{link.icon}{link.label}</Link>
              </p>
            ))}
          </div>
          <div className="relative inline-block sm:w-11/12 sm:mx-auto pb-5">
            <div className='flex flex-col gap-4 items-start'>
              <button onClick={toggleNotifications}><IoNotificationsCircle size={28} /></button>
              {openNotifications && <div onClick={toggleNotifications}
                className={`fixed inset-0 right-0 flex items-center justify-center z-[99] transition-transform duration-700 ease-in-out
            ${openNotifications ? "slide-in" : "slide-out"}
          `}>
                <Notification />
              </div>}
              <button onClick={(e) => { e.stopPropagation(); setIsOpened(); }}>
                <FaRegCircleUser size={21} className='ml-1' />
              </button>
              {open && (
                <div className="absolute text-base text-center px-2  capitalize flex flex-col justify-between py-3
              left-10 bottom-5 bg-white text-black w-32 h-32 rounded-md" >
                  <div>
                    <p className='font-bold'>
                      {getDisplayName()}
                    </p>
                    <p className='text-sm !capitalize'>
                      {`(${JSON.parse(localStorage.getItem("employee"))?.roles[0]})`}
                    </p>

                  </div>
                  <div>
                    <p onClick={handleLogOut} className='cursor-pointer  hover:text-green-800 text-base'>Logout</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar