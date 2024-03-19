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
  const [row, setrow] = useState("");
  const [totalPhones, setTotalDbPhones] = useState("");
  const [Userrole, setuserRole] = useState("");

  const [loading, setLoading] = useState(false);

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
      setFiles(response?.data?.sheets);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Fetch phone count from the database
  const fetchPhoneCount = async () => {
    try {
      const token = Cookies.get("token");
      const id = Cookies.get("userId");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/sheets/phoneCount`,
        config
      );
      setTotalDbPhones(response?.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
    fetchPhoneCount();

    setuserRole(Cookies.get("role"));
  }, []);

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
        },
      };
      const id = Cookies.get("userId");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sheets/adminUpload/${id}`,
        formData,
        config
      );
      if (!response?.data?.error) {
        setLoading(false);
        setSelectedFile(null); // Clear selected file after upload
        toast.success("Sheet uploaded.", {
          position: "top-right",
          autoClose: 10000,
        });
        fetchFiles();
        fetchPhoneCount();
      } else {
        setLoading(false);
        console.log("Error uploading file:", await response.json());
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 10000,
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
        },
      };
      const id = Cookies.get("userId");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sheets/userUpload/${id}`,
        formData,
        config
      );

      if (!response?.data?.error) {
        setSelectedFile(null); // Clear selected file after upload
        setLoading(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 10000,
        });
        fetchFiles();
      } else {
        setLoading(false);
        toast.error(response?.data?.message, {
          position: "top-right",
          autoClose: 10000,
        });
        console.log("Error uploading file:");
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/download/${name}`,
        config
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(
          `Failed to download file: ${response.status} ${response.statusText}`
        );
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = url;
      a.download = name; // Set the filename for the downloaded file

      // Programmatically click the anchor element to trigger the download
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
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
      <div className="p-4 mt-[80px] ">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col justify-between mb-4">
            <input
              type="file"
              className="custom-file-input max-w-[250px]"
              id="uploadFile"
              onChange={handleFileChange}
              accept=".csv, .xlsx"
            />
            <button
              className="btn-primary w-[100px] mt-4"
              onClick={handleUpload}
              disabled={!selectedFile || loading}
            >
              Upload
            </button>
          </div>
          {Userrole === "admin" && (
            <div className="bg-gray-200 text-[20px]  text-center sm:px-3 sm:py-3 p-2">
              <div className="font-semibold">Total records</div>
              {totalPhones}
            </div>
          )}
        </div>

        <div className="my-2">
          Guidelines:
          <ul className="text-red-500 list-decimal ml-6">
            <li>
              Column names must not have space in them. Correct formats are
              FirstName, last_name, phone_number
            </li>
            <li>There should be no empty row in the sheet</li>
          </ul>
        </div>

        {/* <h1>File List</h1> */}

        <div className="lg:block hidden ">
          <table className="w-full table-auto border-collapse responsive-table">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-3 py-2 text-left">Uploaded At</th>
                <th className="px-3 py-2 text-left">Uploaded By</th>
                <th className="px-3 py-2 text-left">Original File</th>
                {Userrole !== "admin" && (
                  <th className="px-3 py-2 text-left">Cleaned File</th>
                )}

                {Userrole === "admin" ? (
                  <th className="px-3 py-2 text-left">Duplicate</th>
                ) : (
                  <th className="px-3 py-2 text-left">Duplicate File</th>
                )}
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <FileRow
                  key={file.id}
                  file={file}
                  handleDownload={handleDownload}
                  role={Userrole}
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
              role={Userrole}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
