"use client";
import { authforgotpassafter } from "@/utils/auth";
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
    const res = await authforgotpassafter(credentials);
    // is empty
    if (res.status == 200 && res.responseText == "EMPTY_FIELDS") {
      setError("Error: Empty fields");
      return;
    }

    // email format
    if (res.status == 200 && res.responseText == "INVALID_EMAIL_FORMAT") {
      setError("Error: Invalid email format");
      return;
    }

    // password strength
    if (res.status == 200 && res.responseText == "WEAK_PASSWORD") {
      setError("Error: Weak password");
      return;
    }

    // account not found
    if (res.status == 200 && res.responseText == "EMAIL_NOT_FOUND") {
      setError("Error: Email not found");
      return;
    }

    // check token
    if (res.status == 200 && res.responseText == "INVALID_TOKEN") {
      setError("Error: Invalid token");
      return;
    }

    // other errors
    if (res.status == 500) {
      setError("Error: Internal server error");
      return;
    }
    if (res.status == 200 && res.responseText == "PASSWORD_CHANGED") {
      setError("");
      router.replace("/auth");
    }
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
