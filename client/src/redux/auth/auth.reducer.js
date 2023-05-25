import {
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_LOADING,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT_SUCCESS,
} from "./auth.type";

const authInitalState = {
  loading: false,
  data: {
    _id: "",
    token: "",
    name: "",
    email: "",
    role: "",
    isAuthenticated: false,
  },
  error: false,
};

// Auth Reducer
export const authReducer = (state = authInitalState, action) => {
  switch (action.type) {
    case AUTH_LOG_IN_SUCCESS: {
      return {
        ...state,
        data: {
          _id: action.payload.user._id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          role: action.payload.user.role,
          token: action.payload.token,
          isAuthenticated: true,
        },
        loading: false,
        error: false,
      };
    }
    case AUTH_LOG_IN_ERROR: {
      return {
        ...state,
        error: true,
        data: {
          _id: "",
          token: "",
          name: "",
          email: "",
          role: "",
          isAuthenticated: false,
        },
        loading: false,
      };
    }
    case AUTH_LOG_IN_LOADING: {
      return {
        ...state,
        loading: true,
        data: {
          _id: "",
          token: "",
          name: "",
          email: "",
          role: "",
          isAuthenticated: false,
        },
        error: false,
      };
    }
    case AUTH_LOG_OUT_SUCCESS: {
      return {
        loading: false,
        error: false,
        data: {
          _id: "",
          token: "",
          name: "",
          email: "",
          role: "",
          isAuthenticated: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};
