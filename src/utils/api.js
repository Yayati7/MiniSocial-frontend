import axios from "axios";

const API = axios.create({
  baseURL: "https://minisocial-backend-hj8i.onrender.com/api",
});

/* ---------- AUTH ---------- */
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);

/* ---------- POSTS ---------- */
export const createPost = (data) => API.post("/posts", data);
export const fetchPosts = () => API.get("/posts");
export const likePost = (id, data) => API.post(`/posts/${id}/like`, data);
export const commentPost = (id, data) => API.post(`/posts/${id}/comment`, data);
export const deleteComment = (postId, commentId, data) =>
  API.delete(`/posts/${postId}/comment/${commentId}`, { data });
export const deletePost = (postId, data) =>
  API.delete(`/posts/${postId}`, { data });


export default API;
