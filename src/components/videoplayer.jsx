import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const { id } = useParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-4xl p-4">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
