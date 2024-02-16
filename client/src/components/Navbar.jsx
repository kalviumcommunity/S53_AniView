import { Link } from "react-router-dom";
import "./../App.css";

export default function Navbar() {
  return (
    <>
      <div className="nav-bar">
        <div className="logo"></div>
        <div className="nav-box">
        <Link to={"/"}>

          <div className="nav-content">Home</div>
        </Link>
          <div className="nav-content">Category</div>
          <div className="nav-content">Sign Up / Login</div>
        </div>
        <div></div>
      </div>
    </>
  );
}
