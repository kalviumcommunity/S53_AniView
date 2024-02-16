import "./../App.css";
// import like from "./../../public/like.png";
// import comment from "./../../public/comment.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import loaderSrc from "./../Assets/Loader";
import { Link } from "react-router-dom";

export default function Listing() {
  const [posts, setPosts] = useState([]);

  const loader = loaderSrc[Math.floor(Math.random() * 5)];

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://aniview-gvbr.onrender.com/list")
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }, 0);
  }, []);

  return (
    <>
      <div className="main-div">
        {posts.length == 0 ? (
          <div className="loader-div">
            <div>
              <img className="loader" src={loader} />
            </div>
          </div>
        ) : (
          <>
            <div className="list-box">
              {posts.map((e) => {
                return <Post e={e} />;
              })}
            </div>
            <Link to={"/list/new"}>
              <div className="new-post">
                <button className="post-button">
                  <i>New Post</i>
                </button>
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
