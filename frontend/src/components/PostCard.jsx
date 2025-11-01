import React from "react";

function PostCard({ title, author, image, excerpt }) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl dark:bg-gray-900">
            <figure>
                <img src={image} alt={title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{excerpt}</p>
                <div className="card-actions justify-between">
                    <span className="text-sm text-gray-500">{author}</span>
                    <button className="btn btn-primary btn-sm">Read more</button>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
