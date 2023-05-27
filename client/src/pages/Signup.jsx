import React from "react";
import SignupForm from "../components/SignupForm";
import { useParams } from "react-router-dom";

export default function Signup() {
  let {role}=useParams()
  return (
    <>
      <SignupForm role={role}/>
    </>
  );
}