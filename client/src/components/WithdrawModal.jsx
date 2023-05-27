import { useState } from "react";
import {
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
  useDisclosure,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerTR, withdrawAmt } from "../redux/customer/customer.action";
import { getAcc } from "../redux/account/account.action";

export default function WithdrawModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, loading, error } = useSelector((store) => store.account);
  const { data } = useSelector((store) => store.auth);
  let [withAmt, setWithAmt] = useState(0);
  let [withLoad, setWithLoad] = useState(false);
  const dispatch = useDispatch();

  let hanldeWithdrawChange = (e) => {
    setWithAmt(e.target.value);
  };

  let handleWithdraw = () => {
    let regEx = /^[0-9]+$/;
    setWithLoad(true);

    if (!regEx.test(withAmt)) {
      setWithLoad(false);
      setWithAmt(0);
      alert("Invalid Ammount");
      return;
    }
    if (account.balance < Number(withAmt)) {
      setWithLoad(false);
      setWithAmt(0);
      alert("Insufficient Funds");
      return;
    }
    withdrawAmt(data.token, withAmt)
      .then((res) => {
        setWithLoad(false);
        setWithAmt(0);
        alert(res);
        dispatch(getAcc({ token: data.token }));
        dispatch(getCustomerTR({ token: data.token }));
        return;
      })
      .catch((error) => {
        setWithLoad(false);
        setWithAmt(0);
        alert(error);
        return;
      });
  };
  return (
    <>
      <Button
        onClick={onOpen}
        color="#FFFFFF"
        bg="#ed64a6"
        _hover={{ transform: "scale(1.1)" }}
      >
        Withdraw
      </Button>
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
                value={withAmt}
                onChange={hanldeWithdrawChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              color="#FFFFFF"
              bg="#ed64a6"
              mr={3}
              onClick={handleWithdraw}
              disabled={withLoad}
              _hover={{ transform: "scale(1.1)" }}
            >
              {withLoad ? <Spinner size="sm" /> : "withdraw"}
            </Button>
            <Button onClick={onClose} _hover={{ transform: "scale(1.1)" }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
