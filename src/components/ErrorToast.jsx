import React from "react";

const ErrorToast = ({ errMsg }) => {
  if (!errMsg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="max-w-md w-[90%] rounded-xl border border-red-300 bg-red-50 px-6 py-4 shadow-xl">
        <div className="flex items-start gap-3">
          <svg
            className="h-6 w-6 text-red-600 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>

          <div>
            <p className="text-sm font-semibold text-red-700">Error</p>
            <p className="text-sm text-red-600">{errMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ErrorToast;
