import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <motion.div
      className="p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-10">
        Community Posts
      </h2>

      {posts.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center text-gray-600 p-6 border-2 border-dashed rounded-lg bg-white shadow-md"
        >
          No posts yet. Be the first to post!
        </motion.div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="font-bold text-xl text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              {post.image && (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="text-sm text-gray-500 mt-4">
                Posted on {new Date(post.createdAt).toLocaleString()}
              </div>
              <div className="flex items-center justify-between mt-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition">
                  Like
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition">
                  Comment
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default PostList;
