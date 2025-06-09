import React from "react";
import InputField from "./InputField";

const StudentInformation = ({ studentInfo, onUpdate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          1
        </div>
        SDFs Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Name"
          value={studentInfo.name}
          onChange={(e) => onUpdate("name", e.target.value)}
          placeholder="Enter your full name (Employee ID also)"
          required={true}
        />

        <InputField
          label="Email Address"
          type="email"
          value={studentInfo.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          placeholder="Enter your Company email address"
          required={true}
        />
      </div>
    </div>
  );
};

export default StudentInformation;
