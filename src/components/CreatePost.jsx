import React, { useState, useContext } from "react";
import { createPost } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const CreatePost = ({ onPostCreated }) => {
  const { username } = useContext(AuthContext);
  const [text, setText] = useState("");

  const submitPost = async (e) => {
    e.preventDefault();
    if (!text) return;

    await createPost({ username, text });
    setText("");
    onPostCreated();
  };

  return (
    <div className="create-post-card">

      <div className="create-post-header">
        Create Post
      </div>

      <form onSubmit={submitPost}>
        <textarea
          className="create-post-input"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Divider ABOVE button */}
        <div className="divider"></div>

        <div className="create-post-footer">
          <button className="post-btn">
            Post
          </button>
        </div>
      </form>

    </div>
  );
};

export default CreatePost;
