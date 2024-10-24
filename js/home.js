// Firebase Imports
import { app, db, auth } from "./firebase.js";// Suggested code may be subject to a license. Learn more: ~LicenseLog:2683724769.
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
                <img src="${product.image}" />
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
                <button class="btn" onclick="addToCart('${product.id}')">+ Add to Cart</button>
              </div>
            </div>
            `;

            if (product.popular) {
                popularCardsContainer.innerHTML += cardTemplate;
            }

        })

    }
});