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
import { toast } from 'react-toastify';
import InfiniteProgressBar from "../../common/Progressbar"


const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Name cannot be longer than 50 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
});


const Home = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) }); // Initialize useForm hook

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token'); // Replace with your actual token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add any other headers if needed
          },
        };
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/all-users`, config);
        setUsers(response?.data?.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (data) => {
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/create-sub-admin`, data, config);
      if (!response?.data?.error) {
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 2000
        });
        toast.success("An email has been sent; please change the password using the link.", {
          position: "top-right",
          autoClose: 2000
        });
      } else {
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 3000
        });
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
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    setLoading(true)
    if (!selectedFile) {
      return; // Handle no file selected case
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log('selectedFile :>> ', selectedFile);

    try {
      const token = Cookies.get('token'); // Replace with your actual token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add any other headers if needed
        },
      };
      const id = Cookies.get("userId")
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sheets/upload/${id}`, formData, config);

      if (!response?.data?.error) {
        setSelectedFile(null); // Clear selected file after upload
        toast.success("Sheet uploaded.", {
          position: "top-right",
          autoClose: 2000
        });
      } else {
        console.error("Error uploading file:", await response.json());
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 3000
        });
        // Handle upload error
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle general upload error
    }
    setLoading(false)
  };

  return (
    <>
      {loading && <InfiniteProgressBar />}
      <Navbar />
      <div className="p-4">
        <div className="flex  justify-between mb-4 items-center">

          <div className="flex flex-col justify-between my-4">
            <input
              type="file"
              className="custom-file-input"
              id="uploadFile"
              onChange={handleFileChange}
            />
            {/* <label className="custom-file-label" htmlFor="uploadFile">
              {!selectedFile ? "Choose a file..." : selectedFile.name}
            </label> */}
            <button
              className="btn-primary w-[100px] mt-4 "
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              Upload
            </button>
          </div>

          <button
            className="btn-primary w-[150px] "
            onClick={() => setShowModal(true)}
          >
            Add User
          </button>
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <h3 className=" text-[24px] font-semibold">Add New User</h3>
          <form onSubmit={handleSubmit(handleAddUser)}>
            <div className="mb-4 mt-4">
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
                {/* <th className="px-3 py-2 text-left">Action</th> */}
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
