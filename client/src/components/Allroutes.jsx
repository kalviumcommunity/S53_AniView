import Home from "./Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Listing from "./Listing";
import PostForm from "./PostForm";
import PostDetail from "./PostDetail";
import PostEdit from "./PostEdit";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import PrivateAuthRoute from "./PrivateAuthRoute";
import Users from "./Users";
import UserPosts from "./UserPosts";
export default function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<Listing />} />
      <Route
        path="/list/new"
        element={
          <PrivateAuthRoute>
            <PostForm />
          </PrivateAuthRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/list/details/:id" element={<PostDetail />} />
      <Route path="/list/edit/:id" element={<PostEdit />} />
      <Route path="/users" element={<Users />} />
      <Route path="/posts/:user" element={<UserPosts />} />
    </Routes>
  );
}
