// Firebase Imports
import { app, db, auth } from "./firebase.js"; // Suggested code may be subject to a license. Learn more: ~LicenseLog:2683724769.
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
  const popularCardsContainer = document.getElementById("popular-cards");
  let popularProducts = [];

  window.fetchProducts = async function () {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      popularProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(popularProducts);
      loadPopular(popularProducts); // Load products after fetching
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  fetchProducts();

  function loadPopular(products) {
    products.forEach((product) => {
      const cardTemplate = `
            <div class="product-card col-lg-3 col-12" height="100%">
              <div class="product-image">
                <img src="${product.image}" alt="${product.name}"/>
              </div>
              <div class="product-body">
                <div class="product-info-left">
                  <div class="product-categories">${product.categories.join(
                    ", "
                  )}</div>
                  <div class="product-title">${product.name}.</div>
                  <div class="product-brand">by ${product.brand}</div>
                </div>
                <div class="product-info-right">
                  <div class="product-rating">
                    <i class="fa fa-star"></i>
                    (${product.rating})
                  </div>
                  <div class="product-price">₹${product.price}</div>
                </div>
              </div>
              <div class="product-footer">
                <button class="btn" onclick="addToCart('${
                  product.id
                }')">+ Add to Cart</button>
              </div>
            </div>
            `;

      if (product.popular) {
        popularCardsContainer.innerHTML += cardTemplate;
      }
    });
  }

  const consultButton2 = document.getElementById("consultBtn2");
  const consultModalElement = document.querySelector(
    "#consultModalContainer .modal"
  );
  const consultModal = new bootstrap.Modal(consultModalElement);

  consultButton2.addEventListener("click", function () {
    consultModal.show();
  });

  const closeButton = document.getElementById("closeBtn");

  closeButton.addEventListener("click", function () {
    consultModal.hide();
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  });

  document.querySelectorAll(".itemCard").forEach((itemCard) => {
    itemCard.addEventListener("click", function () {
      const value = this.getAttribute("value");
      const filterType = this.getAttribute("filter-type");

      if (filterType == "concerns") {
        // Updated from "category" to "concerns"
        let selectedConcerns =
          JSON.parse(localStorage.getItem("selectedConcerns")) || [];
        if (!selectedConcerns.includes(value)) {
          // Prevent duplicates
          selectedConcerns.push(value);
          localStorage.setItem(
            "selectedConcerns",
            JSON.stringify(selectedConcerns)
          );
          window.location.href = "/html/store.html";
        }
      } else if (filterType == "brand") {
        let selectedBrands =
          JSON.parse(localStorage.getItem("selectedBrands")) || [];
        if (!selectedBrands.includes(value)) {
          // Prevent duplicates
          selectedBrands.push(value);
          localStorage.setItem(
            "selectedBrands",
            JSON.stringify(selectedBrands)
          );
          window.location.href = "/html/store.html";
        }
      }
    });
  });
});
