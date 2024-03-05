import React from "react";

const UserRow = ({ user, handleDelete }) => {
  return (
    <tr key={user?.id} className="border-gray-300 hover:bg-gray-200">
      <td className="px-3 py-2 text-left">{user?.name}</td>
      <td>{user?.email}</td>
      <td className="px-3 py-2 text-left">{user?.role}</td>
      <td className="px-3 py-2 text-left">
        <button className="btn-delete" onClick={() => handleDelete(user?.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
