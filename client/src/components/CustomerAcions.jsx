import { Box } from "@chakra-ui/react";
import React from "react";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

export default function CustomerAcions() {
  return (
    <>
      <Box
        display={"flex"}
        w={{ base: "100%", sm: "100%", md: "90%", lg: "70%" }}
        m="auto"
        mt="30px"
        justifyContent={"center"}
        alignItems={"center"}
        gap="20px"
      >
       <DepositModal/>
       <WithdrawModal/>
      </Box>
    </>
  );
}
