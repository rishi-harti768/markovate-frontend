"use client";

import { fetchAuth, handelAuthResponse } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import EmailField from "../EmailField";
import PasswordStrengthField from "../PasswordField";
import "../auth.css";
import FormButton from "../MainButton";

const ForgotPassAfter = ({ email, token }: { email: string; token: string }) => {
  const [credentials, setCredentials] = useState({
    email: email,
    token: token,
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [criteriaMet, setCriteriaMet] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const router = useRouter();

  // Check if passwords match whenever one of them changes
  useEffect(() => {
    setPasswordsMatch(credentials.password === confirmPassword);
  }, [credentials.password, confirmPassword]);

  // Handle the form submission
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Additional validation
    if (!criteriaMet) {
      setError("Password does not meet the criteria.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    // API call to change the password
    try {
      const res = await fetchAuth("/auth/forgot-pass/change-pass", credentials);
      handelAuthResponse(res, setError, router);
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="title">Your new Password</h1>
      <div className="content">
        <div className="email">
          <h5>Email</h5>
        </div>
        <EmailField
          value={credentials.email}
          disabled={true}
          onChange={() => {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="password">
          <h5>New Password</h5>
        </div>
        <PasswordStrengthField
          value={credentials.password}
          onChange={(password) => {
            setError("");
            setCredentials({ ...credentials, password });
          }}
          onCriteriaChange={setCriteriaMet}
        />
        <div className="password">
          <h5>Confirm Password</h5>
        </div>
        <PasswordStrengthField
          value={confirmPassword}
          onChange={(password) => {
            setError("");
            setConfirmPassword(password);
          }}
         onCriteriaChange={setCriteriaMet}
        />
        <FormButton
          text="Submit"
          onClick={handleSubmit}
          disabled={!criteriaMet || !passwordsMatch}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassAfter;
