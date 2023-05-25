import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Customer from "../pages/Customer";
import PrivateRoutes from "./PrivateRoutes";

// Managing all available routes
export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Customer />
          </PrivateRoutes>
        }
      ></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      {/* <Route path="/banker" element={<Login />}></Route> */}
    </Routes>
  );
}
