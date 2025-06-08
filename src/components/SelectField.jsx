// // import React from "react";

// // const SelectField = ({
// //   label,
// //   value,
// //   onChange,
// //   options,
// //   placeholder,
// //   required = false,
// // }) => {
// //   return (
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-2">
// //         {label} {required && <span className="text-red-500">*</span>}
// //       </label>
// //       <select
// //         value={value}
// //         onChange={onChange}
// //         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
// //       >
// //         <option value="">{placeholder}</option>
// //         {options.map((option, idx) => (
// //           <option key={idx} value={option}>
// //             {option}
// //           </option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // };

// // export default SelectField;

// import React from "react";

// const SelectField = ({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder,
//   required = false,
// }) => {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <select
//         value={value}
//         onChange={onChange}
//         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//       >
//         <option value="">{placeholder}</option>
//         {options.map((option, idx) => (
//           <option key={idx} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SelectField;

import React from "react";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
