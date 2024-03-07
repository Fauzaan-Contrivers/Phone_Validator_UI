import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        {children}
        <button
          type="button"
          className="absolute text-[20px] top-3 right-2.5 px-3 py-1 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={onClose}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
