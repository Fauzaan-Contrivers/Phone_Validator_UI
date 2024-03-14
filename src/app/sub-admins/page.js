"use client";
import React, { useState, useEffect } from "react";
import UserRow from "../components/sub-admins/userRow";
import UserCard from "../components/sub-admins/userCard";
import Modal from "../components/common/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../components/common/navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import InfiniteProgressBar from "../../common/Progressbar";

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
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateUserId, setUpdateUserId] = useState("");
  const [updateUserLimitValue, setUpdateUserLimitValue] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const fetchUsers = async () => {
    try {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/all-users`,
        config
      );
      setUsers(response?.data?.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (data) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/createUser`,
        data,
        config
      );
      if (!response?.data?.error) {
        setLoading(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 10000,
        });
        fetchUsers();
      } else {
        setLoading(false);
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 10000,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    } finally {
    }

    setShowModal(false);
  };

  const handleUpdateUser = async () => {
    if (updateUserLimitValue <= 0) {
      toast.error("Please enter correct value", {
        position: "top-right",
        autoClose: 10000,
      });
    }

    if (updateUserLimitValue <= 0) {
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/updateUser/${updateUserId}`,
        { uploadLimit: updateUserLimitValue },
        config
      );
      if (!response?.data?.error) {
        setLoading(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 10000,
        });
        setShowUpdateModal(false);
        setUpdateUserLimitValue(0);
        setUpdateUserId("");
        fetchUsers();
      } else {
        setLoading(false);
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 10000,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error submitting form:", error);
    } finally {
    }
  };

  // Handle file download logic (replace with your implementation)
  const handleDelete = (fileId) => {
    toast.success("User deleted successfully", {
      position: "top-right",
      autoClose: 10000,
    });
    fetchUsers();
  };

  // Handle file download logic (replace with your implementation)
  const handleShowUpdateUserModal = (user) => {
    setUpdateUserId(user?.id);
    setShowUpdateModal(true);
    setUpdateUserLimitValue(user?.uploadLimit);
  };

  return (
    <>
      {loading && <InfiniteProgressBar />}
      <Navbar />
      <div className="p-4 mt-4 pt-[80px]">
        <div className="flex  justify-between mb-4 items-center">
          <div></div>
          <button
            className="btn-primary w-[150px] "
            onClick={() => setShowModal(true)}
          >
            Add User
          </button>
        </div>
        {/* Add User Modal */}
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
            <div className="mb-4">
              <label htmlFor="email">UploadLimit</label>
              <input
                type="number"
                name="uploadLimit"
                id="uploadLimit"
                {...register("uploadLimit")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.email && (
                <span className="text-red-500">
                  {errors?.uploadLimit?.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Adding User..." : "Add User"}
            </button>
          </form>
        </Modal>

        {/* Update User Modal */}
        <Modal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
        >
          <h3 className=" text-[24px] font-semibold">Update User</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="email">UploadLimit</label>
              <input
                type="number"
                name="uploadLimit"
                id="uploadLimit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onChange={(e) => {
                  setUpdateUserLimitValue(e.target.value);
                }}
                value={updateUserLimitValue}
              />
              {errors.email && (
                <span className="text-red-500">
                  {errors?.uploadLimit?.message}
                </span>
              )}
            </div>

            <button
              onClick={handleUpdateUser}
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Uodating User..." : "Update User"}
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
                  handleShowUpdateUserModal={handleShowUpdateUserModal}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:hidden flex flex-col gap-4 ">
          {users.map((user) => (
            <UserCard
              key={user?.id}
              user={user}
              handleDelete={handleDelete}
              handleShowUpdateUserModal={handleShowUpdateUserModal}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
