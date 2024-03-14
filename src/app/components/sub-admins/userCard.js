import React from "react";
import axios from "axios";

export default function UserCard({
  user,
  handleDelete,
  handleShowUpdateUserModal,
}) {
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        handleDelete(userId);
      } else {
        console.error("Failed to delete user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div
      key={user?.id}
      className="card shadow-lg p-4 border-gray-300 hover:bg-gray-200 rounded-md"
    >
      <div className="flex flex-col gap-2">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>

        {user?.role !== "admin" && (
          <button
            className="btn-primary w-auto"
            onClick={() => handleShowUpdateUserModal(user)}
          >
            Update
          </button>
        )}
        {user?.role !== "admin" && (
          <button className="btn-delete  " onClick={() => deleteUser(user?.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
