document.addEventListener("DOMContentLoaded", function () {
  const testsContainer = document.getElementById("tests-container");
  const regularTestsContainer = document.getElementById("regular-checks-container");
  const testPackagesContainer = document.getElementById("test-packages-container");
  const healtCheckupsContainer = document.getElementById("health-checkups-container");

  const regularTests = [
    {
      id: 1,
      name: "Vitamin D Test",
      price: 300,
      icon: "../assets/test-icons/health.png"
    },
    {
      id: 2,
      name: "Vitamin B12 Test",
      price: 250,
      icon: "../assets/test-icons/vitamin.png"
    },
    {
      id: 3,
      name: "Thyroid Profile Test",
      price: 500,
      icon: "../assets/test-icons/thyroid-gland.png"
    },
    {
      id: 4,
      name: "Liver Function Test",
      price: 400,
      icon: "../assets/test-icons/liver.png"
    },
    {
      id: 5,
      name: "Kidney Test",
      price: 450,
      icon: "../assets/test-icons/kidney.png"
    },
    {
      id: 6,
      name: "Blood Sugar Test",
      price: 200,
      icon: "../assets/test-icons/sugar-blood-level.png"
    },
    {
      id: 7,
      name: "Blood Cells Test",
      price: 350,
      icon: "../assets/test-icons/red-blood-cells.png"
    },
    {
      id: 8,
      name: "Lipid Profile Test",
      price: 600,
      icon: "../assets/test-icons/lipid.png"
    }
  ];

  const testPackages = [
    {
      id: 1,
      name: "Diabetes Care",
      price: 799,
      total: 40,
      tests: [
        "Fasting Blood Sugar (FBS)", "HbA1c", "Average Blood Glucose", "Complete Blood Count (CBC)", 
        "Lipid Profile - Total Cholesterol", "Lipid Profile - HDL", "Lipid Profile - LDL", 
        "Lipid Profile - Triglycerides", "Thyroid Stimulating Hormone (TSH)", "Insulin Levels",
        "C-Peptide", "Glucose Tolerance Test", "Creatinine", "Urea", "Sodium", "Potassium", 
        "Calcium", "Magnesium", "Phosphate", "Vitamin D", "Vitamin B12", "Iron Studies", 
        "Ferritin", "Transferrin", "Liver Function Test (ALT/SGPT)", "Liver Function Test (AST/SGOT)", 
        "Albumin", "Bilirubin", "Alkaline Phosphatase", "Gamma-GT", "Uric Acid", 
        "C-Reactive Protein (CRP)", "Erythrocyte Sedimentation Rate (ESR)", "Hemoglobin A1c", 
        "Glycemic Index", "Cortisol", "Renal Function - BUN", "Renal Function - Creatinine Clearance", 
        "Microalbumin", "Proinsulin", "Homocysteine"
      ],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "The Diabetes Care Package helps screen and diagnose prediabetes, diabetes and other types of diabetes. It provides a range of tests for key diabetes parameters such as Fasting Blood Sugar (FBS), HbA1c, and Average Blood Glucose. In addition, it also includes tests for Complete Blood Count / Hemogram (CBC), Lipid Profile, Thyroid.",
      icon: "../assets/package-icons/diabetes-package.png"
    },
    {
      id: 2,
      name: "Heart Care",
      price: 999,
      total: 50,
      tests: [
        "Lipid Profile - Total Cholesterol", "Lipid Profile - HDL", "Lipid Profile - LDL", 
        "Lipid Profile - Triglycerides", "Apolipoprotein A1", "Apolipoprotein B", 
        "Lipoprotein (a)", "C-Reactive Protein (CRP)", "Homocysteine", "Troponin I", 
        "Troponin T", "Pro-BNP", "Complete Blood Count (CBC)", "Hemoglobin", "Hematocrit",
        "Platelet Count", "White Blood Cell Count", "Red Blood Cell Count", 
        "Electrolytes - Sodium", "Electrolytes - Potassium", "Electrolytes - Chloride", 
        "Calcium", "Magnesium", "Phosphate", "Vitamin D", "Vitamin B12", "Thyroid Stimulating Hormone (TSH)", 
        "Free T3", "Free T4", "Glucose Tolerance Test", "HbA1c", "Liver Function Test (ALT/SGPT)", 
        "Liver Function Test (AST/SGOT)", "Bilirubin", "Albumin", "Alkaline Phosphatase", 
        "Kidney Function Test - Creatinine", "Kidney Function Test - Urea", 
        "Glomerular Filtration Rate (GFR)", "Uric Acid", "Microalbumin", 
        "Renal Function - BUN", "Renal Function - Creatinine Clearance", "High Sensitivity CRP", 
        "D-dimer", "Fibrinogen", "Prothrombin Time (PT)", "INR", "Vitamin K"
      ],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "The Heart Care Package is designed to help you monitor your heart health. It provides a range of tests to check for your Lipid Profile, Liver Function, Kidney Function, Thyroid Function, Complete Blood Count, Blood Sugar. It also includes tests for Sodium, Chloride and Calcium levels in the body.",
      icon: "../assets/package-icons/heart-package.png"
    },
    {
      id: 3,
      name: "Kidney Care",
      price: 899,
      total: 48,
      tests: [
        "Kidney Function Test - Creatinine", "Kidney Function Test - Urea", 
        "Glomerular Filtration Rate (GFR)", "Uric Acid", "Electrolytes - Sodium", 
        "Electrolytes - Potassium", "Electrolytes - Chloride", "Calcium", 
        "Phosphate", "Magnesium", "Vitamin D", "Renal Function - BUN", 
        "Renal Function - Creatinine Clearance", "Microalbumin", 
        "Protein/Creatinine Ratio", "Urine Routine Examination", "Complete Blood Count (CBC)", 
        "Hemoglobin", "Hematocrit", "Platelet Count", "White Blood Cell Count", 
        "Red Blood Cell Count", "Liver Function Test (ALT/SGPT)", 
        "Liver Function Test (AST/SGOT)", "Bilirubin", "Albumin", "Alkaline Phosphatase", 
        "Gamma-GT", "Thyroid Stimulating Hormone (TSH)", "Free T3", "Free T4", 
        "Vitamin B12", "C-Reactive Protein (CRP)", "Erythrocyte Sedimentation Rate (ESR)", 
        "Fasting Blood Sugar (FBS)", "HbA1c", "Average Blood Glucose", 
        "Lipid Profile - Total Cholesterol", "Lipid Profile - HDL", 
        "Lipid Profile - LDL", "Lipid Profile - Triglycerides", "Insulin Levels", 
        "Parathyroid Hormone (PTH)", "Serum Osmolality", "Urine Osmolality", 
        "Cystatin C", "Beta-2 Microglobulin", "Vitamin C"
      ],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "The Kidney Care Package is designed to help you monitor your kidney health. It provides a range of tests to check for your Liver Function, Kidney Function, Thyroid Function, Complete Blood Count, Blood Sugar, Lipid Profile. It also includes tests for Sodium, Chloride and Calcium levels in the body.",
      icon: "../assets/package-icons/kidney-package.png"
    },
    {
      id: 4,
      name: "Liver Care",
      price: 899,
      total: 48,
      tests: [
        "Liver Function Test (ALT/SGPT)", "Liver Function Test (AST/SGOT)", 
        "Bilirubin - Total", "Bilirubin - Direct", "Bilirubin - Indirect", 
        "Alkaline Phosphatase", "Gamma-GT", "Albumin", "Total Protein", 
        "Prothrombin Time (PT)", "INR", "Thyroid Stimulating Hormone (TSH)", 
        "Free T3", "Free T4", "Vitamin B12", "C-Reactive Protein (CRP)", 
        "Complete Blood Count (CBC)", "Hemoglobin", "Hematocrit", 
        "Platelet Count", "White Blood Cell Count", "Red Blood Cell Count", 
        "Urea", "Creatinine", "Glomerular Filtration Rate (GFR)", "Calcium", 
        "Phosphate", "Magnesium", "Vitamin D", "Lipid Profile - Total Cholesterol", 
        "Lipid Profile - HDL", "Lipid Profile - LDL", "Lipid Profile - Triglycerides", 
        "Blood Sugar - Fasting", "Blood Sugar - Postprandial", 
        "HbA1c", "Iron Studies", "Ferritin", "Transferrin", 
        "Electrolytes - Sodium", "Electrolytes - Potassium", "Electrolytes - Chloride", 
        "Lactate Dehydrogenase (LDH)", "Alpha-fetoprotein (AFP)", "Ammonia", 
        "Serum Amylase", "Lipase", "Uric Acid", "Parathyroid Hormone (PTH)"
      ],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "The Liver Care Package is designed to help you monitor your liver health. It provides a range of tests to check for your Kidney Function, Liver Function, Thyroid Function, Complete Blood Count, Blood Sugar, Lipid Profile. It also includes tests for Sodium, Chloride and Calcium levels in the body.",
      icon: "../assets/package-icons/liver-package.png"
    }
  ];
  

  const healthCheckups = [
    {
      id: 1,
      name: "Basic Health Checkup",
      price: 1049,
      total: 56,
      tests: ["Thyroid Function", "Lipid Profile", "Kidney Function", "Liver Function", "Fasting Blood Sugar"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      preparation: "12 hours fasting",
      description: "Basic Health Checkup package can be taken by anyone who wants to track the vital parameters of their body. Such health checkups can help catch the warning signs of hidden illnesses in the body. It provides a range of tests to check for your Thyroid Function, Lipid Profile, Kidney Function, Liver Function, Fasting Blood Sugar etc.",
      icon: "../assets/checkup-badges/basic-checkup-plan.png"
    },
    {
      id: 2,
      name: "Bronze Health Checkup",
      price: 1449,
      total: 82,
      tests: ["Kidney Function", "Liver Function", "Thyroid Gland", "Lipid Profile", "Complete Blood Count"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      preparation: "12 hours fasting",
      description: "The Regular Health Checkup is an ideal test package that covers most of the blood and urine tests needed for essential health monitoring. It covers tests for Kidney and Liver Function, Thyroid Gland, Lipid Profile, Complete Blood Count. It also checks for Sodium, Chloride and Calcium levels in the body.",
      icon: "../assets/checkup-badges/bronze-checkup-plan.png"
    },
    {
      id: 3,
      name: "Silver Health Checkup",
      price: 1949,
      total: 90,
      tests: ["Heart", "Thyroid", "Kidney", "Liver", "Blood Sugar", "Complete Blood Count", "Lipid Profile", "Complete Urine Analysis"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      preparation: "12 hours fasting",
      description: "The Comprehensive Full Body Checkup with Vitamin D & B12 is ideal for people who want to monitor their overall health. It provides a range of tests to check the health of the Heart, Thyroid, Kidney, and Liver. It also includes tests for Blood Sugar, Complete Blood Count, Lipid Profile and Complete Urine Analysis.",
      icon: "../assets/checkup-badges/silver-checkup-plan.png"
    },
    {
      id: 4,
      name: "Gold Health Checkup",
      price: 2499,
      total: 97,
      tests: ["Heart", "Thyroid", "Kidney", "Liver", "Blood Sugar", "Complete Blood Count", "Lipid Profile", "Complete Urine Analysis"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      preparation: "12 hours fasting",
      description: "Prevention is better than cure! Unhealthy lifestyle or stress can impact one's health. Health Checkup can help pick up early signs of any disease or illness. This package provides a range of tests that check important body parameters like Heart, Thyroid, Kidney, Liver, Blood Sugar, Complete Blood Count, Complete Urine Analysis.",
      icon: "../assets/checkup-badges/gold-checkup-plan.png"
    }
  ];

  function renderRegularCards(tests) {
    tests.forEach((test) => {
      const testElement = document.createElement("div");
      testElement.className = "testCard col-md-3 col-sm-12";
      testElement.innerHTML = `
        <div class="regular-test-card">
          <div class="regular-left">
            <img src="${test.icon}" alt="${test.name}" class="regular-icon">
          </div>
          <div class="regular-right">
            <p>${test.name}</p>
            <p>₹ ${test.price}</p>
            <button class="book-button" data-id="${test.id}">Book Now</button>
          </div>
        </div>
      `;
      regularTestsContainer.appendChild(testElement);
    });
  }


  function renderTestPackageCards(tests) {
    tests.forEach((test) => {
      const testElement = document.createElement("div");
      testElement.className = "testCard col-md-3 col-sm-12";
      testElement.innerHTML = `
        <div class="test-package-card">
            <div class="test-header">
            <div class="header-left">
              <img src="${test.icon}">
            </div>
            <div class="header-right">
              <p>${test.name}</p>
              <p>${test.total} Tests Included</p>
            </div>
          </div>
          <div class="test-footer">
            <div class="footer-left">
              <p>₹ ${test.price}</p>
            </div>
            <div class="footer-right">
              <button>Book Now</button>
            </div>
          </div>
        </div>
            `;
      testPackagesContainer.appendChild(testElement);
      testElement.addEventListener("click", () => viewTestPackage(test));
    });
  }
  
  function viewTestPackage(test) {
    const mainContainer = document.getElementById("main-container");
    const testPackageView = document.getElementById("test-package-view");
    mainContainer.innerHTML = "";

    const content = `
      <div class="view-header row">
        <span>
          <a href="labtests.html">
            <i class="fa fa-arrow-left"></i> Back to Store
          </a>
        </span>
      </div>
      <div id="view-content" class="row">
        <div class="content-left col-md-4 col-sm-12">
          <div class="package-card">
            <p class="package-title">${test.name}</p>
            <div class="package-item">
              <i class="fa fa-calendar"></i>
              <span>Avaliable Slot in <strong>${test.slot}</strong></span>
            </div>
            <div class="package-item">
              <i class="fa fa-clipboard"></i>
              <span>Reports in <strong>${test.delivery_time}</strong></span>
            </div>
            <div class="package-item">
              <i class="fa fa-message"></i>
              <span>${test.preparation}</span>
            </div>
            <div class="package-price">
              <span>₹ ${test.price}</span>
            </div>

            <button class="book-btn">Book Now</button>
          </div>
          <div class="test-overview">
            <h2>Test Overview</h2>
            <p>
              ${test.description}
            </p>
            <table>
              <tr>
                <td>Sample Type</td>
                <td>${test.sample_type}</td>
              </tr>
              <tr>
                <td>Reports Delivery</td>
                <td>${test.delivery_time}</td>
              </tr>
              <tr>
                <td>Price/Cost</td>
                <td>₹ ${test.price}</td>
              </tr>
              <tr>
                <td>Number of Tests Included</td>
                <td>${test.total}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>${test.gender}</td>
              </tr>
              <tr>
                <td>Age Group</td>
                <td>${test.age}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="content-right col-md-8 col-sm-12">
          <div id="tests-included">
            <h2>Tests Included (${test.total})</h2>
            <ul id="test-list">
              ${test.tests.map((test) => `<li>${test}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
    testPackageView.innerHTML = content;
    window.location.href = "#header";
  }

  function renderCheckupCards(tests) {
    tests.forEach((test) => {
      const checkupElement = document.createElement("div");
      checkupElement.className = "checkupCard col-md-3 col-sm-12";
      checkupElement.innerHTML = `
        <div class="checkup-card">
          <div class="checkup-top">
            <div class="checkup-left">
              <p class="checkup-title">${test.name}</p>
              <p class="book-btn">Book Now →</p>
            </div>
            </div>
            <div class="checkup-right">
              <img src="${test.icon || 'default-image-url'}" alt="${test.name}" class="checkup-image">
            </div>
          <div class="checkup-bottom">
            <span class="checkup-price">Rs. <p>${test.price}</p></span>
          </div>
        </div>
      `;

      healtCheckupsContainer.appendChild(checkupElement);
    })
  }

  renderRegularCards(regularTests);
  renderTestPackageCards(testPackages);
  renderCheckupCards(healthCheckups);
});
