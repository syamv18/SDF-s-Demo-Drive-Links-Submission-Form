import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const StatusMessage = ({ status }) => {
  if (!status) return null;

  return (
    <div
      className={`mb-6 p-4 rounded-lg flex items-center ${
        status.type === "success"
          ? "bg-green-50 text-green-800"
          : "bg-red-50 text-red-800"
      }`}
    >
      {status.type === "success" ? (
        <CheckCircle className="w-5 h-5 mr-2" />
      ) : (
        <AlertCircle className="w-5 h-5 mr-2" />
      )}
      {status.message}
    </div>
  );
};

export default StatusMessage;
