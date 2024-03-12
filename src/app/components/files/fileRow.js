"use client";
import dayjs from "dayjs";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD h:mm:ss A");
};

const FileRow = ({ file, handleDownload, role }) => {
  const formattedDate = formatDate(file?.createdAt);

  return (
    <tr key={file?.id} className="border-gray-300 hover:bg-gray-200">
      <td className="px-3 py-2 text-left">{formattedDate}</td>
      <td className="px-3 py-2 text-left">{file?.createdBy?.name}</td>
      <td className="px-3 py-2 text-left flex gap-4 items-center ">
        <div className="flex gap-1 items-center ">
          <div className="font-semibold">({file?.totalCount}) </div>
          {file?.fileName}
        </div>
        <div
          onClick={() => handleDownload(file?.fileName)}
          className="cursor-pointer"
        >
          <FaCloudDownloadAlt />
        </div>
      </td>

      {role !== "admin" && (
        <td className="px-3 py-2 text-left cursor-pointer ">
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center ">
              <div className="font-semibold">({file?.cleaned}) </div>
              {file?.cleanFileName || "N/A"}
            </div>
            <div
              onClick={() => handleDownload(file?.cleanFileName)}
              className="cursor-pointer"
            >
              <FaCloudDownloadAlt />
            </div>
          </div>
        </td>
      )}

      {role !== "admin" && (
        <td className="px-3 py-2 text-left flex gap-4 items-center ">
          <div className="flex gap-1 items-center ">
            <div className="font-semibold">({file?.duplicate}) </div>
            {file?.flaggedFileName || "N/A"}
          </div>
          <div
            onClick={() => handleDownload(file?.flaggedFileName)}
            className="cursor-pointer"
          >
            <FaCloudDownloadAlt />
          </div>
        </td>
      )}

      {role === "admin" && (
        <td className=" ">
          <div className="ml-4">{file?.duplicate}</div>
        </td>
      )}
    </tr>
  );
};

export default FileRow;
