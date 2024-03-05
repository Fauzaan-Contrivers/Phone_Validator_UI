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

const FileRow = ({ file, handleDownload }) => {
  const formattedDate = formatDate(file?.uploadedAt);

  return (
    <tr key={file?.id} className="border-gray-300 hover:bg-gray-200">
      <td className="px-3 py-2 text-left">{formattedDate}</td>
      <td className="px-3 py-2 text-left">{file?.uploadedBy}</td>
      <td className="px-3 py-2 text-left">{file?.originalFilename}</td>
      <td
        className={`px-3 py-2 text-left ${
          file.isDuplicate ? "text-red-500" : ""
        }`}
      >
        {file?.analyzedFilename}
      </td>
      <td className="px-3 py-2 text-left">{file?.cleanedFilename}</td>
      <td className="px-3 py-2 text-left">
        <button
          className="btn-primary"
          onClick={() => handleDownload(file?.id)}
        >
          Download
        </button>
      </td>
    </tr>
  );
};

export default FileRow;
