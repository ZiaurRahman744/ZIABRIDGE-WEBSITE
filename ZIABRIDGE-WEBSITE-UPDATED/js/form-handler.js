/**
 * ZIABRIDGE Lead Generation & Registration Form Handler
 * Handles Minimum Submission Policy Validation, Base64 File Upload, and Apps Script Submission
 */

// Replace this Web App URL once deployed in Google Apps Script
const APPS_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbymskDefp93W0h_SKRBmh9AVA6VkmgE5qHmMkkymdBnvWTpkqN3PyggnWXTaCPzLmDu/exec";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ziabridgeRegForm");
  const submitBtn = document.getElementById("submitRegBtn");
  const toast = document.getElementById("regToast");
  const toastMessage = document.getElementById("toastMessage");
  const toastIcon = document.getElementById("toastIcon");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 1. Minimum Submission Policy Validation
    const nameVal = document.getElementById("regName") ? document.getElementById("regName").value.trim() : "";
    const emailVal = document.getElementById("regEmail") ? document.getElementById("regEmail").value.trim() : "";
    const phoneVal = document.getElementById("regPhone") ? document.getElementById("regPhone").value.trim() : "";
    const whatsappVal = document.getElementById("regWhatsapp") ? document.getElementById("regWhatsapp").value.trim() : "";

    if (!nameVal) {
      showToast("Please provide your Full Name.", "error");
      document.getElementById("regName").focus();
      return;
    }

    if (!emailVal && !phoneVal && !whatsappVal) {
      showToast("Minimum Policy Requirement: Please provide at least ONE contact method (Email, Phone, or WhatsApp).", "error");
      return;
    }

    // Disable Submit Button & Show Spinner state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting Registration...";

    try {
      // 2. Gather All Form Data
      const formData = new FormData(form);
      const payload = {};

      formData.forEach((value, key) => {
        if (payload[key]) {
          if (!Array.isArray(payload[key])) {
            payload[key] = [payload[key]];
          }
          payload[key].push(value);
        } else {
          payload[key] = value;
        }
      });

      // Combine arrays if multiple checkboxes selected (e.g. mainProduct)
      if (Array.isArray(payload.mainProduct)) {
        payload.mainProduct = payload.mainProduct.join(", ");
      }
      if (Array.isArray(payload.productsInterested)) {
        payload.productsInterested = payload.productsInterested.join(", ");
      }

      // 3. Process File Upload if attached
      const fileInput = document.getElementById("regFileInput");
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        if (file.size > 10 * 1024 * 1024) {
          showToast("File size exceeds 10MB limit. Please attach a smaller file.", "error");
          resetBtn();
          return;
        }

        const base64Data = await convertFileToBase64(file);
        payload.fileName = file.name;
        payload.fileType = file.type;
        payload.fileData = base64Data;
      }

      // 4. Submit to Google Apps Script Endpoint
      if (APPS_SCRIPT_WEB_APP_URL && APPS_SCRIPT_WEB_APP_URL.trim() !== "") {
        // Send POST to Google Apps Script
        await fetch(APPS_SCRIPT_WEB_APP_URL, {
          method: "POST",
          mode: "no-cors", // Allows cross-origin post to Google Apps Script
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        showToast("Registration Successful! Your lead has been saved to ZIABRIDGE Database.", "success");
      } else {
        // Simulation mode when Apps Script URL is not yet pasted by user
        console.log("ZIABRIDGE Lead Payload (Simulation Mode):", payload);
        showToast("Registration Received! (Apps Script URL not set - details logged to console)", "success");
      }

      // Reset form
      form.reset();
      const fileNameDisplay = document.getElementById("fileNameDisplay");
      if (fileNameDisplay) {
        fileNameDisplay.innerHTML = "Click or Drag & Drop File Here (PDF, DOCX, ZIP, PNG, JPG)";
      }

    } catch (err) {
      console.error("Submission Error:", err);
      showToast("Submission Error: " + err.message, "error");
    } finally {
      resetBtn();
    }

    function resetBtn() {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  // Convert File to Base64 String Helper
  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // Toast Notification Helper
  function showToast(message, type) {
    if (!toast) return;
    toastMessage.textContent = message;
    toastIcon.innerHTML = type === "success" ? "&#10004;" : "&#9888;";
    toast.className = "reg-toast show " + (type || "success");

    setTimeout(() => {
      toast.className = "reg-toast";
    }, 4500);
  }
});

// ================================================
// CONTACT FORM HANDLER (pages/contact.html)
// ================================================
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const contactSubmitBtn = document.getElementById("contactSubmitBtn");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const originalBtnText = contactSubmitBtn.innerHTML;
    contactSubmitBtn.disabled = true;
    contactSubmitBtn.innerHTML = "Sending...";

    try {
      const formData = new FormData(contactForm);
      const payload = { category: "Contact Inquiry" };
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      const fileInput = document.getElementById("fileUpload");
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        if (file.size <= 10 * 1024 * 1024) {
          payload.fileName = file.name;
          payload.fileType = file.type;
          payload.fileData = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
          });
        }
      }

      if (typeof APPS_SCRIPT_WEB_APP_URL !== "undefined" && APPS_SCRIPT_WEB_APP_URL.trim() !== "") {
        await fetch(APPS_SCRIPT_WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (formMessage) {
        formMessage.textContent = "Message sent successfully! We will get back to you soon.";
        formMessage.style.color = "#2ECC71";
      }
      contactForm.reset();

    } catch (err) {
      console.error("Contact Submission Error:", err);
      if (formMessage) {
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.style.color = "#E74C3C";
      }
    } finally {
      contactSubmitBtn.disabled = false;
      contactSubmitBtn.innerHTML = originalBtnText;
    }
  });
});