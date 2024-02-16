import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NewPost() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const FormSubmitHandler = (formData) => {
    axios
      .put(`https://aniview-gvbr.onrender.com/list/${data._id}`, formData)
      .then(() => {
        console.log("ADDED");
        navigate(`/list/details/${data._id}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occurred.");
      });
  };

  useEffect(() => {
    axios
      .get(`https://aniview-gvbr.onrender.com/list/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setValue("title", res.data.title);
        setValue("category", res.data.category);
        setValue("description", res.data.description);
        setValue("image", res.data.image);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data === "Post not found..!") {
          toast.error("Post not found!");
        } else {
          toast.error("Server side error or wrong ID..!");
        }
      });
  }, [id, setValue]); // Make sure to add `setValue` to dependencies array to avoid eslint warnings

  return (
    <div className="form">
      <ToastContainer />
      <form className="main-form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <Text as="b" fontSize="2.3vmax">
          Edit Post
        </Text>
        <Text as="i" fontSize="1vmax">
          Update according to your choice.
        </Text>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
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
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Categrory
          </FormLabel>
          <Input
            type="text"
            borderColor="#d99d26"
            {...register("category", {
              required: "Tagline is required",
            })}
          />
          <p className="err">{errors.tagline?.message}</p>
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
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
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
