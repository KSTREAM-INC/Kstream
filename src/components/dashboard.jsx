import React from 'react';
import { NavLink} from 'react-router-dom';
import { HomeIcon, ClockIcon, CogIcon, CreditCardIcon } from "@heroicons/react/24/outline";
// import Dashboard from './hello';
import kstreamLogo from '../assets/logo.svg';
import profile from   "../assets/profile.svg"


const Dashboard = () => {
  return (
    <div className='flex'>
    <div className="w-64 h-screen text-white flex flex-col">
      <div className="flex items-center justify-center h-16 shadow-lg">
      <img src={kstreamLogo} alt="Logo" className="w-20 h-12 mt-10" />
      </div>
      <nav className="mt-10">
        <NavLink to="/" className="flex items-center px-6 py-2 mt-3 hover:bg-gray-700 hover:text-white text-[#d7d34a]">
          <HomeIcon className="w-5 h-5 mr-3 text-[#d7d34a]" />
          Home
        </NavLink>
        <NavLink to="/history" className="flex items-center px-6 py-2 mt-3 text-gray-400 hover:bg-gray-700 hover:text-white">
          <ClockIcon className="w-5 h-5 mr-3" />
          History
        </NavLink>
        <NavLink to="/assistant" className="flex items-center px-6 py-2 mt-3 text-gray-400 hover:bg-gray-700 hover:text-white">
          <CogIcon className="w-5 h-5 mr-3" />
          Assistant
        </NavLink>
        <NavLink to="/wallet" className="flex items-center px-6 py-2 mt-3 text-gray-400 hover:bg-gray-700 hover:text-white">
          <CreditCardIcon className="w-5 h-5 mr-3" />
          Wallet
        </NavLink>
      </nav>

    </div>
    <div className="flex-1 p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Home</h1>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full p-2 pl-10 text-sm bg-gray-800 rounded-md focus:outline-none"
          />
        </div>
        <img src={profile} alt="Logo" className="left-3 top-2 text-gray-400"/>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg mb-4">For you</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Example Video Card */}
          <div className="p-4 rounded-lg shadow-sm bg-gray-800 shadow-gray-800 cursor-pointer">
            <img src="../assets/icp2thumbnail.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
            <h3 className="text-sm font-semibold">Understanding the concept of ICP in 2024</h3>
            <p className="text-xs text-gray-400">Amelia don • 5 hrs 8 mins • 345k views</p>
          </div>
          <div className="p-4 rounded-lg shadow-sm bg-gray-800 shadow-gray-800 cursor-pointer">
            <img src="../assets/icpthumbnail.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
            <h3 className="text-sm font-semibold">Understanding the concept of ICP in 2024</h3>
            <p className="text-xs text-gray-400">Amelia don • 5 hrs 8 mins • 345k views</p>
          </div>
          <div className="p-4 rounded-lg shadow-sm bg-gray-800  shadow-gray-800 cursor-pointer">
            <img src="../assets/tailwind_tumbnail.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
            <h3 className="text-sm font-semibold">Understanding the concept of ICP in 2024</h3>
            <p className="text-xs text-gray-400">Amelia don • 5 hrs 8 mins • 345k views</p>
          </div>
          {/* Add more video cards as needed */}
        </div>
      </div>

      <div>
        <h2 className="text-lg mb-4">Recommended videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Example Video Card */}
          <div className="bg-gray-800 p-4 rounded-lg  cursor-pointer">
            <img src="../assets/icpexplode.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
            <h3 className="text-sm font-semibold">Secret hacks to manipulating content in tech</h3>
            <p className="text-xs text-gray-400">Samcodes90 • 2 hrs 12 mins • 36.9k views</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg  cursor-pointer">
            <img src="../assets/icptalk.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
            <h3 className="text-sm font-semibold">Secret hacks to manipulating content in tech</h3>
            <p className="text-xs text-gray-400">Samcodes90 • 2 hrs 12 mins • 36.9k views</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg  cursor-pointer" >
            <img src="../assets/bull_thumbnail.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
            <h3 className="text-sm font-semibold">Secret hacks to manipulating content in tech</h3>
            <p className="text-xs text-gray-400">Samcodes90 • 2 hrs 12 mins • 36.9k views</p>
          </div>
          {/* Add more video cards as needed */}
        </div>
      </div>
    </div>
      </div>
  );
};

export default Dashboard;
