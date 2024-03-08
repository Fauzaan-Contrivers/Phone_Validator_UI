"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    console.log("logout");
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
    router.push("/login");
  };
  useEffect(() => {
    setRole(Cookies.get("role"));
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white px-4 py-4 ">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Phone Validator
        </Link>

        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-400">
              Files
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link href="/sub-admins" className="hover:text-gray-400">
                Users
              </Link>
            </li>
          )}
          <li onClick={handleLogout} className="cursor-pointer">
            Logout
          </li>
        </ul>

        {/* Hamburger menu for mobile (responsive) */}
        <button
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-700 rounded-lg "
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu (conditionally rendered) */}
      {isOpen && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-gray-800 py-4 text-center space-y-4">
          <li>
            <Link
              href="/"
              className="block hover:text-gray-400"
              onClick={toggleMenu}
            >
              Files
            </Link>
          </li>
          <li>
            <Link
              href="/sub-admins"
              className="block hover:text-gray-400"
              onClick={toggleMenu}
            >
              Sub Admins
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
