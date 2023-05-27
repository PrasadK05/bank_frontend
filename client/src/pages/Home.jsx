import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box
      w={{ base: "100%", sm: "100%", md: "90%", lg: "70%" }}
      m="auto"
      mt="30px"
      display={"flex"}
      flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }}
      justifyContent={"space-between"}
      gap={{ base: "20px", sm: "20px", md: "4%", lg: "4%" }}
    >
      <Box
        border={"4px solid #4299e1"}
        w={{ base: "100%", sm: "100%", md: "48%", lg: "48%" }}
        px="10px"
        py="10px"
        borderRadius={"10px"}
        _hover={{transform:"scale(1.1)"}}
      >
        <Box
          w="100%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FaUserAlt size="250px" color="#4299e1" />
        </Box>
        <Box
          w="100%"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          gap="15px"
          pl={"20px"}
          mt="10px"
        >
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Customer Section
          </Text>
          <Link to={"/login/customer"}>
            <Button w="150px" color="#FFFFFF" bg="#4299e1">
              Customer Login
            </Button>
          </Link>
          <Link to={"/signup/customer"}>
            <Button w="150px" color="#FFFFFF" bg="#4299e1">
              Customer Signup
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        border={"4px solid #ed64a6"}
        w={{ base: "100%", sm: "100%", md: "48%", lg: "48%" }}
        px="10px"
        py="10px"
        borderRadius={"10px"}
        _hover={{transform:"scale(1.1)"}}
      >
        <Box
          w="100%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <RiAdminFill size="250px" color="#ed64a6" />
        </Box>
        <Box
          w="100%"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          gap="15px"
          pl={"20px"}
          mt="10px"
        >
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Banker Section
          </Text>
          <Link to={"/login/banker"}>
            <Button w="150px" color="#FFFFFF" bg="#ed64a6">
              Banker Login
            </Button>
          </Link>
          <Link to={"/signup/banker"}>
            <Button w="150px" color="#FFFFFF" bg="#ed64a6">
              Banker Signup
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
