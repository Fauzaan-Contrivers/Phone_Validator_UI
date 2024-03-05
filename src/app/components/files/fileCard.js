"use client";
import React from "react";

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = new Date(date).toLocaleString("en-US", options);
  return formattedDate;
};

export default function fileCard({ file, handleDownload }) {
  const formattedDate = formatDate(file?.uploadedAt);
  return (
    <div
      key={file.id}
      className="card shadow-lg p-4 border-gray-300 hover:bg-gray-200 rounded-md"
    >
      <div className="flex flex-col gap-2">
        <p>Uploaded at: {formattedDate}</p>
        <p>Uploaded by: {file?.uploadedBy}</p>
        <p>Original file: {file?.originalFilename}</p>
        <p>Cleaned file: {file?.cleanedFilename}</p>
        <button
          className="btn-primary"
          onClick={() => handleDownload(file?.id)}
        >
          Download
        </button>
      </div>
    </div>
  );
}
