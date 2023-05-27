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

export default function TransactionTable({ data, loading, error }) {
  return (
    <>
      <TableContainer display={loading ? "none" : "block"} mt="20px">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Sr. No</Th>
              <Th>Date</Th>
              <Th>Deposit</Th>
              <Th>Withdrawl</Th>
              <Th>Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((el, i) => {
                return (
                  <Tr key={el._id}>
                    <Td>{i + 1}</Td>
                    <Td>{el.createdAt}</Td>
                    <Td color={"green"}>
                      {el.type === "deposit" ? el.ammount : "-"}
                    </Td>
                    <Td color={"red"}>
                      {el.type === "withdraw" ? el.ammount : "-"}
                    </Td>
                    <Td>{el.balance}</Td>
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
