import {
  CUSTOMER_LIST_ERROR,
  CUSTOMER_LIST_LOADING,
  CUSTOMER_LIST_SUCCESS,
} from "./banker.type";

const bankInitalState = {
  loading: false,
  customerList: [],
  error: false,
};

// Auth Reducer
export const bankerReducer = (state = bankInitalState, action) => {
  switch (action.type) {
    case CUSTOMER_LIST_SUCCESS: {
      return {
        ...state,
        customerList: action.payload,
        loading: false,
        error: false,
      };
    }
    case CUSTOMER_LIST_ERROR: {
      return {
        ...state,
        error: true,
        customerList: [],
        loading: false,
      };
    }
    case CUSTOMER_LIST_LOADING: {
      return {
        ...state,
        loading: true,
        customerList: [],
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};
