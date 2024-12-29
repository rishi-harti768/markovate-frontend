"use client";
import { authforgotpassafter } from "@/utils/auth";
import { fetchAuth, handelAuthResponse } from "@/utils/newArch/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPassAfter = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const [credentials, setCredentials] = useState({
    email: email,
    token: token,
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetchAuth("/auth/forgot-pass/change-pass", credentials);
    handelAuthResponse(res, setError, router);
  };
  return (
    <>
      <h1>Your new Password</h1>
      <input
        type="text"
        onChange={(e) => {
          setError("");
          setCredentials({ ...credentials, password: e.target.value });
        }}
      />
      <button onClick={handleSubmit}>Change</button>
      <p>{error}</p>
    </>
  );
};

export default ForgotPassAfter;
