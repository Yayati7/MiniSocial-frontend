import React, { useContext, useState } from "react";
import { likePost, commentPost, deleteComment, deletePost } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const PostCard = ({ post, onUpdated }) => {
  const { username } = useContext(AuthContext);
  const [comment,setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const formatDate = (date)=>{
    const d = new Date(date);
    return d.toLocaleString("en-IN",{
      day:"2-digit",
      month:"short",
      year:"numeric",
      hour:"2-digit",
      minute:"2-digit"
    });
  };

  const like = async ()=>{
    await likePost(post._id,{username});
    onUpdated();
  };

  const submitComment = async (e)=>{
    e.preventDefault();
    if(!comment) return;
    await commentPost(post._id,{username,text:comment});
    setComment("");
    onUpdated();
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(post._id, commentId, { username });
    onUpdated();
  };

  const handleDeletePost = async () => {
    await deletePost(post._id, { username });
    onUpdated();
  };

  return (
    <div className="feed-card">

      {/* HEADER */}
      <div className="post-header">
        <div className="post-user-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="avatar"
            className="avatar"
          />

          <div className="post-user-info">
            <span className="post-username">{post.username}</span>
            <span className="post-time">{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {username === post.username && (
          <button className="delete-post-btn" onClick={handleDeletePost}>
            Delete
          </button>
        )}
      </div>

      <p className="post-text"><b>{post.text}</b></p>

      {/* INTERACTION BAR */}
      <div className="interaction-bar">
        <button className="interaction-btn" onClick={like}>
          👍 {post.likes.length} Likes
        </button>

        <button
          className="interaction-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {post.comments.length} Comments
        </button>
      </div>

      {/* COMMENTS TOGGLE WRAPPER */}
      <div className={`comments-wrapper ${showComments ? "open" : ""}`}>

        <div className="comments-section">
          <div className="comments-title">
            Comments ({post.comments.length})
          </div>

          {post.comments.map((c) => (
            <div key={c._id} className="comment-row">
              <div className="comment-left">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="avatar"
                  className="comment-avatar"
                />

                <div className="comment-content">
                  <span className="comment-username">{c.username}</span>
                  <span className="comment-text">{c.text}</span>
                </div>
              </div>

              {username === c.username && (
                <button
                  className="delete-comment-btn"
                  onClick={() => handleDeleteComment(c._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={submitComment} className="comment-input-row">
          <input
            className="comment-input"
            placeholder="Write comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="comment-btn">
            Add
          </button>
        </form>

      </div>

    </div>
  );
};

export default PostCard;
