"use client";
import { fetchAuth, handelAuthResponse } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EmailField from "../EmailField";
import FormButton from "../MainButton";
import PasswordStrengthField from "../PasswordField";
import "../auth.css";

const AuthLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [criteriaMet, setCriteriaMet] = useState(false);

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      setError("All fields are required");
      return;
    }

    const res = await fetchAuth("/auth/login", credentials);
    handelAuthResponse(res, setError, router);
  };

  const handleForgotPassword = () => {
    router.push("../auth/forgot-pass");
  };

  const handleRegister = () => {
    router.push("../auth/register");
  };

  return (
    <div className="auth-container">
      <h1 className="title">Sign In to  <span className="title-m">Markovate</span></h1>
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
          <h5 className="fp" onClick={handleForgotPassword}>Forgot Password?</h5>
        </div>
        <PasswordStrengthField
          value={credentials.password}
          onChange={(password) => setCredentials({ ...credentials, password: password })}
          error={!credentials.password && error ? "This field is required" : ""}
          onCriteriaChange={setCriteriaMet}
        />
        <FormButton text="Login" onClick={handleLogin} disabled={!criteriaMet} />
        <p>{error}</p>
     
     <h4>* If you are new to Markovate, please</h4>
        <div className="footer">
          <p onClick={handleRegister}> <span className="blue-text">Register to </span> Markovate</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
