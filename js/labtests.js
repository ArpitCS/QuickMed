// document.addEventListener("DOMContentLoaded", function () {
//   let tests = [
//     {
//       id: 1,
//       name: "Comprehensive Full Body Checkup Test with Vitamin D & B12",
//       tests: 90,
//       description:
//         "The Comprehensive Full Body Checkup with Vitamin D & B12 is ideal for people who want to monitor their overall health. It provides a range of tests to check the health of the Heart, Thyroid, Kidney, and Liver. It also includes tests for Blood Sugar, Complete Blood Count, Lipid Profile and Complete Urine Analysis. ",
//       price: 1949,
//     },
//     {
//       id: 2,
//       name: "Healthy Full Body Checkup",
//       tests: 90,
//       description:
//         "The Healthy 2024 Full Body Checkup is best for those who want to keep track of their overall health. This checkup includes necessary tests for Blood Sugar Levels, Cholesterol, Kidney and Liver Function, Thyroid Gland Function, Lipid Profile, Urine Routine and more. It also checks for Sodium, Chloride and Calcium levels in the body.",
//       price: 1449,
//     },
//     {
//       id: 3,
//       name: "Diabetes Care",
//       tests: 40,
//       description:
//         "The Diabetes Care Package helps screen and diagnose prediabetes, diabetes and other types of diabetes. It provides a range of tests for key diabetes parameters such as Fasting Blood Sugar (FBS), HbA1c, and Average Blood Glucose. In addition, it also includes tests for Complete Blood Count / Hemogram (CBC), Lipid Profile, Thyroid ",
//       price: 799,
//     },
//     {
//       id: 4,
//       name: "Basic Health Checkup",
//       tests: 56,
//       description:
//         "Basic Health Checkup package can be taken by anyone who wants to track the vital parameters of their body. Such health checkups can help catch the warning signs of hidden illnesses in the body. It provides a range of tests to check for your Thyroid Function, Lipid Profile, Kidney Function, Liver Function, Fasting Blood Sugar etc.",
//       price: 1049,
//     },
//     {
//       id: 5,
//       name: "Aarogyam Full Body Checkup with Vitamins",
//       tests: 97,
//       description:
//         "Prevention is better than cure! Unhealthy lifestyle or stress can impact one's health. Health Checkup can help pick up early signs of any disease or illness. This package provides a range of tests that check important body parameters like Heart, Thyroid, Kidney, Liver, Blood Sugar, Complete Blood Count, Complete Urine Analysis.",
//       price: 2499,
//     },
//     {
//       id: 6,
//       name: "Vitamin D & B12 Combo",
//       tests: 2,
//       description:
//         "This combo provides tests that screen for the deficiency of two essential vitamins - Vitamin D total and Vitamin B12. In conditions like osteoporosis, anaemia, bone health, nerve health, dullness, Vitamin D and B12 combo tests play an essential role in monitoring ongoing treatment.",
//       price: 600,
//     },
//     {
//       id: 7,
//       name: "Thyroid Care",
//       tests: 31,
//       description:
//         "India has an estimated 40 million people formally diagnosed with thyroid disorders and hypothyroidism is the most common of thyroid disorders in India, affecting one in ten adults.This package primarily tests for key thyroid parameters like Triiodothyronine (T3) and Thyroxine (T4).",
//       price: 749,
//     },
//     {
//       id: 8,
//       name: "Advanced Full Body Checkup",
//       tests: 82,
//       description:
//         "The Advanced Full Body Checkup is an ideal test package that covers most of the blood and urine tests needed for essential health monitoring. It covers tests for Kidney and Liver Function, Thyroid Gland, Lipid Profile, Complete Blood Count. It also checks for Sodium, Chloride and Calcium levels in the body.",
//       price: 1449,
//     },
//     {
//       id: 9,
//       name: "Women's Master Checkup with Cancer & Arthritis Screening",
//       tests: 93,
//       description:
//         "Prevention is better than cure! A sedentary lifestyle or poor eating patterns predispose a woman to various health problems. Health Checkup can help pick up early signs of any disease or illness. This package provides a range of tests that check important body parameters.",
//       price: 2299,
//     },
//   ];

//   const productsContainer = document.getElementById("productCards");

//   const cartAmountElement = document.getElementById("cart-amount");
//   function updateCartAmount() {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let totalAmount = cart.reduce((total, item) => total + item.price, 0);
//     cartAmountElement.textContent = `${totalAmount}`;
//   }

//   const testsContainer = document.getElementById("tests");

//   function loadTests() {
//     testsContainer.innerHTML = "";

//     tests.forEach((test) => {
//       const testElement = document.createElement("div");
//       testElement.className = "testCard col-md-4 col-sm-12";
//       testElement.innerHTML = `
//             <div class="top">
//                 <div class="card-title">${test.name}</div>
//                 <span class="card-tests">${test.tests} Tests</span>
//                 <div class="card-description">${test.description}</div>
//             </div>
//             <div class="bottom">
//                 <div class="card-price">Rs. ${test.price}</div>
//                 <span id="bookBtn"><a>Book Now  </a></span>
//             </div>
//         `;

//       testsContainer.appendChild(testElement);
//     });
//   }

//   loadTests();

//   const bookButtons = document.querySelectorAll("#bookBtn");
//   bookButtons.forEach((button, index) => {
//     button.addEventListener("click", function () {
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       cart.push(tests[index]);
//       localStorage.setItem("cart", JSON.stringify(cart));
//       alert(`${tests[index].name} added to cart`);
//       updateCartAmount();
//     });
//   });
// });

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
      icon: "https://placehold.co/40"
    },
    {
      id: 2,
      name: "Vitamin B12 Test",
      price: 250,
      icon: "https://placehold.co/40"
    },
    {
      id: 3,
      name: "Thyroid Profile Test",
      price: 500,
      icon: "https://placehold.co/40"
    },
    {
      id: 4,
      name: "Liver Function Test",
      price: 400,
      icon: "https://placehold.co/40"
    },
    {
      id: 5,
      name: "Kidney Function Test",
      price: 450,
      icon: "https://placehold.co/40"
    },
    {
      id: 6,
      name: "Blood Sugar Test",
      price: 200,
      icon: "https://placehold.co/40"
    },
    {
      id: 7,
      name: "Complete Blood Count",
      price: 350,
      icon: "https://placehold.co/40"
    },
    {
      id: 8,
      name: "Lipid Profile Test",
      price: 600,
      icon: "https://placehold.co/40"
    }
  ];

  const testPackages = [
    {
      id: 1,
      name: "Diabetes Care",
      price: 799,
      total: 40,
      tests: ["Fasting Blood Sugar (FBS)", "HbA1c", "Average Blood Glucose", "Complete Blood Count / Hemogram (CBC)", "Lipid Profile", "Thyroid"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "The Diabetes Care Package helps screen and diagnose prediabetes, diabetes and other types of diabetes. It provides a range of tests for key diabetes parameters such as Fasting Blood Sugar (FBS), HbA1c, and Average Blood Glucose. In addition, it also includes tests for Complete Blood Count / Hemogram (CBC), Lipid Profile, Thyroid.",
      icon: "https://placehold.co/40"
    },
    {
      id: 2,
      name: "Heart Care",
      price: 999,
      total: 50,
      tests: ["Lipid Profile", "Liver Function", "Kidney Function", "Thyroid Function", "Complete Blood Count", "Blood Sugar"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "The Heart Care Package is designed to help you monitor your heart health. It provides a range of tests to check for your Lipid Profile, Liver Function, Kidney Function, Thyroid Function, Complete Blood Count, Blood Sugar. It also includes tests for Sodium, Chloride and Calcium levels in the body.",
      icon: "https://placehold.co/40"
    },
    {
      id: 3,
      name: "Kidney Care",
      price: 899,
      total: 48,
      tests: ["Liver Function", "Kidney Function", "Thyroid Function", "Complete Blood Count", "Blood Sugar", "Lipid Profile"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "The Kidney Care Package is designed to help you monitor your kidney health. It provides a range of tests to check for your Liver Function, Kidney Function, Thyroid Function, Complete Blood Count, Blood Sugar, Lipid Profile. It also includes tests for Sodium, Chloride and Calcium levels in the body.",
      icon: "https://placehold.co/40"
    },
    {
      id: 4,
      name: "Liver Care",
      price: 899,
      total: 48,
      tests: ["Kidney Function", "Liver Function", "Thyroid Function", "Complete Blood Count", "Blood Sugar", "Lipid Profile"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "The Liver Care Package is designed to help you monitor your liver health. It provides a range of tests to check for your Kidney Function, Liver Function, Thyroid Function, Complete Blood Count, Blood Sugar, Lipid Profile. It also includes tests for Sodium, Chloride and Calcium levels in the body.",
      icon: "https://placehold.co/40"
    },
    {
      id: 5,
      name: "Thyroid Care",
      price: 749,
      total: 31,
      tests: ["Triiodothyronine (T3)", "Thyroxine (T4)"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      gender: "Both",
      age: "7 Years & Above",
      preparation: "12 hours fasting",
      description: "India has an estimated 40 million people formally diagnosed with thyroid disorders and hypothyroidism is the most common of thyroid disorders in India, affecting one in ten adults. This package primarily tests for key thyroid parameters like Triiodothyronine (T3) and Thyroxine (T4).",
      icon: "https://placehold.co/40"
    }
  ];

  const healthCheckups = [
    {
      id : 1,
      name: "Basic Health Checkup",
      price: 1049,
      total: 56,
      tests: ["Thyroid Function", "Lipid Profile", "Kidney Function", "Liver Function", "Fasting Blood Sugar"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      preparation: "12 hours fasting",
      description: "Basic Health Checkup package can be taken by anyone who wants to track the vital parameters of their body. Such health checkups can help catch the warning signs of hidden illnesses in the body. It provides a range of tests to check for your Thyroid Function, Lipid Profile, Kidney Function, Liver Function, Fasting Blood Sugar etc.",
      icon: "https://placehold.co/40"
    },
    {
      id: 2,
      name: "Regular Health Checkup",
      price: 1449,
      total: 82,
      tests: ["Kidney Function", "Liver Function", "Thyroid Gland", "Lipid Profile", "Complete Blood Count"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      preparation: "12 hours fasting",
      description: "The Regular Health Checkup is an ideal test package that covers most of the blood and urine tests needed for essential health monitoring. It covers tests for Kidney and Liver Function, Thyroid Gland, Lipid Profile, Complete Blood Count. It also checks for Sodium, Chloride and Calcium levels in the body.",
      icon: "https://placehold.co/40"
    },
    {
      id: 3,
      name: "Comprehensive Health Checkup",
      price: 1949,
      total: 90,
      tests: ["Heart", "Thyroid", "Kidney", "Liver", "Blood Sugar", "Complete Blood Count", "Lipid Profile", "Complete Urine Analysis"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      preparation: "12 hours fasting",
      description: "The Comprehensive Full Body Checkup with Vitamin D & B12 is ideal for people who want to monitor their overall health. It provides a range of tests to check the health of the Heart, Thyroid, Kidney, and Liver. It also includes tests for Blood Sugar, Complete Blood Count, Lipid Profile and Complete Urine Analysis.",
      icon: "https://placehold.co/40"
    },
    {
      id: 4,
      name: "Advanced Health Checkup",
      price: 2499,
      total: 97,
      tests: ["Heart", "Thyroid", "Kidney", "Liver", "Blood Sugar", "Complete Blood Count", "Lipid Profile", "Complete Urine Analysis"],
      sample_type: "Blood",
      slot: "1 Day",
      delivery_time: "1 Day",
      preparation: "12 hours fasting",
      description: "Prevention is better than cure! Unhealthy lifestyle or stress can impact one's health. Health Checkup can help pick up early signs of any disease or illness. This package provides a range of tests that check important body parameters like Heart, Thyroid, Kidney, Liver, Blood Sugar, Complete Blood Count, Complete Urine Analysis.",
      icon: "https://placehold.co/40"
    }
  ];

  function renderRegularCards(tests) {
    tests.forEach((test) => {
      const testElement = document.createElement("div");
      testElement.className = "testCard col-md-3 col-sm-12";
      testElement.innerHTML = `
            <div class="regular-test-card">
            <div class="regular-left">
              <img src="${test.icon}">
            </div>
            <div class="regular-right">
              <p>${test.name}</p>
              <p>₹ ${test.price}</p>
              <button>Book Now</button>
            </div>
          </div>
            `;
      regularTestsContainer.appendChild(testElement);
    });
  }

  function renderTestPackageCars(tests) {
    tests.forEach((test) => {
      const testElement = document.createElement("div");
      testElement.className = "testCard col-md-3 col-sm-12";
      testElement.innerHTML = `
      <div class="test-package-card">
          <div class="test-header">
          <div class="header-left">
            <img src="${test.image}">
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
      testElement.addEventListener("click", () => viewTestPackage(test));
      testPackagesContainer.appendChild(testElement);
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
  }
  
  renderTestPackageCars(testPackages);
  renderRegularCards(regularTests);
});
