import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddPost } from "./pages/AddPost";
import { EditPost } from "./pages/EditPost";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { PostDetail } from "./pages/PostDetail";
import { Posts } from "./pages/Posts";
import { Register } from "./pages/Register";
import { Layout } from "./components/Layout";
import { getMe } from "./store/features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="posts" element={<Posts />} />
        <Route path=":id" element={<PostDetail />} />
        <Route path=":id/edit" element={<EditPost />} />
        <Route path="new" element={<AddPost />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <ToastContainer position="bottom" />
    </Layout>
  );
}
