"use client";
import { fetchAuth, handelAuthResponse } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

interface resDataObject {
  error: {
    email: string;
    password: string;
    general: string;
  };
}

const AuthLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [resData, setResData] = useState<resDataObject>({
    error: {
      email: "",
      password: "",
      general: "",
    },
  });

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetchAuth("/auth/login", credentials);
    handelAuthResponse(
      res,
      router,
      setResData as Dispatch<SetStateAction<object>>
    );
  };

  return (
    <>
      <h1>Login</h1>
      <input
        type="text"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <p>{resData.error.email}</p>
      <input
        type="text"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <p>{resData.error.password}</p>
      <p>{resData.error.general}</p>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default AuthLogin;
