import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./../App.css";
import { AppContext } from "./Context";
import { getCookie } from "../utils/cookies";

export default function PostDetail() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`https://aniview-gvbr.onrender.com/list/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data == "Post not found..!") {
          toast.error("Post not found!");
        } else {
          toast.error("Server side error or wrong ID..!");
        }
      });
  }, []);

  const deletePost = () => {
    let result = confirm("Are you sure?");
    console.log(result);
    if (result) {
      axios
        .delete(`https://aniview-gvbr.onrender.com/list/${data._id}`)
        .then((res) => {
          console.log(res);
          toast.success("Deleted");
          setTimeout(() => {
            navigate("/list");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editPost = () => {
    navigate(`/list/edit/${data._id}`);
  };

  const username = getCookie("username");
  const adminOptions = () => {
    if (data.username == username) {
      return (
        <div className="buttons">
          <Button
            type="submit"
            onClick={editPost}
            background="#c38b1d"
            color="white"
            boxShadow="1px 1px 15px 1px #c38b1d"
          >
            Edit
          </Button>
          <Button
            type="submit"
            onClick={deletePost}
            background="#c38b1d"
            color="white"
            boxShadow="1px 1px 15px 1px #c38b1d"
          >
            Delete
          </Button>
        </div>
      );
    }
  };

  return (
    <>
      <div className="post-detail-div">
        <div className="post-detail-box">
          <div className="post-img-div">
            <img src={data.image} />
          </div>
          <div className="rest-detail">
            <p className="post-title">
              <u>{data.title}</u>
            </p>
            <p className="post-description">{data.description}</p>
            {adminOptions()}
          </div>
        </div>
      </div>
    </>
  );
}
