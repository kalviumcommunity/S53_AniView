import "./../App.css";
import { MdOutlineInsertComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

export default function Post({ e }) {
  return (
    <div className="list-ele">
      <div className="img-box">
        <img src={e.image} />
      </div>
      <div className="name-box">
        <div className="name-div title-div">
          <b>
            <p className="title">{e.title}</p>
          </b>
        </div>
        <div className="name-div category-div">
          <i>
            <p className="category">{e.category}</p>
          </i>
        </div>
      </div>
      <div className="user-div">
        <div className="like">
          <FaHeart color=" #c38b1d" size="1.7vmax" />
          <p className="like-count">25</p>
        </div>
        <div className="comment">
          <MdOutlineInsertComment color="#c38b1d" size="1.7vmax" />
          <p className="comment-count">5</p>
        </div>
      </div>
    </div>
  );
}
