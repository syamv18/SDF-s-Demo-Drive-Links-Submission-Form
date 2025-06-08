import React from "react";
import { Send } from "lucide-react";
import StatusMessage from "./StatusMessage";

const SubmitSection = ({
  onSubmit,
  isSubmitting,
  isValid,
  demoCount,
  submitStatus,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <StatusMessage status={submitStatus} />

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting || !isValid}
        className={`w-full flex items-center justify-center px-6 py-4 rounded-lg text-white font-medium transition-colors ${
          isValid && !isSubmitting
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit {demoCount} Demo{demoCount > 1 ? "s" : ""}
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 text-center mt-4">
        All submissions are automatically saved to Google Sheets
      </p>
    </div>
  );
};

export default SubmitSection;
