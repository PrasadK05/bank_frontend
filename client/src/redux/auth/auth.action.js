import {
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_LOADING,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT_SUCCESS,
} from "./auth.type";
import Cookies from "js-cookie";
import axios from "axios";

const baseUrl = "https://banksbackend.onrender.com";

// login success action
export const authLoginSucc = (payload) => {
  return {
    type: AUTH_LOG_IN_SUCCESS,
    payload,
  };
};

// login fail action
export const authLoginFail = () => {
  return {
    type: AUTH_LOG_IN_ERROR,
  };
};

// login loading action
export const authLoginLoad = () => {
  return {
    type: AUTH_LOG_IN_LOADING,
  };
};

// logout success action
export const authLogout = () => {
  return {
    type: AUTH_LOG_OUT_SUCCESS,
  };
};

// async signup function
export const signupProcess = async (data) => {
  try {
    let res = await axios.post(`${baseUrl}/signup`, data);

    if (res.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// async login function
export const loginProcess = (data) => async (dispatch) => {
  dispatch(authLoginLoad());
  try {
    let res = await axios.post(`${baseUrl}/login`, data);

    if (res.data.status) {
      dispatch(authLoginSucc(res.data));
      Cookies.set("token", res.data.token);
      Cookies.set("_id", res.data.user._id);
      Cookies.set("name", res.data.user.name);
      Cookies.set("email", res.data.user.email);
      Cookies.set("role", res.data.user.role);
      return true;
    } else {
      dispatch(authLoginFail());
      return false;
    }
  } catch (error) {
    dispatch(authLoginFail());
    return false;
  }
};

// async logout function
export const logoutProcess = (data) => async (dispatch) => {
    console.log(data);
  dispatch(authLoginLoad());
  let headers = { Authorization: `Bearer ${data.token}` };
  try {
    let res = await axios.get(`${baseUrl}/logout`, {headers});
    // if (res.data.status) {
    //   dispatch(authLogout());
    //   return true;
    // } else {
    //   dispatch(authLoginFail());
    //   return false;
    // }
    console.log(res);
    dispatch(authLogout());
    return true
  } catch (error) {
    dispatch(authLoginFail());
    return false;
  }
};
