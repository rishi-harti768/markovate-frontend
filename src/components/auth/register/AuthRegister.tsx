"use client";
import { authLogin, authRegister } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthRegister = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await authRegister(credentials);

    // check empty fields
    if (res.status == 400 && res.responseText == "EMPTY_FIELDS") {
      setError("Error: Empty fields");
      return;
    }

    // email format
    if (res.status == 400 && res.responseText == "INVALID_EMAIL_FORMAT") {
      setError("Error: Invalid email format");
      return;
    }

    // password strength
    if (res.status == 400 && res.responseText == "WEAK_PASSWORD") {
      setError("Error: Weak password");
      return;
    }

    // check if acc exists
    if (res.status == 400 && res.responseText == "EMAIL_ALREADY_EXISTS") {
      setError("Error: Email already exists");
      return;
    }

    // other errors
    if (res.status == 500) {
      setError("Error: Internal server error");
      return;
    }

    // success
    if (res.status == 200 && res.responseText == "AUTHED") {
      setError("");
      router.replace("/");
    }
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
