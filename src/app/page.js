"use client";
import React, { useState, useEffect } from "react";
import FileRow from "./components/files/fileRow";
import FileCard from "./components/files/fileCard";
import Navbar from "./components/common/navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import InfiniteProgressBar from "../common/Progressbar";

const Home = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all files from the database
    const fetchFiles = async () => {
      try {
        const token = Cookies.get("token"); // Replace with your actual token
        const id = Cookies.get("userId"); // Replace with your actual token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add any other headers if needed
          },
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/all-sheets/${id}`,
          config
        );
        console.log("data :>> ", response);
        setFiles(response?.data?.sheets);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [refetch]);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const role = Cookies.get("role");
    if (role === "admin") {
      handleAdminUpload();
    } else {
      handleUserUpload();
    }
  };

  //  Admin
  const handleAdminUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      return; // Handle no file selected case
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const token = Cookies.get("token"); // Replace with your actual token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Connection: "keep-alive",
          "Keep-Alive": "timeout=6000",
        },
      };
      const id = Cookies.get("userId");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sheets/upload/${id}`,
        formData,
        config
      );
      if (!response?.data?.error) {
        setLoading(false);
        setSelectedFile(null); // Clear selected file after upload
        toast.success("Sheet uploaded.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        setLoading(false);
        console.log("Error uploading file:", await response.json());
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
        });
        // Handle upload error
      }
    } catch (error) {
      console.log("Error uploading file:", error);
      setLoading(false);
      // Handle general upload error
    }
  };

  //User
  const handleUserUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      return; // Handle no file selected case
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = Cookies.get("token"); // Replace with your actual token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add any other headers if needed
          Connection: "keep-alive",
          "Keep-Alive": "timeout=6000",
        },
      };
      const id = Cookies.get("userId");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sheets/upload-file/${id}`,
        formData,
        config
      );

      if (!response?.data?.error) {
        setSelectedFile(null); // Clear selected file after upload
        setLoading(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 2000,
        });
        setRefetch((fe) => !fe);
      } else {
        setLoading(false);
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Error uploading file:", await response.json());
      }
    } catch (error) {
      setLoading(false);
      console.log("Error uploading file:", error);
    }
  };

  // Handle file download logic (replace with your implementation)

  const handleDownload = async (name) => {
    try {
      const token = Cookies.get("token"); // Replace with your actual token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add any other headers if needed
        },
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/download/:${name}`,
        config
      );
      console.log("response :>> ", response);
      const url = window.URL.createObjectURL(new Blob([response.data])); // Access response.data as the Blob
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log("Error fetching files:", error);
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {loading && <InfiniteProgressBar />}
      <Navbar />
      <div className="p-4 mt-[80px]">
        <div className="flex flex-col justify-between mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="uploadFile"
            onChange={handleFileChange}
            // value={selectedFile}
            accept=".csv"
          />
          {/* <label className="custom-file-label" htmlFor="uploadFile">
            {!selectedFile ? "Choose a file..." : selectedFile.name}
          </label> */}
          <button
            className="btn-primary w-[100px] mt-4"
            onClick={handleUpload}
            disabled={!selectedFile || loading}
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
                {/* <th className="px-3 py-2 text-left">Analyzed File</th> */}
                <th className="px-3 py-2 text-left">Cleaned File</th>
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
