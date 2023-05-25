import React, { useEffect } from "react";
import CustomerProfile from "../components/CustomerProfile";
import CustomerAcions from "../components/CustomerAcions";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerTR } from "../redux/customer/customer.action";
import TransactionTable from "../components/TransactionTable";

export default function Customer() {
  const { data } = useSelector((store) => store.auth);
  const { customerTr, loading, error } = useSelector(
    (store) => store.customerTr
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerTR({ token: data.token }));
  }, []);
  return (
    <>
      <CustomerProfile />
      <CustomerAcions />
      <Box w={{ base: "100%", sm: "100%", md: "90%", lg: "70%" }} m="auto" mt="30px">
        <TransactionTable error={error} loading={loading} data={customerTr} />
      </Box>
    </>
  );
}
