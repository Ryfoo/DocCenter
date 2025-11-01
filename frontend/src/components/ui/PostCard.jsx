import React from "react";

function PostCard({ title, author, banner, excerpt, avatar }) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl dark:bg-gray-900">
            <figure>
                <img src={banner} alt={title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-gray-900 dark:text-white text-lg font-bold">{title}</h2>
                <p className="dark:text-base-200">{excerpt}</p>
                <div className="card-actions justify-between flex items-center">
                    <div class="avatar">
                        <div class="mask mask-squircle w-16">
                            <img src={avatar} />
                        </div>
                    </div>
                    <span className="text-sm text-gray-500 ">{author}</span>
                    <button className="btn btn-primary w-24 h-24 rounded-full sm:rounded-md sm:w-52 sm:h-10 bg-[#d44bb7]">Read</button>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
