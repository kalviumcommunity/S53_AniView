import "./../App.css";
import like from "./../../public/like.png";
import comment from "./../../public/comment.png";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Listing() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6969/list")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(posts);

  return (
    <>
      <div className="main-div">
        <div className="list-box">
          <div className="list-ele">
            <div className="img-box">
              <img src="https://i.postimg.cc/JzCy02Bp/one-piece-anime-icon-v2-one-piece-png-icon-thumbnail-removebg-preview.png" />
            </div>
            <div className="name-box">
              <div className="name-div title-div">
                <b>
                  <p className="title">One-Piece</p>
                </b>
              </div>
              <div className="name-div category-div">
                <i>
                  <p className="category">Adventure</p>
                </i>
              </div>
            </div>
            <div className="user-div">
              <div className="like">
                <img src={like} />
                <p className="like-count">25</p>
              </div>
              <div className="comment">
                <img src={comment} />
                <p className="comment-count">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
