import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PostForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  //   console.log(watch());
  const FormSubmitHandler = (data) => {
    axios
      .post("https://aniview-gvbr.onrender.com/list", data)
      .then(() => {
        console.log("ADDED");
        navigate("/list");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form">
      <form className="main-form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <Text as="b" fontSize="2.3vmax">
          New Post
        </Text>
        <Text as="b" fontSize="1vmax">
          Enter the following details!
        </Text>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="b" fontWeight="550">
            Title
          </FormLabel>
          <Input
            type="text"
            borderColor="#d99d26"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 40, message: "Max 40 Chars" },
            })}
          />
          <p className="err">{errors.title?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="b" fontWeight="550">
            Category
          </FormLabel>
          <Input
            type="text"
            borderColor="#d99d26"
            {...register("category", {
              required: "Category is required",
            })}
          />
          <p className="err">{errors.category?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="b" fontWeight="550">
            Image Link
          </FormLabel>
          <Input
            type="text"
            borderColor="#d99d26"
            {...register("image", {
              required: "Provide a valid image url",
            })}
          />
          <p className="err">{errors.image?.message}</p>
        </FormControl>
        <Button type="submit" backgroundColor="#d99d26" color="white">
          Submit
        </Button>
      </form>
    </div>
  );
}
