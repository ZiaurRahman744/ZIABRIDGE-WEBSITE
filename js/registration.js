/**
 * ZIABRIDGE Lead Generation & Business Network Platform
 * Category Switcher & Dynamic Field Renderer
 */

document.addEventListener("DOMContentLoaded", function () {
  const categoryTabs = document.getElementById("categoryTabs");
  const categoryTitle = document.getElementById("categoryTitle");
  const categoryDescription = document.getElementById("categoryDescription");
  const formCategoryInput = document.getElementById("formCategoryInput");
  const formSourceInput = document.getElementById("formSourceInput");
  const dynamicContainer = document.getElementById("dynamicCategoryFields");
  const nameLabel = document.getElementById("nameLabel");
  const companyLabel = document.getElementById("companyLabel");
  const fileDropZone = document.getElementById("fileDropZone");
  const regFileInput = document.getElementById("regFileInput");
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  // Category Configuration Matrix
  const categories = {
    factory: {
      title: "Factory Registration",
      desc: "Register your garment manufacturing factory details to get matched with international buyers, brands, and sourcing agents.",
      nameLabel: "Contact Person Full Name <span class='req-star'>*</span>",
      companyLabel: "Factory Name <span class='opt-tag'>(Recommended)</span>",
      source: "ZIABRIDGE Website - Factory Registration",
      fieldsHtml: `
        <div class="reg-form-grid">
          <div class="reg-form-group full-width">
            <label>Factory Address <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="factoryAddress" class="reg-input" placeholder="e.g. Plot 45, Sector 7, CEPZ, Chittagong, Bangladesh">
          </div>
          <div class="reg-form-group full-width">
            <label>Main Products / Specialty <span class="opt-tag">(Select all that apply)</span></label>
            <div class="pills-container">
              <input type="checkbox" id="p_woven" name="mainProduct" value="Woven Bottoms/Tops" class="pill-checkbox"><label for="p_woven" class="pill-label">Woven</label>
              <input type="checkbox" id="p_knit" name="mainProduct" value="Knitwear / T-Shirts" class="pill-checkbox"><label for="p_knit" class="pill-label">Knitwear</label>
              <input type="checkbox" id="p_denim" name="mainProduct" value="Denim / Jeans" class="pill-checkbox"><label for="p_denim" class="pill-label">Denim</label>
              <input type="checkbox" id="p_sweater" name="mainProduct" value="Sweaters" class="pill-checkbox"><label for="p_sweater" class="pill-label">Sweater</label>
              <input type="checkbox" id="p_outerwear" name="mainProduct" value="Jackets / Outerwear" class="pill-checkbox"><label for="p_outerwear" class="pill-label">Jackets</label>
              <input type="checkbox" id="p_active" name="mainProduct" value="Activewear / Sportswear" class="pill-checkbox"><label for="p_active" class="pill-label">Activewear</label>
              <input type="checkbox" id="p_under" name="mainProduct" value="Lingerie / Undergarments" class="pill-checkbox"><label for="p_under" class="pill-label">Lingerie</label>
            </div>
          </div>
          <div class="reg-form-group">
            <label>Monthly Production Capacity <span class="opt-tag">(Optional)</span></label>
            <select name="productionCapacity" class="reg-select">
              <option value="">Select Capacity</option>
              <option>Below 50,000 Pcs/month</option>
              <option>50,000 - 100,000 Pcs/month</option>
              <option>100,000 - 300,000 Pcs/month</option>
              <option>300,000 - 500,000 Pcs/month</option>
              <option>500,000+ Pcs/month</option>
            </select>
          </div>
          <div class="reg-form-group">
            <label>Minimum Order Quantity (MOQ) <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="moq" class="reg-input" placeholder="e.g. 1,000 pcs per style">
          </div>
          <div class="reg-form-group">
            <label>Number of Employees / Workers <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="employeeCount" class="reg-input" placeholder="e.g. 450 Workers">
          </div>
          <div class="reg-form-group">
            <label>Certifications & Compliance <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="certifications" class="reg-input" placeholder="e.g. WRAP, BSCI, OEKO-TEX, SEDEX">
          </div>
          <div class="reg-form-group">
            <label>Website / Facebook Page <span class="opt-tag">(Optional)</span></label>
            <input type="url" name="website" class="reg-input" placeholder="https://">
          </div>
          <div class="reg-form-group">
            <label>Google Map Link <span class="opt-tag">(Optional)</span></label>
            <input type="url" name="googleMap" class="reg-input" placeholder="https://maps.google.com/...">
          </div>
        </div>
      `
    },
    buyer: {
      title: "Buyer Registration",
      desc: "Connect with verified apparel factories, quality inspection teams, and sourcing partners globally.",
      nameLabel: "Buyer / Contact Name <span class='req-star'>*</span>",
      companyLabel: "Brand / Company Name <span class='opt-tag'>(Recommended)</span>",
      source: "ZIABRIDGE Website - Buyer Registration",
      fieldsHtml: `
        <div class="reg-form-grid">
          <div class="reg-form-group full-width">
            <label>Interested Products <span class="opt-tag">(Select all that apply)</span></label>
            <div class="pills-container">
              <input type="checkbox" id="b_woven" name="productsInterested" value="Woven" class="pill-checkbox"><label for="b_woven" class="pill-label">Woven</label>
              <input type="checkbox" id="b_knit" name="productsInterested" value="Knitwear" class="pill-checkbox"><label for="b_knit" class="pill-label">Knitwear</label>
              <input type="checkbox" id="b_denim" name="productsInterested" value="Denim" class="pill-checkbox"><label for="b_denim" class="pill-label">Denim</label>
              <input type="checkbox" id="b_sweater" name="productsInterested" value="Sweater" class="pill-checkbox"><label for="b_sweater" class="pill-label">Sweater</label>
              <input type="checkbox" id="b_active" name="productsInterested" value="Sportswear" class="pill-checkbox"><label for="b_active" class="pill-label">Sportswear</label>
              <input type="checkbox" id="b_leather" name="productsInterested" value="Leather & Bags" class="pill-checkbox"><label for="b_leather" class="pill-label">Leather & Bags</label>
            </div>
          </div>
          <div class="reg-form-group">
            <label>Required Services <span class="opt-tag">(Optional)</span></label>
            <select name="requiredService" class="reg-select">
              <option value="">Select Service Needed</option>
              <option>Full Apparel Sourcing & Production</option>
              <option>Third Party Quality Inspection</option>
              <option>Factory Audit & Compliance Check</option>
              <option>Apparel Tech Pack & Pattern Development</option>
              <option>Merchandising Support</option>
            </select>
          </div>
          <div class="reg-form-group">
            <label>Target Order Quantity (MOQ) <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="buyerMoq" class="reg-input" placeholder="e.g. 2,000 pcs per order">
          </div>
          <div class="reg-form-group">
            <label>Target Price Range <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="targetPrice" class="reg-input" placeholder="e.g. $4.50 - $6.00 FOB">
          </div>
          <div class="reg-form-group">
            <label>Company Website / LinkedIn <span class="opt-tag">(Optional)</span></label>
            <input type="url" name="buyerWebsite" class="reg-input" placeholder="https://">
          </div>
        </div>
      `
    },
    freelancer: {
      title: "Freelancer Network Registration",
      desc: "Join ZIABRIDGE's elite network of garment experts: Pattern Makers, Tech Pack Designers, CLO3D Artists, QCs, and Merchandisers.",
      nameLabel: "Freelancer Full Name <span class='req-star'>*</span>",
      companyLabel: "Agency / Independent Name <span class='opt-tag'>(Optional)</span>",
      source: "ZIABRIDGE Website - Freelancer Registration",
      fieldsHtml: `
        <div class="reg-form-grid">
          <div class="reg-form-group">
            <label>Primary Expertise / Service <span class="req-star">*</span></label>
            <select name="service" class="reg-select" required>
              <option value="">Select Service Expertise</option>
              <option>Tech Pack Creation & Spec Sheets</option>
              <option>Pattern Making & Grading (CAD)</option>
              <option>3D Apparel Design (CLO3D / Browzwear)</option>
              <option>Marker Making & Consumption</option>
              <option>Graphic & Print Design</option>
              <option>Quality Control & Inline Inspection</option>
              <option>Garment Merchandising</option>
            </select>
          </div>
          <div class="reg-form-group">
            <label>Years of Experience <span class="opt-tag">(Optional)</span></label>
            <select name="experience" class="reg-select">
              <option value="">Select Experience Level</option>
              <option>1 - 3 Years</option>
              <option>3 - 5 Years</option>
              <option>5 - 10 Years</option>
              <option>10+ Years Expert</option>
            </select>
          </div>
          <div class="reg-form-group">
            <label>Portfolio / Behance / LinkedIn URL <span class="opt-tag">(Optional)</span></label>
            <input type="url" name="portfolioUrl" class="reg-input" placeholder="https://">
          </div>
          <div class="reg-form-group">
            <label>Fiverr / Upwork Profile URL <span class="opt-tag">(Optional)</span></label>
            <input type="url" name="marketplaceUrl" class="reg-input" placeholder="https://">
          </div>
          <div class="reg-form-group">
            <label>Current Availability <span class="opt-tag">(Optional)</span></label>
            <select name="availability" class="reg-select">
              <option>Full-time Freelance</option>
              <option>Part-time / Hourly</option>
              <option>Project-based Contract</option>
            </select>
          </div>
          <div class="reg-form-group">
            <label>Expected Hourly / Monthly Rate <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="expectedSalary" class="reg-input" placeholder="e.g. $15/hr or $50/techpack">
          </div>
        </div>
      `
    },
    "job-seeker": {
      title: "Job Seeker Registration",
      desc: "Upload your CV to be considered for job openings in garment factories, buying houses, inspection companies, and corporate offices.",
      nameLabel: "Candidate Full Name <span class='req-star'>*</span>",
      companyLabel: "Current Employer <span class='opt-tag'>(Optional)</span>",
      source: "ZIABRIDGE Website - Job Seeker Registration",
      fieldsHtml: `
        <div class="reg-form-grid">
          <div class="reg-form-group">
            <label>Desired Job Position <span class="req-star">*</span></label>
            <input type="text" name="desiredPosition" class="reg-input" placeholder="e.g. Senior Merchandiser / Quality Manager" required>
          </div>
          <div class="reg-form-group">
            <label>Total Experience <span class="opt-tag">(Optional)</span></label>
            <select name="experienceYears" class="reg-select">
              <option value="">Select Experience</option>
              <option>Fresh Graduate / Trainee</option>
              <option>1 - 3 Years</option>
              <option>3 - 6 Years</option>
              <option>6 - 10 Years</option>
              <option>10+ Years Senior Executive</option>
            </select>
          </div>
          <div class="reg-form-group full-width">
            <label>Key Skills & Software Expertise <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="skills" class="reg-input" placeholder="e.g. Gerber CAD, Lectra, ERP, Fabric Sourcing, Quality Auditing">
          </div>
          <div class="reg-form-group">
            <label>Present Location / District <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="location" class="reg-input" placeholder="e.g. Dhaka, Bangladesh">
          </div>
          <div class="reg-form-group">
            <label>Expected Monthly Salary <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="expectedSalary" class="reg-input" placeholder="e.g. 60,000 BDT or Negotiable">
          </div>
        </div>
      `
    },
    "service-provider": {
      title: "Service Provider & Supplier Registration",
      desc: "Register your business to supply raw materials, accessories, washing, printing, embroidery, logistics, or inspection services.",
      nameLabel: "Contact Person Full Name <span class='req-star'>*</span>",
      companyLabel: "Business / Company Name <span class='req-star'>*</span>",
      source: "ZIABRIDGE Website - Service Provider Registration",
      fieldsHtml: `
        <div class="reg-form-grid">
          <div class="reg-form-group">
            <label>Service Category / Type <span class="req-star">*</span></label>
            <select name="serviceType" class="reg-select" required>
              <option value="">Select Service Category</option>
              <option>Third Party Inspection Agency</option>
              <option>Buying House / Sourcing Agency</option>
              <option>Fabric & Yarn Supplier</option>
              <option>Trims & Accessories Manufacturer</option>
              <option>Printing & Embroidery Factory</option>
              <option>Washing & Dyeing Factory</option>
              <option>Packaging & Cartons</option>
              <option>Freight & Shipping Logistics</option>
              <option>Software & IT Solutions</option>
            </select>
          </div>
          <div class="reg-form-group">
            <label>Office / Factory Address <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="officeAddress" class="reg-input" placeholder="e.g. Uttara, Dhaka">
          </div>
          <div class="reg-form-group">
            <label>Website / Facebook Page <span class="opt-tag">(Optional)</span></label>
            <input type="url" name="website" class="reg-input" placeholder="https://">
          </div>
          <div class="reg-form-group">
            <label>Years in Operation <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="operationYears" class="reg-input" placeholder="e.g. 8 Years">
          </div>
        </div>
      `
    },
    general: {
      title: "General Business Network Registration",
      desc: "Join ZIABRIDGE global business network for general inquiries, strategic partnerships, and corporate collaborations.",
      nameLabel: "Full Name <span class='req-star'>*</span>",
      companyLabel: "Company / Organization Name <span class='opt-tag'>(Optional)</span>",
      source: "ZIABRIDGE Website - General Registration",
      fieldsHtml: `
        <div class="reg-form-grid">
          <div class="reg-form-group full-width">
            <label>Interest / Partnership Scope <span class="opt-tag">(Optional)</span></label>
            <input type="text" name="interestScope" class="reg-input" placeholder="e.g. Joint Venture, Distribution, Strategic Alliance">
          </div>
        </div>
      `
    }
  };

  // Switch Active Category
  function setCategory(catKey) {
    const config = categories[catKey] || categories.factory;
    
    // Update active tab UI
    if (categoryTabs) {
      const buttons = categoryTabs.querySelectorAll(".category-tab-btn");
      buttons.forEach(btn => {
        if (btn.getAttribute("data-category") === catKey) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    // Update Header Content & Labels
    categoryTitle.innerHTML = config.title;
    categoryDescription.innerHTML = config.desc;
    nameLabel.innerHTML = config.nameLabel;
    companyLabel.innerHTML = config.companyLabel;
    formCategoryInput.value = config.title;
    formSourceInput.value = config.source;

    // Render Dynamic Fields
    dynamicContainer.innerHTML = config.fieldsHtml;
  }

  // Handle Tab Click Events
  if (categoryTabs) {
    categoryTabs.addEventListener("click", function (e) {
      const btn = e.target.closest(".category-tab-btn");
      if (btn) {
        const catKey = btn.getAttribute("data-category");
        setCategory(catKey);
      }
    });
  }

  // Read URL Query Parameter (e.g. register.html?category=buyer&source=campaign)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("category");
  const sourceParam = urlParams.get("source");

  if (catParam && categories[catParam]) {
    setCategory(catParam);
  } else {
    setCategory("factory");
  }

  if (sourceParam) {
    formSourceInput.value = "ZIABRIDGE Website - " + sourceParam;
  }

  // File Drag & Drop UI Display
  if (regFileInput && fileNameDisplay) {
    regFileInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        fileNameDisplay.innerHTML = "<strong>Selected File:</strong> " + this.files[0].name + " (" + Math.round(this.files[0].size / 1024) + " KB)";
      } else {
        fileNameDisplay.innerHTML = "Click or Drag & Drop File Here (PDF, DOCX, ZIP, PNG, JPG)";
      }
    });
  }
});
