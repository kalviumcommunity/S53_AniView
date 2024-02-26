
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const userClick = (username) => {
    navigate(`/posts/${username}`);
  };
  useEffect(() => {
    axios
      .get("https://aniview-gvbr.onrender.com/user")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="users-main">
      {data.length == 0 ? (
        <div>Loading</div>
      ) : (
        <>
          <Text fontSize="4vmax" color="white" textDecoration="underline">
            All Users
          </Text>
          <UnorderedList className="users">
            {data.map((e, i) => {
              return (
                <ListItem
                  fontSize="1.5vmax"
                  key={i}
                  onClick={() => {
                    userClick(e.username);
                  }}
                  cursor="pointer"
                  color="white"
                >
                  {e.username}
                </ListItem>
              );
            })}
          </UnorderedList>
        </>
      )}
    </div>
  );
}
