import React from "react";
import { useNavigate } from "react-router-dom";

function PostCard({ postId, title, author, banner, excerpt, avatar, onReadMore }) {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl dark:bg-gray-900 transition-all duration-300 overflow-hidden">
      {/* Banner */}
      <figure className="relative">
        <img src={banner} alt={title} className="w-full h-56 object-cover" />
      </figure>

      {/* Body */}
      <div className="card-body space-y-2">
        <h2 className="card-title text-gray-900 dark:text-white text-lg font-bold">
          {title}
        </h2>
        <p className="dark:text-gray-300 text-gray-600 text-sm line-clamp-3">
          {excerpt}
        </p>

        {/* Author + Read more */}
        <div className="card-actions justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="mask mask-squircle w-10 h-10">
                <img src={avatar} alt={author} />
              </div>
            </div>
            <span className="text-sm text-gray-500">{author}</span>
          </div>

          <button
            onClick={onReadMore}
            className="btn btn-primary bg-[#d44bb7] hover:bg-[#b63b9c] text-white px-6 py-2 rounded-xl text-sm font-semibold"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
