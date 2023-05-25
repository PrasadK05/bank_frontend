import { ACC_ERROR, ACC_LOADING, ACC_SUCCESS } from "./account.type";

const accInitalState = {
  loading: false,
  account: {},
  error: false,
};

// Auth Reducer
export const accountReducer = (state = accInitalState, action) => {
  switch (action.type) {
    case ACC_SUCCESS: {
      return {
        ...state,
        account: action.payload,
        loading: false,
        error: false,
      };
    }
    case ACC_ERROR: {
      return {
        ...state,
        error: true,
        account: {},
        loading: false,
      };
    }
    case ACC_LOADING: {
      return {
        ...state,
        loading: true,
        account: {},
        error: false,
      };
    }

    default: {
      return state;
    }
  }
};
