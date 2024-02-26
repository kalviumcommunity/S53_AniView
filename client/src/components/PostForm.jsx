import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../utils/cookies";

export default function PostForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const token = getCookie("auth-token");
  //   console.log(watch());
  const FormSubmitHandler = (data) => {
    axios
      .post("http://localhost:6969/list", data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        console.log("ADDED");
        navigate("/list");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const username = getCookie("username");
  useEffect(() => {
    setValue("username", username);
  });
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
            Username
          </FormLabel>
          <Input
            isDisabled
            type="text"
            borderColor="#d99d26"
            {...register("username")}
          />
        </FormControl>
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
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Description
          </FormLabel>
          <Textarea
            borderColor="#d99d26"
            {...register("description", {
              required: "Description is required",
            })}
          />
          <p className="err">{errors.description?.message}</p>
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
