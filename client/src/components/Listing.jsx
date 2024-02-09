import "./../App.css";
import like from "./../../public/like.png";
import comment from "./../../public/comment.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";

export default function Listing() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://aniview-gvbr.onrender.com/list")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="main-div">
        <div className="list-box">
          {posts.map((e) => {
            return (
             <Post e={e}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
