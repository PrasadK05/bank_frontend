import {
  CUSTOMER_TR_ERROR,
  CUSTOMER_TR_LOADING,
  CUSTOMER_TR_SUCCESS,
} from "./customer.type";

const cusInitalState = {
  loading: false,
  customerTr: [],
  error: false,
};

// Auth Reducer
export const customerReducer = (state = cusInitalState, action) => {
  switch (action.type) {
    case CUSTOMER_TR_SUCCESS: {
      return {
        ...state,
        customerTr: action.payload,
        loading: false,
        error: false,
      };
    }
    case CUSTOMER_TR_ERROR: {
      return {
        ...state,
        error: true,
        customerTr: [],
        loading: false,
      };
    }
    case CUSTOMER_TR_LOADING: {
      return {
        ...state,
        loading: true,
        customerTr: [],
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};
