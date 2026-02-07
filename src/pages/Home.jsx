import React, { useEffect, useState, useContext } from "react";
import "../styles/feed.css";
import { fetchPosts } from "../utils/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useRef } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const socketRef = useRef(null);

  const loadPosts = async () => {
    const res = await fetchPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();

    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("new_post", () => {
      loadPosts();
    });

    socketRef.current.on("post_updated", () => {
      loadPosts();
    });

    return () => socketRef.current.disconnect();
  }, []);

  return (
    <div className="feed-container">

      {/* NEW MODERN HEADER */}
      <div className="home-header">
        <div>
          <h2 className="home-title">Welcome, {username}</h2>
          <span className="home-subtitle">Here’s your social feed</span>
        </div>

        <button
          className="logout-btn"
          onClick={()=>{
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <CreatePost onPostCreated={loadPosts} />

      {posts.map(p => (
        <PostCard key={p._id} post={p} onUpdated={loadPosts}/>
      ))}
    </div>
  );
};

export default Home;
