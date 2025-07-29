import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-4">
      <div className="relative p-4 w-full max-w-2xl">
        {/* Modal content */}
        <div className="relative bg-secondary rounded-xl shadow-lg border border-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-700 rounded-t">
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg text-sm w-8 h-8 flex items-center justify-center transition"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4 text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
