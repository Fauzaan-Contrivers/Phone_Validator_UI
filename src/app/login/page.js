"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful login (e.g., redirect to another page, display a success message)
        console.log("Login successful!");
      } else {
        // Handle login failure (e.g., display an error message)
        const errorData = await response.json();
        console.error("Login failed:", errorData.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-lg shadow-md px-8 py-6 md:max-w-lg"
      >
        {/* Email and password fields with validation */}
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email")}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <span className="text-red-500 text-sm">{message}</span>
            )}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password")}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <span className="text-red-500 text-sm">{message}</span>
            )}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={submitting || Object.keys(errors).length > 0}
        >
          {submitting ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
