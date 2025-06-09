import React from "react";
import { Plus } from "lucide-react";
import DemoItem from "./DemoItem";

const DemoSubmissions = ({
  demos,
  onAddDemo,
  onUpdateDemo,
  onRemoveDemo,
  validateDriveLink,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
            2
          </div>
          Your Demo Submissions
        </h2>

        {/* ✅ Top Add Button always visible */}
        <button
          type="button"
          onClick={onAddDemo}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Demo
        </button>
      </div>

      <div className="space-y-6">
        {demos.map((demo, index) => (
          <DemoItem
            key={demo.id}
            demo={demo}
            index={index}
            onUpdate={(field, value) => onUpdateDemo(demo.id, field, value)}
            onRemove={() => onRemoveDemo(demo.id)}
            canRemove={demos.length > 1}
            validateDriveLink={validateDriveLink}
            isLast={index === demos.length - 1}
            isValid={
              demo.topicName &&
              demo.demoDate &&
              demo.driveLink &&
              demo.editorAccess &&
              validateDriveLink(demo.driveLink)
            }
            onAddDemo={onAddDemo}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoSubmissions;
