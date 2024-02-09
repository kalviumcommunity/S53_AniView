import Allroutes from "./components/Allroutes";
import Home from "./components/Home";
import Listing from "./components/Listing";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="container">
    <div className="bg-img"></div>
      <Navbar />
      <Allroutes/>
    </div>
  );
}
