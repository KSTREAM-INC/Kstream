import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div onClick={handleCardClick} className="p-4 rounded-lg shadow-sm bg-gray-800 shadow-gray-800 cursor-pointer">
      <img src={video.thumbnail} alt="Video Thumbnail" className="mb-4 rounded-lg" />
      <h3 className="text-sm font-semibold">{video.title}</h3>
      <p className="text-xs text-gray-400">{video.author} • {video.duration} • {video.views} views</p>
    </div>
  );
};

export default VideoCard;
