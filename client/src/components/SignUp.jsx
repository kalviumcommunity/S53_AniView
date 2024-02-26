import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import "./../App.css";
import { useContext, useState } from "react";

import axios from "axios";
import { setCookie } from "../utils/cookies";
import { AppContext } from "./Context";
import { loginCheck } from "../utils/loginApprove";

export default function SignUp() {
  const navigate = useNavigate();
  const { login, setLogin } = useContext(AppContext);
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(errors);
  const FormSubmitHandler = (e) => {
    axios
      .post("http://localhost:6969/user", e)
      .then((res) => {
        setCookie("username", e.username, 365);
        setLogin(loginCheck());
        setTimeout(() => {
          navigate("/list");
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
      <form className="main-form">
        <Text as="b" fontSize="2.3vmax">
          New User
        </Text>
        <Text as="b" fontSize="1.2vmax">
          Create an Account!
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
          <p className="err">{errors.userName?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="b" fontWeight="550">
            Email
          </FormLabel>
          <Input
            type="email"
            borderColor="#d99d26"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <p className="err">{errors.Email?.message}</p>
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
          SignUp
        </Button>
        <div>
          <p>Already have an account ? </p>
        </div>
        <Button
          type="submit"
          backgroundColor="black"
          border="3px #d99d26 solid"
          color="#d99d26"
          onClick={() => navigate("/signin")}
        >
          SignIn
        </Button>
      </form>
    </div>
  );
}
