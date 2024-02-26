import { Link, Navigate, useNavigate } from "react-router-dom";
import "./../App.css";
import { useCookies } from "react-cookie";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-img">
        <div className="title-box">
          <p className="home-title">Welcome to AniView</p>
          <p className="home-subtitle">
            One stop destination to discover underrated Anime
          </p>
          <button
            onClick={() => {
              navigate("/list");
            }}
            className="join-button"
          >
            Join Now
          </button>
        </div>
      </div>
    </>
  );
}
