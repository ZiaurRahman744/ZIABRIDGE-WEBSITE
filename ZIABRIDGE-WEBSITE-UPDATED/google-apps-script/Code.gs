/**
 * ZIABRIDGE Lead Generation & Business Registration System
 * Backend Controller: Google Apps Script Web App
 * 
 * Instructions:
 * 1. Open Google Sheets (create a new spreadsheet named "ZIABRIDGE Master Database").
 * 2. Click Extensions > Apps Script.
 * 3. Replace all code in Code.gs with this script.
 * 4. (Optional) Replace FOLDER_ID below with your Google Drive Folder ID for uploaded documents.
 * 5. Click Deploy > New deployment > Select type "Web app".
 * 6. Set "Execute as": Me
 * 7. Set "Who has access": Anyone
 * 8. Click Deploy, grant permissions, and copy the Web App URL into frontend configuration.
 */

// Google Drive Folder ID where tech packs, resumes, and portfolios will be stored
var DRIVE_FOLDER_ID = ""; // Optional: Leave empty to upload to Root Google Drive or set Folder ID

function doPost(e) {
  try {
    var data = {};
    
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var result = processLeadSubmission(data);
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "ZIABRIDGE Lead Generation API is running successfully."
  })).setMimeType(ContentService.MimeType.JSON);
}

function processLeadSubmission(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Active spreadsheet not found. Ensure script is attached to a Google Sheet.");
  }

  var timestamp = new Date();
  var leadId = "ZB-" + Utilities.formatDate(timestamp, "GMT+6", "yyyyMMdd") + "-" + Math.floor(1000 + Math.random() * 9000);
  
  var category = data.category || "General Business";
  var source = data.source || "ZIABRIDGE Website";
  var websiteId = data.website_id || "ZIABRIDGE";
  var name = data.name || data.fullName || data.contactPerson || "";
  var company = data.companyName || data.factoryName || data.businessName || "";
  var email = data.email || "";
  var phone = data.phone || "";
  var whatsapp = data.whatsapp || "";
  var country = data.country || "";
  var serviceProduct = data.primaryProduct || data.serviceType || data.desiredPosition || data.serviceRequired || "";
  var remarks = data.remarks || data.projectDetails || data.message || "";
  
  // Handle File Upload if base64 file data present
  var fileUrl = "";
  if (data.fileData && data.fileName) {
    try {
      fileUrl = saveFileToDrive(data.fileName, data.fileData, data.fileType, leadId);
    } catch (fErr) {
      fileUrl = "Upload Failed: " + fErr.toString();
    }
  }

  var categoryJson = JSON.stringify(data);
  var status = "New";
  var followUpDate = "";
  var internalNotes = "";

  // 1. Append to Master Sheet "All_Leads"
  var masterSheet = getOrCreateSheet(ss, "All_Leads", [
    "Lead_ID", "Timestamp", "Category", "Source", "Website_ID", 
    "Name", "Company_Name", "Email", "Phone", "WhatsApp", 
    "Country", "Service_Product", "File_Url", "Status", 
    "Follow_Up_Date", "Remarks", "Category_Data_JSON", "Internal_Notes"
  ]);

  masterSheet.appendRow([
    leadId,
    Utilities.formatDate(timestamp, "GMT+6", "yyyy-MM-dd HH:mm:ss"),
    category,
    source,
    websiteId,
    name,
    company,
    email,
    phone,
    whatsapp,
    country,
    serviceProduct,
    fileUrl,
    status,
    followUpDate,
    remarks,
    categoryJson,
    internalNotes
  ]);

  // 2. Append to Category Specific Sheet
  var subSheetName = getCategorySheetName(category);
  var subSheet = getOrCreateCategorySheet(ss, subSheetName, category);
  appendCategorySpecificRow(subSheet, category, leadId, timestamp, data, fileUrl);

  // 3. Send category-wise email notification
  sendCategoryEmail(category, leadId, name, company, email, phone, whatsapp, serviceProduct, remarks);

  return {
    status: "success",
    leadId: leadId,
    message: "Thank you! Your registration has been submitted successfully to ZIABRIDGE Network."
  };
}

function sendCategoryEmail(category, leadId, name, company, email, phone, whatsapp, serviceProduct, remarks) {
  var yourEmail = "ziabridge.bd@gmail.com";
  var subject = "[" + category + "] New Lead - " + leadId;
  var body =
    "Category: " + category + "\n" +
    "Lead ID: " + leadId + "\n\n" +
    "Name: " + name + "\n" +
    "Company: " + company + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n" +
    "WhatsApp: " + whatsapp + "\n" +
    "Service/Product: " + serviceProduct + "\n" +
    "Remarks: " + remarks;

  try {
    MailApp.sendEmail(yourEmail, subject, body);
  } catch (mailErr) {
    // Email failure should not stop the lead from being saved
  }
}

function saveFileToDrive(fileName, base64Data, fileType, leadId) {
  var folder;
  if (DRIVE_FOLDER_ID && DRIVE_FOLDER_ID.trim() !== "") {
    folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  } else {
    folder = DriveApp.getRootFolder();
  }
  
  var decoded = Utilities.base64Decode(base64Data.split(',')[1] || base64Data);
  var blob = Utilities.newBlob(decoded, fileType || "application/octet-stream", leadId + "_" + fileName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#1A2B4C").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getCategorySheetName(category) {
  var catLower = (category || "").toLowerCase();
  if (catLower.indexOf("factory") !== -1) return "Factory_Leads";
  if (catLower.indexOf("buyer") !== -1) return "Buyer_Leads";
  if (catLower.indexOf("freelancer") !== -1) return "Freelancer_Leads";
  if (catLower.indexOf("job") !== -1) return "JobSeeker_Leads";
  if (catLower.indexOf("service") !== -1) return "ServiceProvider_Leads";
  if (catLower.indexOf("contact") !== -1) return "Contact_Inquiries";
  return "General_Leads";
}

function getOrCreateCategorySheet(ss, name, category) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    var headers = ["Lead_ID", "Timestamp", "Source", "Name", "Company", "Email", "Phone", "WhatsApp", "Country", "Primary_Detail", "File_Url", "Full_Details_JSON"];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#0F3460").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function appendCategorySpecificRow(sheet, category, leadId, timestamp, data, fileUrl) {
  var name = data.name || data.fullName || data.contactPerson || "";
  var company = data.companyName || data.factoryName || data.businessName || "";
  var email = data.email || "";
  var phone = data.phone || "";
  var whatsapp = data.whatsapp || "";
  var country = data.country || "";
  var primaryDetail = data.mainProduct || data.productsInterested || data.service || data.desiredPosition || data.serviceType || "";

  sheet.appendRow([
    leadId,
    Utilities.formatDate(timestamp, "GMT+6", "yyyy-MM-dd HH:mm:ss"),
    data.source || "Website",
    name,
    company,
    email,
    phone,
    whatsapp,
    country,
    primaryDetail,
    fileUrl,
    JSON.stringify(data)
  ]);
}
