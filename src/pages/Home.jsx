import React, {  } from "react";
import { getStringFromLocalStorage } from "../utils/common";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen text-green-900 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black ">Leave Management System</h1>
        <p className=" mt-2 text-black">Manage your time off easily and efficiently</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {getStringFromLocalStorage("employee", false)?.firstName || "User"}!</h2>
          <p>You have 3 pending leave requests.</p>
          <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            <Link to="/leaves" >View Leave Requests</Link>
          </button>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left bg-green-200 hover:bg-green-300 px-4 py-2 rounded">
              <Link to="/leaves" >Apply for Leave</Link>
              </button>
            </li>
            <li>
              <button className="w-full text-left bg-green-200 hover:bg-green-300 px-4 py-2 rounded">
              <Link to="/leaves" >View Leave Balance</Link>
              </button>
            </li>
            <li>
              <button className="w-full text-left bg-green-200 hover:bg-green-300 px-4 py-2 rounded">
              <Link to="/leaves" >Leave History</Link>
              </button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
