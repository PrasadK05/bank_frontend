import { useEffect } from "react";
import { Box,  Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerList } from "../redux/banker/banker.action";
import CustomerTable from "../components/CustomerTable";


export default function Banker() {
  const { data } = useSelector((store) => store.auth);
  const { customerList, loading, error } = useSelector((store) => store.banker);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerList({ token: data.token }));
  }, []);
  return (
    <>
      <Box
        w={{ base: "100%", sm: "100%", md: "90%", lg: "70%" }}
        m="auto"
        mt="30px"
      >
        <Text fontSize={"2xl"} fontWeight={"bold"} ml="10px">
          Accounts
        </Text>
        <CustomerTable data={customerList} loading={loading} error={error} />        
      </Box>
    </>
  );
}
