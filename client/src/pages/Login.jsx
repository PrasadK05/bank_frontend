import React from "react";
import LoginForm from "../components/LoginForm";
import { useParams } from "react-router-dom";

export default function Login() {
  let { role } = useParams();
  return (
    <>
      <LoginForm role={role} />
    </>
  );
}
