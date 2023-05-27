import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginProcess } from "../redux/auth/auth.action";

let init = {
  email: "",
  password: "",
};

// Login Function
export default function LoginForm({ role }) {
  const { loading } = useSelector((store) => store.auth);
  const [log, setLog] = useState(init);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  let { email, password } = log;

  let handleChange = (e) => {
    let { name, value } = e.target;
    setLog({ ...log, [name]: value });
  };

  // Handling login flow and form validation
  let handleSubmit = (e) => {
    e.preventDefault();
    let reg =
      /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-z]{2,4})$/;
    if (!reg.test(log.email)) {
      alert("provide correct email");
      return;
    }

    // dispatching async action to auth reducer
    dispatch(loginProcess(log))
      .then((res) => {
        if (res) {
          toast({
            title: "Login successful.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          if (res === "customer") {
            navigate("/customer");
          } else if (res === "banker") {
            navigate("/banker");
          }
        } else {
          toast({
            title: "Login unsuccessful.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        setLog(init);
      })
      .catch((err) => {
        toast({
          title: "Login unsuccessful.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLog(init);
      });
  };
  return (
    <Box
      w={{ base: "90%", sm: "90%", md: "70%", lg: "35%" }}
      m="auto"
      boxShadow={
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      }
      borderRadius={"10px"}
      mt="30px"
      p="20px"
    >
      <Text fontSize={"3xl"} fontWeight={"bold"} align={"center"}>
        {role} login
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack gap="15px">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleChange}
            />
          </FormControl>
          <Input
            type="submit"
            color="#FFFFFF"
            bg="#4299e1"
            disabled={loading}
            value={loading ? "...loading" : "Submit"}
            cursor={"pointer"}
          />
        </VStack>
      </form>
      <Text mt="10px">
        Don't have an account?{" "}
        <Link to={`/signup/${role}`}>
          <Text color="#4299e1">Signup</Text>
        </Link>
      </Text>
    </Box>
  );
}
