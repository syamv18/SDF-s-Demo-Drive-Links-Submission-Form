// import { useState } from "react";
// import FormHeader from "./components/FormHeader";
// import StudentInformation from "./components/StudentInformation";
// import DemoSubmissions from "./components/DemoSubmissions";
// import SubmitSection from "./components/SubmitSection";
// import { submitToGoogleSheets } from "./utils/googleSheets";

// const DemoSubmissionForm = () => {
//   const [studentInfo, setStudentInfo] = useState({
//     name: "",
//     email: "",
//   });

//   const [demos, setDemos] = useState([
//     {
//       id: 1,
//       topicName: "",
//       demoDate: "",
//       driveLink: "",
//       editorAccess: "",
//     },
//   ]);

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const addDemo = () => {
//     const newDemo = {
//       id: Date.now(),
//       topicName: "",
//       demoDate: "",
//       driveLink: "",
//       editorAccess: "",
//     };
//     setDemos([...demos, newDemo]);
//   };

//   const removeDemo = (id) => {
//     if (demos.length > 1) {
//       setDemos(demos.filter((demo) => demo.id !== id));
//     }
//   };

//   const updateDemo = (id, field, value) => {
//     setDemos(
//       demos.map((demo) => (demo.id === id ? { ...demo, [field]: value } : demo))
//     );
//   };

//   const updateStudentInfo = (field, value) => {
//     setStudentInfo({ ...studentInfo, [field]: value });
//   };

//   const validateDriveLink = (url) => {
//     return url.includes("drive.google.com") || url.includes("docs.google.com");
//   };

//   const isFormValid = () => {
//     if (!studentInfo.name || !studentInfo.email) return false;

//     return demos.every(
//       (demo) =>
//         demo.topicName &&
//         demo.demoDate &&
//         demo.driveLink &&
//         demo.editorAccess &&
//         validateDriveLink(demo.driveLink)
//     );
//   };

//   const handleSubmit = async () => {
//     if (!isFormValid()) {
//       setSubmitStatus({
//         type: "error",
//         message: "Please fill all required fields with valid data.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       const formData = {
//         studentInfo,
//         demos,
//         submissionTime: new Date().toISOString(),
//       };

//       console.log("Form Data to Submit:", formData);

//       // REAL Google Sheets submission
//       await submitToGoogleSheets(formData);

//       setSubmitStatus({
//         type: "success",
//         message: `Successfully submitted ${demos.length} demo(s)! Data has been saved to Google Sheets.`,
//       });

//       // localStorage.clear();

//       // Reset form
//       setStudentInfo({ name: "", email: "" });
//       setDemos([
//         { id: 1, topicName: "", demoDate: "", driveLink: "", editorAccess: "" },
//       ]);
//     } catch (error) {
//       setSubmitStatus({
//         type: "error",
//         message: "Submission failed. Please try again.",
//       });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <FormHeader />

//         <div className="space-y-8">
//           <StudentInformation
//             studentInfo={studentInfo}
//             onUpdate={updateStudentInfo}
//           />

//           <DemoSubmissions
//             demos={demos}
//             onAddDemo={addDemo}
//             onUpdateDemo={updateDemo}
//             onRemoveDemo={removeDemo}
//             validateDriveLink={validateDriveLink}
//           />

//           <SubmitSection
//             onSubmit={handleSubmit}
//             isSubmitting={isSubmitting}
//             isValid={isFormValid()}
//             demoCount={demos.length}
//             submitStatus={submitStatus}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DemoSubmissionForm;

import { useState, useEffect } from "react";
import FormHeader from "./components/FormHeader";
import StudentInformation from "./components/StudentInformation";
import DemoSubmissions from "./components/DemoSubmissions";
import SubmitSection from "./components/SubmitSection";
import { submitToGoogleSheets } from "./utils/googleSheets";

const LOCAL_STORAGE_KEY = "sdf_form_data";

const DemoSubmissionForm = () => {
  // 1. Load saved data on first render
  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.error("Error loading saved data:", err);
    }
    return {
      studentInfo: { name: "", email: "" },
      demos: [
        {
          id: 1,
          topicName: "",
          demoDate: "",
          driveLink: "",
          editorAccess: "",
        },
      ],
    };
  };

  const [studentInfo, setStudentInfo] = useState(loadSavedData().studentInfo);
  const [demos, setDemos] = useState(loadSavedData().demos);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // 2. Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ studentInfo, demos })
    );
  }, [studentInfo, demos]);

  const updateStudentInfo = (field, value) => {
    setStudentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const updateDemo = (id, field, value) => {
    setDemos((prev) =>
      prev.map((demo) => (demo.id === id ? { ...demo, [field]: value } : demo))
    );
  };

  const addDemo = () => {
    setDemos((prev) => [
      ...prev,
      {
        id: Date.now(),
        topicName: "",
        demoDate: "",
        driveLink: "",
        editorAccess: "",
      },
    ]);
  };

  const removeDemo = (id) => {
    if (demos.length > 1) {
      setDemos(demos.filter((demo) => demo.id !== id));
    }
  };

  const validateDriveLink = (url) => {
    return url.includes("drive.google.com") || url.includes("docs.google.com");
  };

  const isFormValid = () => {
    if (!studentInfo.name || !studentInfo.email) return false;

    return demos.every(
      (demo) =>
        demo.topicName &&
        demo.demoDate &&
        demo.driveLink &&
        demo.editorAccess &&
        validateDriveLink(demo.driveLink)
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setSubmitStatus({
        type: "error",
        message: "Please fill all required fields with valid data.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = {
        studentInfo,
        demos,
        submissionTime: new Date().toISOString(),
      };

      console.log("Submitting:", formData);
      await submitToGoogleSheets(formData);

      setSubmitStatus({
        type: "success",
        message: `Successfully submitted ${demos.length} demo(s)!`,
      });

      // 3. Clear localStorage and reset form
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setStudentInfo({ name: "", email: "" });
      setDemos([
        {
          id: 1,
          topicName: "",
          demoDate: "",
          driveLink: "",
          editorAccess: "",
        },
      ]);
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: "Submission failed. Please try again.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <FormHeader />

        <div className="space-y-8">
          <StudentInformation
            studentInfo={studentInfo}
            onUpdate={updateStudentInfo}
          />

          <DemoSubmissions
            demos={demos}
            onAddDemo={addDemo}
            onUpdateDemo={updateDemo}
            onRemoveDemo={removeDemo}
            validateDriveLink={validateDriveLink}
          />

          <SubmitSection
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isValid={isFormValid()}
            demoCount={demos.length}
            submitStatus={submitStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoSubmissionForm;
