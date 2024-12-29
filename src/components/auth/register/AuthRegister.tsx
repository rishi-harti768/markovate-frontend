"use client";
import { authRegister } from "@/utils/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuth, handelAuthResponse } from "@/utils/newArch/auth";

const AuthRegister = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetchAuth("/auth/register", credentials);
    handelAuthResponse(res, setError, router);
  };

  return (
    <>
      <h1>Register</h1>
      <input
        type="text"
        onChange={(e) => {
          setError("");
          setCredentials({ ...credentials, email: e.target.value });
        }}
      />
      <input
        type="text"
        onChange={(e) => {
          setError("");
          setCredentials({ ...credentials, password: e.target.value });
        }}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{error}</p>
    </>
  );
};

export default AuthRegister;
