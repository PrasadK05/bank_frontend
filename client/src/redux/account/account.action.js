import { ACC_ERROR, ACC_LOADING, ACC_SUCCESS } from "./account.type";
import axios from "axios";

const baseUrl = "https://banksbackend.onrender.com";

export const accDetailsSucc = (payload) => {
  return {
    type: ACC_SUCCESS,
    payload,
  };
};

export const accDetailsError = () => {
  return {
    type: ACC_ERROR,
  };
};

export const accDetailsLoad = () => {
  return {
    type: ACC_LOADING,
  };
};

export const getAcc = (data) => async (dispatch) => {
  dispatch(accDetailsLoad());
  let headers = { Authorization: `Bearer ${data.token}` };

  try {
    let res = await axios.get(`${baseUrl}/user/account`, { headers });
    if (res.status === 200) {
      dispatch(accDetailsSucc(res.data.account));
      return true;
    } else {
      dispatch(accDetailsError());
      return false;
    }
  } catch (error) {
    dispatch(accDetailsError());
    return false;
  }
};
