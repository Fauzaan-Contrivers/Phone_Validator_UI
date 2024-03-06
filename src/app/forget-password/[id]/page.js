"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useParams, useRouter } from "next/navigation";


const ResetForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required"),
    confirm: yup
      .string()
      .required("Password is required")
      
  });
  const router=useRouter()
  const {id}=useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log('data :>> ', data);
    console.log('id :>> ', id);
    const formdata={...data,id}
    
    // setSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8000/auth/change-password", formdata);
      console.log('response :>> ', response);
      if(!response?.data?.error){
        router.push("/login")
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
        <div className="mb-4">
          <label htmlFor="confirm">Confirm</label>
          <input
            // type="text"
            name="confirm"
            {...register("confirm")}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ErrorMessage
            errors={errors}
            name="confirm"
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
          {submitting ? "Submitting..." : "Reset"}
        </button>
      </form>
    </div>
  );
};

export default ResetForm;
