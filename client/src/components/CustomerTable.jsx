import {
  Box,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function CustomerTable({ data, loading, error }) {
  let navigate = useNavigate();
  let ridirection = (id) => {
    navigate(`/userTransaction/${id}`);
  };
  return (
    <>
      <TableContainer display={loading ? "none" : "block"}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Sr. No</Th>
              <Th>Name</Th>
              <Th>Account ID</Th>
              <Th>Email</Th>
              <Th>Mobile Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((el, i) => {
                return (
                  <Tr key={el._id} onClick={() => ridirection(el._id)} cursor={"pointer"} _hover={{color:"#4299e1"}}>
                    <Td>{i + 1}</Td>
                    <Td>{el.name}</Td>
                    <Td>{el._id}</Td>
                    <Td>{el.email}</Td>
                    <Td>{el.mobileNumber}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
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
    </>
  );
}
