"use client";
import dayjs from "dayjs";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD h:mm:ss A");
};
export default function fileCard({ file, handleDownload }) {
  const formattedDate = formatDate(file?.updated_at);
  return (
    <div
      key={file.id}
      className="card shadow-lg p-4 border-gray-300 hover:bg-gray-200 rounded-md"
    >
      <div className="flex flex-col gap-2">
        <p>Uploaded at: {formattedDate}</p>
        <p>Uploaded by: {file?.createdBy?.name}</p>
        <div
          className="  flex gap-4 item-center"
          onClick={() => handleDownload(file?.fileName)}
        >
          Original file: {file?.fileName}
          <div
            onClick={() => handleDownload(file?.fileName)}
            className="cursor-pointer"
          >
            <FaCloudDownloadAlt />
          </div>
        </div>
        <div className=" flex gap-4 item-center">
          Cleaned file: {file?.cleanFileName || "N/A"}
          <div
            onClick={() => handleDownload(file?.cleanFileName)}
            className="cursor-pointer"
          >
            <FaCloudDownloadAlt />
          </div>
        </div>
        {/* <button
          className="btn-primary"
          onClick={() => handleDownload(file?.id)}
        >
          Download
        </button> */}
      </div>
    </div>
  );
}
