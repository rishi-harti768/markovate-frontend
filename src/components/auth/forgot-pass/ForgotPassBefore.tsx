"use client";
import { authforgotpassbefore } from "@/utils/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassBefore = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "" });
  const [error, setError] = useState("");

  const handlefp = async () => {
    const res = await authforgotpassbefore(credentials);

    //check empty fields
    if (res.status == 200 && res.responseText == "EMPTY_FIELDS") {
      setError("Error: Empty fields");
      return;
    }

    //email format
    if (res.status == 200 && res.responseText == "INVALID_EMAIL_FORMAT") {
      setError("Error: Invalid email format");
      return;
    }

    //check if acc exists
    if (res.status == 200 && res.responseText == "EMAIL_NOT_FOUND") {
      setError("Error: Email not found");
      return;
    }

    //other errors
    if (res.status == 500) {
      setError("Error: Internal server error");
      return;
    }

    if (res.status == 200 && res.responseText == "MAIL_SENT") {
      setError("");
      console.log("email sent");
    }
  };

  return (
    <>
      <h1>Forgot Password</h1>
      <input
        type="text"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <button onClick={handlefp}>Send Email</button>
      <p>{error}</p>
    </>
  );
};

export default ForgotPassBefore;
