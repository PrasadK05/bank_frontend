import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authLoginSucc } from "../redux/auth/auth.action";

// Route protection
export default function PrivateRoutesUser({ children }) {
  let token = Cookies.get("token");
  let _id = Cookies.get("_id");
  let name = Cookies.get("name");
  let email = Cookies.get("email");
  let role = Cookies.get("role");
  const dispatch = useDispatch();
  let user = { _id, name, email, role };

  if (token && role === "customer") {
    dispatch(authLoginSucc({ token, user }));
    return children;
  } else if (token && role === "banker") {
    return <Navigate to={"/banker"} />;
  } else {
    return <Navigate to={"/"} />;
  }
}
