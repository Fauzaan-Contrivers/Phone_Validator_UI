"use client";
import dayjs from "dayjs";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Cookies from "js-cookie";

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD h:mm:ss A");
};
export default function fileCard({ file, handleDownload }) {
  const formattedDate = formatDate(file?.updated_at);
  const role = Cookies.get("role");
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

        {role !== "admin" && (
          <div className=" flex gap-4 item-center">
            Cleaned file: {file?.cleanFileName || "N/A"}
            <div
              onClick={() => handleDownload(file?.cleanFileName)}
              className="cursor-pointer"
            >
              <FaCloudDownloadAlt />
            </div>
          </div>
        )}

        {role !== "admin" && (
          <div className=" flex gap-1 items-center">
            <div className="flex gap-1 items-center ">
              <div className="">Duplicate file: ({file?.duplicate}) </div>
              {file?.flaggedFileName || "N/A"}
            </div>
            <div
              onClick={() => handleDownload(file?.flaggedFileName)}
              className="cursor-pointer"
            >
              <FaCloudDownloadAlt />
            </div>
          </div>
        )}

        {role === "admin" && (
          <div>
            <div>Duplicate: {file?.duplicate}</div>
          </div>
        )}
      </div>
    </div>
  );
}
