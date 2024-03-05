"use client";
import React, { useState, useEffect } from "react";
import FileRow from "./components/files/fileRow";
import FileCard from "./components/files/fileCard";
import Navbar from "./components/common/navbar";

const dummyFiles = [
  {
    id: 1,
    uploadedAt: new Date(),
    uploadedBy: "John Doe",
    originalFilename: "document1.pdf",
    analyzedFilename: "document1_analyzed.pdf",
    cleanedFilename: "document1_cleaned.pdf",
    isDuplicate: false,
  },
  {
    id: 2,
    uploadedAt: new Date(),
    uploadedBy: "Jane Smith",
    originalFilename: "document2.pdf",
    analyzedFilename: "document2_analyzed.pdf",
    cleanedFilename: "document2_cleaned.pdf",
    isDuplicate: true,
  },
  {
    id: 3,
    uploadedAt: new Date(),
    uploadedBy: "Jane Smith",
    originalFilename: "document2.pdf",
    analyzedFilename: "document2_analyzed.pdf",
    cleanedFilename: "document2_cleaned.pdf",
    isDuplicate: true,
  },
  {
    id: 4,
    uploadedAt: new Date(),
    uploadedBy: "Jane Smith",
    originalFilename: "document2.pdf",
    analyzedFilename: "document2_analyzed.pdf",
    cleanedFilename: "document2_cleaned.pdf",
    isDuplicate: true,
  },
  {
    id: 5,
    uploadedAt: new Date(),
    uploadedBy: "Jane Smith",
    originalFilename: "document2.pdf",
    analyzedFilename: "document2_analyzed.pdf",
    cleanedFilename: "document2_cleaned.pdf",
    isDuplicate: true,
  },
  {
    id: 6,
    uploadedAt: new Date(),
    uploadedBy: "Jane Smith",
    originalFilename: "document2.pdf",
    analyzedFilename: "document2_analyzed.pdf",
    cleanedFilename: "document2_cleaned.pdf",
    isDuplicate: true,
  },
];

const Home = () => {
  const [files, setFiles] = useState(dummyFiles);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch all files from the database
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload (replace with actual API call)
  const handleUpload = async () => {
    if (!selectedFile) {
      return; // Handle no file selected case
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newFile = await response.json();
        setFiles([...files, newFile]); // Update state with new file
        setSelectedFile(null); // Clear selected file after upload
      } else {
        console.error("Error uploading file:", await response.json());
        // Handle upload error
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle general upload error
    }
  };

  // Handle file download logic (replace with your implementation)
  const handleDownload = (fileId) => {
    // Implement download logic using libraries like `axios` or download link generation
    console.log("Downloading file:", fileId);
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="flex flex-col justify-between mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="uploadFile"
            onChange={handleFileChange}
          />
          <label className="custom-file-label" htmlFor="uploadFile">
            {!selectedFile ? "Choose a file..." : selectedFile.name}
          </label>
          <button
            className="btn-primary w-[100px]"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
        {/* <h1>File List</h1> */}

        <div className="lg:block hidden ">
          <table className="w-full table-auto border-collapse responsive-table">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-3 py-2 text-left">Uploaded At</th>
                <th className="px-3 py-2 text-left">Uploaded By</th>
                <th className="px-3 py-2 text-left">Original File</th>
                <th className="px-3 py-2 text-left">Analyzed File</th>
                <th className="px-3 py-2 text-left">Cleaned File</th>
                <th className="px-3 py-2 text-left">Download</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <FileRow
                  key={file.id}
                  file={file}
                  handleDownload={handleDownload}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:hidden flex flex-col gap-4 ">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              handleDownload={handleDownload}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
