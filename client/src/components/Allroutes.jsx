import Home from "./Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Listing from "./Listing";
import PostForm from "./PostForm";
import PostDetail from "./postDetail";
import PostEdit from "./PostEdit";
export default function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<Listing />} />
      <Route path="/list/new" element={<PostForm/>}/>
      <Route path="/list/details/:id" element={<PostDetail/>}/>
      <Route path="/list/edit/:id" element={<PostEdit/>}/>
    </Routes>
  );
}
