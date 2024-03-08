// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const SignupForm = () => {
//   const [submitting, setSubmitting] = useState(false);

//   const schema = yup.object().shape({
//     name: yup
//       .string()
//       .required("Name is required")
//       .max(50, "Name cannot exceed 50 characters"),
//     email: yup
//       .string()
//       .required("Email is required")
//       .email("Please enter a valid email address"),
//     password: yup
//       .string()
//       .required("Password is required")
//       .min(8, "Password must be at least 8 characters long"),
//     confirmPassword: yup
//       .string()
//       .required("Confirm password is required")
//       .oneOf([yup.ref("password"), null], "Passwords must match"),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const onSubmit = async (data) => {
//     setSubmitting(true);

//     try {
//       const response = await fetch("/api/login", {
//         method: "POST",
//         body: JSON.stringify(data),
//       });
//       const result = await response.json();

//       if (result.success) {
//         console.log("Login successful!");
//       } else {
//         console.error("Login failed:", result.error);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen justify-center items-center flex-col">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md bg-white rounded-lg shadow-md px-8 py-6 md:max-w-lg"
//       >
//         <div className="mb-4">
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             {...register("name")}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//           />
//           <ErrorMessage
//             errors={errors}
//             name="name"
//             render={({ message }) => (
//               <span className="text-red-500 text-sm">{message}</span>
//             )}
//           />
//         </div>

//         {/* Email field with validation */}
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Email address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             {...register("email")}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//           />
//           <ErrorMessage
//             errors={errors}
//             name="email"
//             render={({ message }) => (
//               <span className="text-red-500 text-sm">{message}</span>
//             )}
//           />
//         </div>

//         {/* Password field with validation */}
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             {...register("password")}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//           />
//           <ErrorMessage
//             errors={errors}
//             name="password"
//             render={({ message }) => (
//               <span className="text-red-500 text-sm">{message}</span>
//             )}
//           ></ErrorMessage>
//         </div>

//         {/* Confirm password field with validation (similar to password) */}
//         <div className="mb-4">
//           <label
//             htmlFor="confirmPassword"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             {...register("confirmPassword", {
//               required: true,
//               validate: (value) =>
//                 value === data.password || "Passwords do not match",
//             })}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
//           />
//           <ErrorMessage
//             errors={errors}
//             name="confirmPassword"
//             render={({ message }) => (
//               <span className="text-red-500 text-sm">{message}</span>
//             )}
//           />
//         </div>

//         {/* Submit button with disabled state based on validation and loading */}
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="btn-primary"
//             disabled={submitting || Object.keys(errors).length > 0}
//           >
//             {submitting ? "Submitting..." : "Login"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;

import React from "react";

export default function page() {
  return <div>Page not found</div>;
}
