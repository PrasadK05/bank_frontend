import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Customer from "../pages/Customer";
import PrivateRoutesUser from "./PrivateRoutesUser";
import Banker from "../pages/Banker";
import PrivateRouteBanker from "./PrivateRouteBanker";
import AccountTransaction from "../pages/AccountTransaction";
import Home from "../pages/Home";

// Managing all available routes
export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/customer"
        element={
          <PrivateRoutesUser>
            <Customer />
          </PrivateRoutesUser>
        }
      ></Route>
      <Route
        path="/banker"
        element={
          <PrivateRouteBanker>
            <Banker />
          </PrivateRouteBanker>
        }
      ></Route>
      <Route
        path="/userTransaction/:id"
        element={
          <PrivateRouteBanker>
            <AccountTransaction />
          </PrivateRouteBanker>
        }
      ></Route>
      <Route path="/signup/:role" element={<Signup />}></Route>
      <Route path="/login/:role" element={<Login />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}
