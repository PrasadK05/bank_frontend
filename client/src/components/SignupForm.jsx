import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { signupProcess } from "../redux/auth/auth.action";

let init = {
  name: "",
  email: "",
  password: "",
  mobileNumber: "",
};

// Signup Form
export default function SignupForm({role}) {
  const [data, setData] = useState(init);
  const [cp, setCP] = useState("");
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const toast = useToast();
  let { name, email, password, mobileNumber } = data;

  let handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  let handleChange2 = (e) => {
    setCP(e.target.value);
  };

  // handling form validation and signup logic
  let handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    let emailRegex =
      /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-z]{2,4})$/;
    let mobNumberRegex = /^[6-9]\d{9}$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!emailRegex.test(data.email)) {
      toast({
        title: "Provide correct email.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoad(false);
      return;
    }
    if (!mobNumberRegex.test(data.mobileNumber)) {
      toast({
        title: "Provide correct mobile number.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoad(false);
      return;
    }
    if (!passwordRegex.test(data.password)) {
      toast({
        title: "Provide strong password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoad(false);
      return;
    }
    if (data.password !== cp) {
      toast({
        title: "Password not matched.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoad(false);
      return;
    }
    //signup function
    signupProcess({...data, role})
      .then((res) => {
        if (res) {
          toast({
            title: "Account created successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate(`/login/${role}`);
        } else {
          toast({
            title: "Account creation unsuccessful.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        setData(init);
        setLoad(false);
        setCP("");
      })
      .catch((err) => {
        toast({
          title: err,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setData(init);
        setLoad(false);
        setCP("");
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
        {role} signup
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack gap="15px">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={handleChange}
            />
          </FormControl>
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
            <FormLabel>Mobile Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+91" />
              <Input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={handleChange}
              />
            </InputGroup>
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
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="cPass"
              placeholder="Confirm Password"
              onChange={handleChange2}
            />
          </FormControl>
          <Input
            type="submit"
            color="#FFFFFF"
            bg="#4299e1"
            disabled={load}
            value={load ? "...loading" : "Submit"}
            cursor={"pointer"}
          />
        </VStack>
      </form>
      <Text mt="10px">
        Already have an account?{" "}
        <Link to={`/login/${role}`}>
          <Text color="#4299e1">Login</Text>
        </Link>
      </Text>
    </Box>
  );
}
