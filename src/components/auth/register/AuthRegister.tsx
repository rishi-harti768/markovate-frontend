"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuth, handelAuthResponse } from "@/utils/auth";

interface resDataObject {
  error: {
    email: string;
    password: string;
    general: string;
  };
}

const AuthRegister = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [resData, setResData] = useState<resDataObject>({
    error: {
      email: "",
      password: "",
      general: "",
    },
  });

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetchAuth("/auth/register", credentials);
    handelAuthResponse(
      res,
      router,
      setResData as Dispatch<SetStateAction<object>>
    );
  };

  return (
    <>
      <h1>Register</h1>
      <input
        type="text"
        onChange={(e) => {
          setCredentials({ ...credentials, email: e.target.value });
        }}
      />
      <p>{resData.error.email}</p>
      <input
        type="text"
        onChange={(e) => {
          setCredentials({ ...credentials, password: e.target.value });
        }}
      />
      <p>{resData.error.password}</p>
      <p>{resData.error.general}</p>
      <button onClick={handleRegister}>Register</button>
    </>
  );
};

export default AuthRegister;
