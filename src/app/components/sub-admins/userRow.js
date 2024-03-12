import React from "react";
import axios from "axios";

const UserRow = ({ user, handleDelete }) => {
  const role = Cookies.get("role");
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
    <tr key={user?.id} className="border-gray-300 hover:bg-gray-200">
      <td className="px-3 py-2 text-left">{user?.name}</td>
      <td>{user?.email}</td>
      <td className="px-3 py-2 text-left">{user?.role}</td>
      <td className="px-3 py-2 text-left">
        <button className="btn-delete" onClick={() => deleteUser(user?.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
