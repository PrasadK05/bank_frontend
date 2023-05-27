import React, { useEffect } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAcc } from "../redux/account/account.action";
export default function CustomerProfile() {
  const { account, loading, error } = useSelector((store) => store.account);
  const { data } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (data.token === "banker") {
    navigate("/banker");
  }

  useEffect(() => {
    dispatch(getAcc({ token: data.token }));
  }, []);
  return (
    <>
      <Box
        w={{ base: "100%", sm: "100%", md: "90%", lg: "70%" }}
        m="auto"
        mt="30px"
        px="30px"
        py={"15px"}
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
      >
        <Box display={account.name ? "block" : "none"}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Account Details
          </Text>
          <Text>Account holder: {account.name}</Text>
          <Text>Account Number: {account._id}</Text>
          <Text>Email: {account.email}</Text>
          <Text>Mobile Number: {account.mobileNumber}</Text>
        </Box>
        <Box
          display={loading ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
        <Box
          display={error ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text color={"red"} fontSize={"2xl"}>
            Error Occured While Loading Data
          </Text>
        </Box>
      </Box>
    </>
  );
}
