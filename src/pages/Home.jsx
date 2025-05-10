import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { getStringFromLocalStorage } from "../utils/common";
import { FiUser } from "react-icons/fi";
import { FaArrowRight, FaBriefcase } from "react-icons/fa";
import { MdBusiness } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";

const actions = [
  {
    "title": "Leave for approval",
    "description": "20 April 2025 - 25 April 2025 by Jane Doe",
    "type": "leave",
    "date": "2024-04-20",
    "link": "/leaves"
  },
  {
    "title": "New user awaiting verification",
    "description": "Requested by John Doe on 08 May 2025",
    "type": "user",
    "date": "2025-05-08",
    "link": "/admin/users"
  }
];

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 text-center flex flex-col items-center justify-center gap-4 border-t-4 border-green-800">

      <p className="sm:text-2xl text-lg font-semibold text-green-800 ">{value}</p>
      <div className="flex items-center md:gap-2 gap-1">
        <p className="text-green-800">{icon}</p>
        <p className="md:text-sm text-xs text-gray-600 whitespace-nowrap">{label}</p>
      </div>

    </div>
  );
}

function ActivityFeed() {
  const items = [
    { name: "Michael Brown", action: "added user", time: "2 hrs ago" },
    { name: "New Project", action: "added Q1", time: "5 hrs ago" },
    { name: "ABC Inc", action: "added Client", time: "1 day ago" },
    { name: "Sarah Johnson", action: "applied leave", time: "2 days ago" },
    { name: "John Smith", action: "approved leave", time: "3 days ago" },
    { name: "Michael Brown", action: "added user", time: "2 hrs ago" },
    { name: "New Project", action: "added Q1", time: "5 hrs ago" },

  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 text-black row-span-3">
      <h2 className="text-green-800 font-semibold mb-2">Recent Activity</h2>
      <ul className="text-sm space-y-3  ">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>
              <span className="font-medium ">{item.name}</span> {item.action}
            </span>
            <span className="text-gray-500">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PendingActions() {
  return (
    <div className="row-span-2 bg-white shadow-md rounded-2xl p-4 w-full">
      <h2 className="font-semibold mb-2 text-green-800">Pending Actions</h2>
      <ul className="space-y-2">
        {actions.map((action, index) => (
          <li
            key={index}
            className="border border-gray-200 rounded-xl p-4 hover:shadow transition flex items-start justify-between"
          >
            <div>
              <h3 className="font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
            {action.link && (
              <a
                href={action.link}
                className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1 mt-1"
              >
                View <FaArrowRight className="text-xs" />
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Announcements() {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-black row-span-2">
      <h2 className="text-green-800 font-semibold mb-2">Announcements</h2>
      <div className="text-sm space-y-1">
        <p>📢 New leave policy effective from May 1st</p>
        <p>📢 Office closed on May 10th</p>
      </div>
    </div>
  );
}

function QuickAction({ label, link = "/" }) {
  return (
    <Link to={link}> <button className="w-full
      bg-green-800 text-white rounded-xl md:p-4 py-3 hover:bg-green-700 font-medium shadow lg:text-base text-xs lg:whitespace-normal whitespace-nowrap">
      {label}
    </button>
    </Link>
  );
}

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="min-h-screen text-green-900 lg:p-6 p-2">
        <header className="text-center mb-8">
          <h1 className="md:text-3xl text-xl font-bold text-black">Employee Management System</h1>
          <p className="mt-2 sm:text-base text-sm text-black">All About People, All in One Place</p>
        </header>

        <div className="md:p-6 p-2 bg-gray-50 min-h-screen">
          <header className="flex justify-between items-center mb-6">
            <h1 className="md:text-2xl text-lg font-bold text-green-800">Welcome, {getStringFromLocalStorage('employee', false)?.firstName}</h1>
          </header>

          <section className="grid lg:grid-cols-4 grid-cols-2 gap-4 mb-6">
            <StatCard icon={<FiUser />} label="Total Users" value="128" />
            <StatCard icon={<FaBriefcase />} label="Active Projects" value="34" />
            <StatCard icon={<MdBusiness />} label="Clients" value="56" />
            <StatCard icon={<FaMoneyBillWave/>} label="Monthly Revenue" value="$24.5K" />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ActivityFeed />
            <PendingActions />

            <Announcements />
            <div className="grid grid-cols-2 sm:gap-2 gap-1">
              <QuickAction link="leaves" label="Apply Leave" />
              <QuickAction link="admin/projects" label="Add New Project" />
              <QuickAction link="leaves" label="View Holidays" />
              <QuickAction link="admin/users" label="Onboard Employee" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
