import React, { useReducer, useState } from 'react'
import { FaRegCircleUser, FaUsers } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'
import { IoNotificationsCircle } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TbUserSearch } from "react-icons/tb";
import Notification from './Notification';
import { GrProjects } from 'react-icons/gr';
import { getDisplayName, getStringFromLocalStorage } from '../utils/common';
import Logout from './Logout';

const links = [
  { to: "/", icon: <FaHome />, label: "Home" },
  { to: "/leaves", icon: <SlCalender />, label: "Leaves" },
  { to: "/admin/users", icon: < TbUserSearch />, label: "Users" },
  { to: "/admin/projects", icon: <GrProjects />, label: "Projects" },
  { to: "/admin/clients", icon: <FaUsers />, label: "Clients" }
];
const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, toggleNotifications] = useReducer((flag) => !flag, false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [openConfirmLogout, toggleConfirmLogout] = useReducer(flag => !flag, false)
  const location = useLocation();

  const toggleOpen = () => {
    setOpenProfile(prev => !prev);
  };

  const toggleShowSidebar = () => {
    setShowSidebar(prev => !prev);
  }

  const handleLogOut = () => {
    toggleConfirmLogout();
    setShowSidebar(false);
  };

  return (
    <>
      {showSidebar && (
        <div
          onClick={()=>{
            toggleShowSidebar()}
          }
          className="fixed inset-0 bg-black/30  z-20 transition-opacity duration-300"
        />
      )}

      {openNotifications && (
        <div
          onClick={toggleNotifications}
          className="fixed inset-0 bg-black/30  z-40 transition-opacity duration-300"
        />
      )}

      <div className='lg:hidden bg-green-800 w-full h-[40px] fixed z-50 flex justify-between items-center px-2'>
        <button
          className="text-white rounded"
          onClick={()=>{;
            toggleShowSidebar()}
          }
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
      </div>
      <div className={`bg-green-800 lg:w-[15%] sm:w-[30%] w-[50%] h-[100vh] fixed z-40
       transition-transform duration-300 ease-in-out
      ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`} >

        <div className="flex flex-col justify-between min-h-[100dvh]  text-white ">
          <div className='lg:pt-0 pt-10'>
            <img className='2xl:w-3/5 lg:w-4/5 w-[70%] px-2 py-3' src={'/assets/logo.png'} alt="Company Logo" />
            {links.map((link, index) => (
              <p key={index} onClick={()=>setShowSidebar(false)} className={` ${location.pathname === link.to ? "bg-green-700" : ""} font-semibold text-lg`}>
                <Link to={link.to} className='flex items-center gap-2 hover:bg-white/10 p-3'>
                  {link.icon}{link.label}
                </Link>
              </p>
            ))}

          </div>
          <div className="relative inline-block sm:w-11/12 sm:mx-auto pb-5">
            <div className='flex flex-col gap-4 items-start'>
              <button onClick={() => {
                toggleNotifications();
                setShowSidebar(false)
              }}><IoNotificationsCircle size={28} className='ml-1.5' /></button>
              <button onClick={(e) => { e.stopPropagation(); toggleOpen(); }}>
                <FaRegCircleUser size={21} className='ml-2' />
              </button>
              {openProfile && (
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
                    <p onClick={handleLogOut} className='cursor-pointer hover:text-green-800 text-base'>Logout</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {openNotifications && <div onClick={toggleNotifications}
        className={`fixed inset-0 right-0 flex items-center justify-center z-[99] transition-transform duration-700 ease-in-out
            ${openNotifications ? "slide-in" : "slide-out"}
          `}>
        <Notification />
      </div>}


      {openConfirmLogout && <Logout toggleLogout={toggleConfirmLogout} />}

    </>
  )
}

export default Navbar