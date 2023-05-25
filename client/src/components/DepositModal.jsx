import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { depositAmt, getCustomerTR } from "../redux/customer/customer.action";
import { getAcc } from "../redux/account/account.action";

export default function DepositModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, loading, error } = useSelector((store) => store.account);
  const { data } = useSelector((store) => store.auth);
  let [depoitAmt, setDepositAmt] = useState(0);
  let [depLoad, setDepLoad] = useState(false);
  const dispatch = useDispatch();

  let hanldeDepositeChange = (e) => {
    setDepositAmt(e.target.value);
  };

  let handleDeposit = () => {
    let regEx = /^[0-9]+$/;
    setDepLoad(true);
    if (!regEx.test(depoitAmt)) {
      setDepLoad(false);
      setDepositAmt(0);
      alert("Invalid Ammount");
      return
    }

    depositAmt(data.token, depoitAmt)
      .then((res) => {
        setDepLoad(false);
        setDepositAmt(0);
        alert(res);
        dispatch(getAcc({ token: data.token }));
        dispatch(getCustomerTR({ token: data.token }));
        return;
      })
      .catch((error) => {
        setDepLoad(false);
        setDepositAmt(0);
        alert(error);
        return;
      });
  };
  return (
    <>
      <Button onClick={onOpen}>Deposit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Account Balance</ModalHeader>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Text fontSize={"3xl"} display={loading ? "none" : "block"}>
              Rs. {account.balance}
            </Text>
            <Spinner
              size="lg"
              color="blue.500"
              display={loading ? "block" : "none"}
            />
            <Text colore="red" display={error ? "block" : "none"}>
              Error
            </Text>
          </Box>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter Amount</FormLabel>
              <Input
                placeholder="Enter Amount"
                name="ammount"
                value={depoitAmt}
                onChange={hanldeDepositeChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleDeposit}
              disabled={depLoad}
            >
              {depLoad ? <Spinner size="sm" /> : "Deposit"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
