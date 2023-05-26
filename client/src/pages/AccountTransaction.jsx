import React, { useEffect, useState } from "react";
import { getSingleCustomersTr } from "../redux/banker/banker.action";
import { useSelector } from "react-redux";
import { Box, Text } from "@chakra-ui/react";
import TransactionTable from "../components/TransactionTable";
import { useParams } from "react-router-dom";

export default function AccountTransaction() {
  let [trans, setTrans] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  const { data } = useSelector((store) => store.auth);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getSingleCustomersTr(data.token, id)
      .then((res) => {
        if (res) {
          setTrans(res);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Box
        w={{ base: "100%", sm: "100%", md: "90%", lg: "70%" }}
        m="auto"
        mt="30px"
      >
        <Text fontSize={"2xl"} fontWeight={"bold"} ml="10px">
          Transaction
        </Text>
        <TransactionTable data={trans} loading={loading} error={error} />
      </Box>
    </>
  );
}
