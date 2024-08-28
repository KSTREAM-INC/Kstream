import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ClockIcon, CogIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import kstreamLogo from '../assets/logo.svg';
import profile from "../assets/profile.svg";
import Inquery from "../assets/inquery.svg";
// import VideoCard from './videocard';

const Dashboard = () => {

   const [selectedVideo, setSelectedVideo] = useState(null);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleVideoClick = (video) => {setSelectedVideo(video);};
  const closePopup = () => {setSelectedVideo(null);};
  const toggleSidebar = () => {setIsSidebarOpen(!isSidebarOpen);};
   const handleQuestionChange = (e) => {setQuestion(e.target.value);};

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://9c08-102-88-82-40.ngrok-free.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAnswer(data.response); // Assuming the API returns a 'response' field
    } catch (error) {
      console.error('Error:', error);
      setAnswer('Sorry, there was an error processing your question.');
    } finally {
      setIsLoading(false);
    }
  };

  const videos = [
    {
      id: 'bKzI7w5_fDU',
      title: 'What is INTERNET COMPUTER? ICP Crypto Explained! (Animated)',
      thumbnail: '../assets/icp2thumbnail.png',
      author: 'Crypto Square',
      duration: '10 mins',
      views: '16k',
    },
    {
      id: 'rybpe-EwKmw',
      title: 'Why ICP Canisters and Motoko Backends Excel in Cybersecurity',
      thumbnail: '../assets/whyICPcanister.png',
      author: 'HIVE FORENSICS A.I.',
      duration: '3:16 mins',
      views: '37k',
    },
    {
      id: 'mr15Xzb1Ook',
      title: 'Tailwind in 100 seconds',
      thumbnail: '../assets/tailwind_tumbnail.png',
      author: 'FireShip',
      duration: '2:20 mins',
      views: '765k',
    }]

    const recommended =[{
      id: 'wqGOdinaC5s',
      title: 'Raoul Pal: "Internet Computer Will Be MASSIVE!" - DFINITY ICP Crypto 2023',
      thumbnail: '../assets/icpexplode.png',
      author: 'Bitcoin Bros',
      duration: '8.04 mins',
      views: '64k',
    },
    {
      id: 'XgsOKP224Zw',
      title: 'An Overview of the Internet Computer',
      thumbnail: '../assets/icptalk.png',
      author: 'DFINITY',
      duration: '6:28 mins',
      views: '77k',
    },
    {
      id: 'cckBId4AXz0',
      title: 'The Truth About ICP Crypto: The Future of Internet & Blockchain in 4 Minutes | Elmin Ferati',
      thumbnail: '../assets/ICPtruth.png',
      author: 'Elmin Ferati - Finance',
      duration: '3:45 mins',
      views: '7.2k',
    }
  ];
  



  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className="h-dvh w-64 bg-gray-900 ">
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

      {/* Main Content */}
      <div className=" relative flex-1 p-6 text-white bg-gray-900">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Home</h1>
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full p-2 pl-10 text-sm bg-gray-800 rounded-md focus:outline-none"
            />
          </div>
          <img src={profile} alt="Profile" className="ml-4 w-10 h-10 rounded-full" />
        </div>

        <div className="mb-8">
          <h2 className="text-lg mb-4">For you</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Video Cards */}

            {videos.map((video) => (
          <div
            key={video.id}
            className="p-4 rounded-lg shadow-sm bg-gray-800 shadow-gray-800 cursor-pointer"
            onClick={() => handleVideoClick(video)}
          >
            <img src={video.thumbnail} alt={video.title} className="mb-4 rounded-lg" />
            <h3 className="text-sm font-semibold">{video.title}</h3>
            <p className="text-xs text-gray-400">{video.author} • {video.duration} • {video.views} views</p>
          </div>
        ))}
            {/* <div className="p-4 rounded-lg shadow-sm bg-gray-800 shadow-gray-800 cursor-pointer">
              <img src="../assets/icp2thumbnail.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
              <h3 className="text-sm font-semibold">Understanding the concept of ICP in 2024</h3>
              <p className="text-xs text-gray-400">Amelia don • 5 hrs 8 mins • 345k views</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-gray-800 shadow-gray-800 cursor-pointer">
              <img src="../assets/icpthumbnail.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
              <h3 className="text-sm font-semibold">Understanding the concept of ICP in 2024</h3>
              <p className="text-xs text-gray-400">Amelia don • 5 hrs 8 mins • 345k views</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-gray-800 shadow-gray-800 cursor-pointer" onClick={}>
              <img src="../assets/tailwind_tumbnail.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
              <h3 className="text-sm font-semibold">Understanding the concept of ICP in 2024</h3>
              <p className="text-xs text-gray-400">Amelia don • 5 hrs 8 mins • 345k views</p>
            </div> */}
            {/* Add more video cards as needed */}
          </div>
          {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-30">
          <div className="relative bg-[#1c1c1e] p-8 rounded-lg w-full max-w-2xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
            className='mx-auto'
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideo.id}`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className="text-lg font-semibold mt-4">{selectedVideo.title}</h3>
            <p className="text-sm">{selectedVideo.author} • {selectedVideo.duration} • {selectedVideo.views} views</p>
          </div>
        </div>
      )}
        </div>

        <div>
          <h2 className="text-lg mb-4">Recommended videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Video Cards */}
            {recommended.map((video) => (
          <div
            key={video.id}
            className="p-4 rounded-lg shadow-sm bg-gray-800 shadow-gray-800 cursor-pointer"
            onClick={() => handleVideoClick(video)}
          >
            <img src={video.thumbnail} alt={video.title} className="mb-4 rounded-lg" />
            <h3 className="text-sm font-semibold">{video.title}</h3>
            <p className="text-xs text-gray-400">{video.author} • {video.duration} • {video.views} views</p>
          </div>
        ))}
            {/* <div className="bg-gray-800 p-4 rounded-lg cursor-pointer">
              <img src="../assets/icpexplode.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
              <h3 className="text-sm font-semibold">Secret hacks to manipulating content in tech</h3>
              <p className="text-xs text-gray-400">Samcodes90 • 2 hrs 12 mins • 36.9k views</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg cursor-pointer">
              <img src="../assets/icptalk.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
              <h3 className="text-sm font-semibold">Secret hacks to manipulating content in tech</h3>
              <p className="text-xs text-gray-400">Samcodes90 • 2 hrs 12 mins • 36.9k views</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg cursor-pointer">
              <img src="../assets/bull_thumbnail.png" alt="Video Thumbnail" className="mb-4 rounded-lg" />
              <h3 className="text-sm font-semibold">Secret hacks to manipulating content in tech</h3>
              <p className="text-xs text-gray-400">Samcodes90 • 2 hrs 12 mins • 36.9k views</p>
            </div> */}
            {/* Add more video cards as needed */}
       
        </div>
        {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-30">
          <div className="relative bg-[#1c1c1e] p-8 rounded-lg w-full max-w-2xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
            className='mx-auto'
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideo.id}`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className="text-lg font-semibold mt-4">{selectedVideo.title}</h3>
            <p className="text-sm">{selectedVideo.author} • {selectedVideo.duration} • {selectedVideo.views} views</p>
          </div>
        </div>
      )}


              
        </div>

        <button
          onClick={toggleSidebar}
          className="z-50 absolute inline bottom-0 right-10 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          <img src={Inquery} alt="inquery" className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <div
          className={` z-40 fixed top-0 right-0 w-80 h-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4">
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button> 
            <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
            <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-32 p-2 border rounded bg-gray-800 text-white focus:outline-none"
              placeholder="Type your question here..."
              value={question}
              onChange={handleQuestionChange}
            ></textarea>
            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            </form>
            {answer && (
            <div className="mt-4">
              <h3 className="font-bold">Answer:</h3>
              <p className="mt-2">{answer}</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
