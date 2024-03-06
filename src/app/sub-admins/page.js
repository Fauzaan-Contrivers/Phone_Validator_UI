"use client";
import React, { useState, useEffect } from "react";
import UserRow from "../components/sub-admins/userRow";
import UserCard from "../components/sub-admins/userCard";
import Modal from "../components/common/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../components/common/navbar";
import axios from 'axios';
import Cookies from 'js-cookie';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Name cannot be longer than 50 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const dummyUsers = [
  {
    id: 1,
    name: "Awais",
    email: "awais@contrivers.dev",
    role: "Admin",
  },
  {
    id: 2,
    name: "Awais",
    email: "awais@contrivers.dev",
    role: "Admin",
  },
  {
    id: 3,
    name: "Awais",
    email: "awais@contrivers.dev",
    role: "Admin",
  },
  {
    id: 4,
    name: "Awais",
    email: "awais@contrivers.dev",
    role: "Admin",
  },
  {
    id: 5,
    name: "Awais",
    email: "awais@contrivers.dev",
    role: "Admin",
  },
  {
    id: 6,
    name: "Awais",
    email: "awais@contrivers.dev",
    role: "Admin",
  },
];

const Home = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) }); // Initialize useForm hook

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("/api/users");
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const handleAddUser =async (data) => {
    // ... your logic to add a new user based on data
    console.log("Adding new user:", data);
    try {
      const token = Cookies.get('token'); // Replace with your actual token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add any other headers if needed
      },
    };
      const response = await axios.post("http://localhost:8000/auth/create-sub-admin", data,config);
      console.log('response :>> ', response);
      if(!response?.data?.error){
        router.push("/")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      
    }

    // Close the modal after successful submission
    setShowModal(false);
  };

  // Handle file download logic (replace with your implementation)
  const handleDelete = (fileId) => {
    // Implement download logic using libraries like `axios` or download link generation
    console.log("Downloading file:", fileId);
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="flex flex-col justify-between mb-4">
          <button
            className="btn-primary w-[150px]"
            onClick={() => setShowModal(true)}
          >
            Add User
          </button>
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <h3>Add New User</h3>
          <form onSubmit={handleSubmit(handleAddUser)}>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
           
            <button type="submit" className="btn-primary">
              Add User
            </button>
          </form>
        </Modal>
        <div className="lg:block hidden ">
          <table className="w-full table-auto border-collapse responsive-table">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Role</th>
                <th className="px-3 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow
                  key={user?.id}
                  user={user}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:hidden flex flex-col gap-4 ">
          {users.map((user) => (
            <UserCard key={user?.id} user={user} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
