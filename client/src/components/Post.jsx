// F5/client/src/components/Post.jsx
import React from "react";

const Post = ({ post }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-700 mt-2">{post.content}</p>
      {post.image_url && (
        <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover mt-4" />
      )}
      <div className="flex justify-between items-center mt-4">
        <button className="text-blue-500">Like</button>
        <span className="text-gray-500">{post.likes} likes</span>
      </div>
    </div>
  );
};

export default Post;
