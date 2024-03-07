"use client";
import dayjs from "dayjs";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";


const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD h:mm:ss A")
};

const FileRow = ({ file, handleDownload }) => {
  const formattedDate = formatDate(file?.updated_at);
  return (
    <tr key={file?.id} className="border-gray-300 hover:bg-gray-200">
      <td className="px-3 py-2 text-left">{formattedDate}</td>
      <td className="px-3 py-2 text-left">{file?.user?.name}</td>
      <td className="px-3 py-2 text-left flex gap-4 items-center "  >
        {file?.originalName}
        <div onClick={() => handleDownload(file?.fileName)} className="cursor-pointer">
          <FaCloudDownloadAlt />
        </div>
      </td>
      {/* <td
        className={`px-3 py-2 text-left ${
          file.isDuplicate ? "text-red-500" : ""
        }`}
      >
        {file?.analyzedFilename}
      </td> */}
      <td onClick={() => handleDownload(file?.cleanedName)} className="px-3 py-2 text-left cursor-pointer ">
        <div className="flex gap-4 items-center">

          {file?.cleanedName || "N/A"}
          <div onClick={() => handleDownload(file?.cleanedName)} className="cursor-pointer">
            <FaCloudDownloadAlt />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FileRow;
