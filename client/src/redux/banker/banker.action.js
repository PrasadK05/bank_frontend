import axios from "axios";
import {
  CUSTOMER_LIST_ERROR,
  CUSTOMER_LIST_LOADING,
  CUSTOMER_LIST_SUCCESS,
} from "./banker.type";

const baseUrl = "https://banksbackend.onrender.com";

export const customerListSucc = (payload) => {
  return {
    type: CUSTOMER_LIST_SUCCESS,
    payload,
  };
};

export const customerListError = () => {
  return {
    type: CUSTOMER_LIST_ERROR,
  };
};

export const customerListLoad = () => {
  return {
    type: CUSTOMER_LIST_LOADING,
  };
};

export const getCustomerList = (data) => async (dispatch) => {
  dispatch(customerListLoad());
  let headers = { Authorization: `Bearer ${data.token}` };

  try {
    let res = await axios.get(`${baseUrl}/banker/customers`, { headers });
    if (res.status === 200) {
      dispatch(customerListSucc(res.data.customers));
      return true;
    } else {
      dispatch(customerListError());
      return false;
    }
  } catch (error) {
    dispatch(customerListError());
    return false;
  }
};

export const getSingleCustomersTr = async (token, id) => {
  let headers = { Authorization: `Bearer ${token}` };
  try {
    let res = await axios.get(`${baseUrl}/banker/customerTransactions/${id}`, {
      headers,
    });
    if (res.status === 200) {
      return res.data.transactions;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};
