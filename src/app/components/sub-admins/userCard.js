import React from "react";

export default function UserCard({ user, handleDelete }) {
  return (
    <div
      key={user?.id}
      className="card shadow-lg p-4 border-gray-300 hover:bg-gray-200 rounded-md"
    >
      <div className="flex flex-col gap-2">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        <button className="btn-delete" onClick={() => handleDelete(user?.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
