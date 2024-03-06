"use client";

import React, { useState } from "react";
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8000/auth/forget-password/send-email", {email});
      console.log('response :>> ', response);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      {/* <h1>Forgot Password</h1>
      <p>
        Enter your email address and we will send you instructions to reset your
        password.
      </p> */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md px-8 py-6 md:max-w-lg"
      >
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Sending..." : "Send Reset Instructions"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
