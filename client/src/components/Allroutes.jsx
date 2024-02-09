import Home from "./Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Listing from "./Listing";
export default function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<Listing />} />
    </Routes>
  );
}
