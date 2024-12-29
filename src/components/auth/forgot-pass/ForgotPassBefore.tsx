"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handelAuthResponse, fetchAuth } from "@/utils/auth";

const ForgotPassBefore = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "" });
  const [error, setError] = useState("");
  const [isMailSent, setMailSent] = useState(false);

  useEffect(() => {
    if (isMailSent) {
      console.log("email sent");
    }
  }, [isMailSent]);

  const handlefp = async () => {
    const res = await fetchAuth("/auth/forgot-pass", credentials);
    handelAuthResponse(res, setError, router, setMailSent);
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
