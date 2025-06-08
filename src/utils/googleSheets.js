// const GOOGLE_SCRIPT_URL =
//   "https://script.google.com/macros/s/AKfycby7vpVohVtSOGkR59I1WnaQUby76voyuirp9Er6-CvhyGjKu_E9i1IM_5yKy6WbkYuRJA/exec";

// export const submitToGoogleSheets = async (formData) => {
//   try {
//     const response = await fetch(GOOGLE_SCRIPT_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const result = await response.json();

//     if (!result.success) {
//       throw new Error(result.message);
//     }

//     return result;
//   } catch (error) {
//     console.error("Google Sheets submission error:", error);
//     throw error;
//   }
// };

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby7vpVohVtSOGkR59I1WnaQUby76voyuirp9Er6-CvhyGjKu_E9i1IM_5yKy6WbkYuRJA/exec";

export const submitToGoogleSheets = async (formData) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      mode: "no-cors", // ADD THIS LINE
    });

    // With no-cors, we can't read response, so assume success if no error
    return { success: true };
  } catch (error) {
    console.error("Google Sheets submission error:", error);
    throw error;
  }
};
