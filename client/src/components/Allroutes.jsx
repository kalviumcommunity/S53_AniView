import Home from "./Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Listing from "./Listing";
import PostForm from "./PostForm";
export default function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<Listing />} />
      <Route path="/list/new" element={<PostForm/>}/>
    </Routes>
  );
}
