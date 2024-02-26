import React, { useContext, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Textarea,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { loginCheck } from "../utils/loginApprove";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { setCookie } from "../utils/cookies";
import { AppContext } from "./Context";

export default function SignIn() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { login, setLogin } = useContext(AppContext);
  const FormSubmitHandler = (e) => {
    axios
      .post("http://localhost:6969/user/signin", e)
      .then((res) => {
        setCookie("username", e.username, 365);
        
        setLogin(loginCheck());
        setTimeout(() => {
          navigate("/list");
        }, 1200);
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status == 404) {
          toast.error("User not found");
        } else if (err.response.status == 401) {
          toast.error("Wrong Password");
        } else {
          toast.error("Server Error... Contact Admin");
        }
      });
  };
  return (
    <div className="form">
      <ToastContainer />
      <form className="main-form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <Text as="b" fontSize="2.3vmax">
          Sign In
        </Text>
        <Text as="b" fontSize="1vmax">
          Sign In to your Account!
        </Text>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="b" fontWeight="550">
            UserName
          </FormLabel>
          <Input
            type="text"
            borderColor="#d99d26"
            {...register("username", {
              required: "Username is required",
              maxLength: { value: 40, message: "Max 40 Chars" },
            })}
          />
          <p className="err">{errors.username?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="b" fontWeight="550">
            Password
          </FormLabel>
          <InputGroup>
            <Input
              type={showPass ? "text" : "password"}
              borderColor="#d99d26"
              {...register("password", {
                required: "pass is required",
                minLength: {
                  value: 8,
                  message: "Password must be greater than 8 letters",
                },
              })}
            />
            <InputRightElement>
              {showPass ? (
                <FaRegEye
                  className="eye"
                  onClick={() => {
                    setShowPass(false);
                  }}
                />
              ) : (
                <FaRegEyeSlash
                  className="eye"
                  onClick={() => setShowPass(true)}
                />
              )}
            </InputRightElement>
          </InputGroup>

          <p className="err">{errors.password?.message}</p>
        </FormControl>
        <Button type="submit" backgroundColor="#d99d26" color="white">
          SignIn
        </Button>
      </form>
    </div>
  );
}
