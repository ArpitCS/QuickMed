document.addEventListener("DOMContentLoaded", function () {
  let tests = [
    {
      id: 1,
      name: "Comprehensive Full Body Checkup Test with Vitamin D & B12",
      tests: 90,
      description: "The Comprehensive Full Body Checkup with Vitamin D & B12 is ideal for people who want to monitor their overall health. It provides a range of tests to check the health of the Heart, Thyroid, Kidney, and Liver. It also includes tests for Blood Sugar, Complete Blood Count, Lipid Profile and Complete Urine Analysis. ",
      price: 1949,
    },
    {
      id: 2,
      name: "Healthy Full Body Checkup",
      tests: 90,
      description: "The Healthy 2024 Full Body Checkup is best for those who want to keep track of their overall health. This checkup includes necessary tests for Blood Sugar Levels, Cholesterol, Kidney and Liver Function, Thyroid Gland Function, Lipid Profile, Urine Routine and more. It also checks for Sodium, Chloride and Calcium levels in the body.",
      price: 1449,
    },
    {
      id: 3,
      name: "Diabetes Care",
      tests: 40,
      description: "The Diabetes Care Package helps screen and diagnose prediabetes, diabetes and other types of diabetes. It provides a range of tests for key diabetes parameters such as Fasting Blood Sugar (FBS), HbA1c, and Average Blood Glucose. In addition, it also includes tests for Complete Blood Count / Hemogram (CBC), Lipid Profile, Thyroid ",
      price: 799,
    },
    {
      id: 4,
      name: "Basic Health Checkup",
      tests: 56,
      description: "Basic Health Checkup package can be taken by anyone who wants to track the vital parameters of their body. Such health checkups can help catch the warning signs of hidden illnesses in the body. It provides a range of tests to check for your Thyroid Function, Lipid Profile, Kidney Function, Liver Function, Fasting Blood Sugar etc.",
      price: 1049,
    },
    {
      id: 5,
      name: "Aarogyam Full Body Checkup with Vitamins",
      tests: 97,
      description: "Prevention is better than cure! Unhealthy lifestyle or stress can impact one's health. Health Checkup can help pick up early signs of any disease or illness. This package provides a range of tests that check important body parameters like Heart, Thyroid, Kidney, Liver, Blood Sugar, Complete Blood Count, Complete Urine Analysis.",
      price: 2499,
    },
    {
      id: 6,
      name: "Vitamin D & B12 Combo",
      tests: 2,
      description: "This combo provides tests that screen for the deficiency of two essential vitamins - Vitamin D total and Vitamin B12. In conditions like osteoporosis, anaemia, bone health, nerve health, dullness, Vitamin D and B12 combo tests play an essential role in monitoring ongoing treatment.",
      price: 600,
    },
    {
      id: 7,
      name: "Thyroid Care",
      tests: 31,
      description: "India has an estimated 40 million people formally diagnosed with thyroid disorders and hypothyroidism is the most common of thyroid disorders in India, affecting one in ten adults.This package primarily tests for key thyroid parameters like Triiodothyronine (T3) and Thyroxine (T4).",
      price: 749,
    },
    {
      id: 8,
      name: "Advanced Full Body Checkup",
      tests: 82,
      description: "The Advanced Full Body Checkup is an ideal test package that covers most of the blood and urine tests needed for essential health monitoring. It covers tests for Kidney and Liver Function, Thyroid Gland, Lipid Profile, Complete Blood Count. It also checks for Sodium, Chloride and Calcium levels in the body.",
      price: 1449,
    },
    {
      id: 9,
      name: "Women's Master Checkup with Cancer & Arthritis Screening",
      tests: 93,
      description: "Prevention is better than cure! A sedentary lifestyle or poor eating patterns predispose a woman to various health problems. Health Checkup can help pick up early signs of any disease or illness. This package provides a range of tests that check important body parameters.",
      price: 2299,
    },
  ];

  const testsContainer = document.getElementById("tests");

  function loadTests() {
    testsContainer.innerHTML = "";

    tests.forEach((test) => {
      const testElement = document.createElement("div");
      testElement.className = "testCard col-md-4 col-sm-12";
      testElement.innerHTML = `
            <div class="top">
                <div class="card-title">${test.name}</div>
                <span class="card-tests">${test.tests} Tests</span>
                <div class="card-description">${test.description}</div>
            </div>
            <div class="bottom">
                <div class="card-price">Rs. ${test.price}</div>
                <span id="bookBtn"><a>Book Now  </a></span>
            </div>
        `;

      testsContainer.appendChild(testElement);
    });
  }

  loadTests();

  const bookButtons = document.querySelectorAll("#bookBtn");
    bookButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(tests[index]);
        localStorage.setItem("cart", JSON.stringify(cart));
        });
    });
});
