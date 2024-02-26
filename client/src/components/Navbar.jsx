import { Link } from "react-router-dom";
import "./../App.css";
import { useContext } from "react";
import { AppContext } from "./Context";
import { deleteCookie } from "../utils/cookies";
import { loginCheck } from "../utils/loginApprove";

export default function Navbar() {
  const { login, setLogin } = useContext(AppContext);
  const logout = ()=>{
    deleteCookie("username")
    deleteCookie("auth-token")
    setLogin(loginCheck())
  }
  const loginBtn = () => {
    if (login) {
      return <div className="nav-content" onClick={logout}>Logout</div>;
      location.reload()
    }else{
      return(
        <Link to={"/signup"}>
          <div className="nav-content">Sign Up / Login</div>
          </Link>
      )
    }
  };
  return (
    <>
      <div className="nav-bar">
        <div className="logo"></div>
        <div className="nav-box">
          <Link to={"/users"}>
            <div className="nav-content">Users</div>
          </Link>
          <Link to={"/list"}>

          <div className="nav-content">List</div>
          </Link>
          {loginBtn()}
        </div>
        <div></div>
      </div>
    </>
  );
}
