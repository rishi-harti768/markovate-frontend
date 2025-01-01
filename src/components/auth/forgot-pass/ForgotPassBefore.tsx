"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handelAuthResponse, fetchAuth } from "@/utils/auth";
import "../auth.css";
import EmailField from "../EmailField";
import FormButton from "../MainButton";

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

  function handleLogin(): void {
    router.push("./ForgotPassAfter");
  }

  return (
    <div className="auth-container">
      <h1 className="title">Forgot Password</h1>
      <div className="content">
        <div className="email-field">
          <h5>Email</h5>
          <EmailField
            value={credentials.email}
            onChange={(email) => setCredentials({ email: email })}
            error={!credentials.email && error ? "This field is required" : ""}
          />
        </div>
       
           <FormButton text="Send Email" onClick={handleLogin}  />
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassBefore;
