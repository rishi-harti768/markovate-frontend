"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuth, handelAuthResponse } from "@/utils/auth";
import EmailField from "../EmailField";
import PasswordStrengthField from "../PasswordField";
import FormButton from "../MainButton";
import "../auth.css";

const AuthRegister = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [criteriaMet, setCriteriaMet] = useState(false);

  const handleRegister = async () => {
    if (!credentials.email || !credentials.password) {
      setError("All fields are required");
      return;
    }

    const res = await fetchAuth("/auth/register", credentials);
    handelAuthResponse(res, setError, router);
  };

  return (
    <div className="auth-container">
      <h1 className="title">Sign Up to  <span className="title-m">Markovate</span></h1>
      <div className="content">
        <div className="email">
          <h5>Email</h5>
        </div>
        <EmailField
          value={credentials.email}
          onChange={(email) => setCredentials({ ...credentials, email: email })}
          error={!credentials.email && error ? "This field is required" : ""}
        />
        <div className="password">
          <h5>Password</h5>
        </div>
        <PasswordStrengthField
          value={credentials.password}
          onChange={(password) => setCredentials({ ...credentials, password: password })}
          error={!credentials.password && error ? "This field is required" : ""}
          onCriteriaChange={setCriteriaMet}
        />
        <FormButton text="Register" onClick={handleRegister} disabled={!criteriaMet} />
        <p>{error}</p>
      </div>
    </div>
  );
};

export default AuthRegister;
