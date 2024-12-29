"use client";
import { fetchAuth, handelAuthResponse } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AuthLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await fetchAuth("/auth/login", credentials);
    handelAuthResponse(res, setError, router);
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
      <input
        type="text"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
    </>
  );
};

export default AuthLogin;
