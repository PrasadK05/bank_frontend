import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BiMenu } from "react-icons/bi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutProcess } from "../redux/auth/auth.action";

// Navbar Function
export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { data } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  // handle routing on the basis of authentication
  let handleLog = () => {
    dispatch(logoutProcess({ token: data.token }))
      .then((res) => {
        if (res) {
          toast({
            title: "Logout successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          Cookies.remove("token");
          Cookies.remove("name");
          Cookies.remove("_id");
          Cookies.remove("role");
          Cookies.remove("email");
          navigate("/");
        } else {
          toast({
            title: "Something went wrong, try later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Something went wrong, try later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      w={"100%"}
      h="80px"
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px="30px"
      bg="#FFFFFF"
      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
    >
      {/* For Desktop */}
      <HStack
        gap="20px"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        <Link to="/">
          <Text fontSize={"2xl"} fontWeight={"bold"} _hover={{transform:"scale(1.1)"}}>
            Apna Bank
          </Text>
        </Link>
      </HStack>
      <HStack
        gap="20px"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        <Button
          color="#FFFFFF"
          bg="#4299e1"
          display={data.isAuthenticated ? "block" : "none"}
          onClick={handleLog}
          _hover={{transform:"scale(1.1)"}}
        >
          Logout
        </Button>
        <Link to={`/${data.role}`}>
          {" "}
          <Avatar
            display={data.isAuthenticated ? "block" : "none"}
            name={data.name}
            _hover={{transform:"scale(1.1)"}}
          />
        </Link>
      </HStack>

      {/* For Mobile And Tablet */}
      <Text
        fontSize={"20px"}
        fontWeight={"bold"}
        display={{ base: "block", sm: "block", md: "block", lg: "none" }}
      >
        Apna Bank
      </Text>
      <Button
        ref={btnRef}
        color="#FFFFFF"
        bg="#4299e1"
        onClick={onOpen}
        display={{ base: "block", sm: "block", md: "block", lg: "none" }}
      >
        <BiMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Apna Bank</DrawerHeader>

          <DrawerBody>
            <VStack>
              <Avatar
                display={data.isAuthenticated ? "block" : "none"}
                name={data.name}
              />
              <Button
                color="#FFFFFF"
                bg="#4299e1"
                display={data.isAuthenticated ? "block" : "none"}
                onClick={handleLog}
              >
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
