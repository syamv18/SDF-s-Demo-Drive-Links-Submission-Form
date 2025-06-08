import React from "react";

const FormHeader = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        SDF's Demo Drive Links Submission Form
      </h1>
      <p className="text-gray-600 leading-relaxed">
        Submit your demo drive links using this form. All students are required
        to share their demonstration materials through Google Drive. You can add
        multiple demos in a single submission using the "Add Another Demo"
        button below.
      </p>
    </div>
  );
};

export default FormHeader;
