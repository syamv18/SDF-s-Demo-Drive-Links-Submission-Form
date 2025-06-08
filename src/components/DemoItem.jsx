// import React from "react";
// import { Trash2 } from "lucide-react";
// import InputField from "./InputField";
// import SelectField from "./SelectField";
// import { TOPICS } from "../data/topics";

// const DemoItem = ({
//   demo,
//   index,
//   onUpdate,
//   onRemove,
//   canRemove,
//   validateDriveLink,
// }) => {
//   const driveError =
//     demo.driveLink && !validateDriveLink(demo.driveLink)
//       ? "Please enter a valid Google Drive link"
//       : null;

//   return (
//     <div className="border border-gray-200 rounded-lg p-6 relative">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-medium text-gray-800">Demo {index + 1}</h3>
//         {canRemove && (
//           <button
//             type="button"
//             onClick={onRemove}
//             className="text-red-500 hover:text-red-700 transition-colors"
//           >
//             <Trash2 className="w-5 h-5" />
//           </button>
//         )}
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div className="md:col-span-2">
//           <SelectField
//             label="Topic Name"
//             value={demo.topicName}
//             onChange={(e) => onUpdate("topicName", e.target.value)}
//             options={TOPICS}
//             placeholder="Select a topic..."
//             required={true}
//           />
//         </div>

//         <InputField
//           label="Demo Date"
//           type="date"
//           value={demo.demoDate}
//           onChange={(e) => onUpdate("demoDate", e.target.value)}
//           required={true}
//         />

//         <SelectField
//           label="Editor Access Given?"
//           value={demo.editorAccess}
//           onChange={(e) => onUpdate("editorAccess", e.target.value)}
//           options={["Yes", "No"]}
//           placeholder="Select..."
//           required={true}
//         />

//         <div className="md:col-span-2">
//           <InputField
//             label="Demo Drive Link"
//             type="url"
//             value={demo.driveLink}
//             onChange={(e) => onUpdate("driveLink", e.target.value)}
//             placeholder="https://drive.google.com/..."
//             required={true}
//             error={driveError}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DemoItem;

import React from "react";
import { Trash2, Plus } from "lucide-react";
import InputField from "./InputField";
import AutocompleteInput from "./AutocompleteInput";
import SelectField from "./SelectField";
import { TOPICS } from "../data/topics";

const DemoItem = ({
  demo,
  index,
  onUpdate,
  onRemove,
  onAddDemo, // ADD THIS PROP
  canRemove,
  validateDriveLink,
  isLast, // ADD THIS PROP
}) => {
  const driveError =
    demo.driveLink && !validateDriveLink(demo.driveLink)
      ? "Please enter a valid Google Drive link"
      : null;

  return (
    <div className="border border-gray-200 rounded-lg p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Demo {index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <AutocompleteInput
            label="Topic Name"
            value={demo.topicName}
            onChange={(value) => onUpdate("topicName", value)}
            options={TOPICS}
            placeholder="Start typing to search topics..."
            required={true}
          />
        </div>

        <InputField
          label="Demo Date"
          type="date"
          value={demo.demoDate}
          onChange={(e) => onUpdate("demoDate", e.target.value)}
          required={true}
        />

        <SelectField
          label="Editor Access Given?"
          value={demo.editorAccess}
          onChange={(e) => onUpdate("editorAccess", e.target.value)}
          options={["Yes", "No"]}
          placeholder="Select..."
          required={true}
        />

        <div className="md:col-span-2">
          <InputField
            label="Demo Drive Link"
            type="url"
            value={demo.driveLink}
            onChange={(e) => onUpdate("driveLink", e.target.value)}
            placeholder="https://drive.google.com/..."
            required={true}
            error={driveError}
          />
        </div>
      </div>

      {/* Add Another Demo button inside each demo */}
      {isLast && (
        <div className="flex justify-center mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onAddDemo}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Demo
          </button>
        </div>
      )}
    </div>
  );
};

export default DemoItem;
