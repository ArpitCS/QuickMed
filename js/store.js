// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
  // Firebase Configuration
  const firebaseConfig = {
    apiKey: "",
    authDomain: "quick-med-1623.firebaseapp.com",
    projectId: "quick-med-1623",
    storageBucket: "quick-med-1623.appspot.com",
    messagingSenderId: "1096038222882",
    appId: "1:1096038222882:web:85243be5dd879a316ece7b",
    measurementId: "G-TVMY8WXV4R",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  let products = [];

  window.fetchProducts = async function () {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loadProducts(products); // Load products after fetching
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  fetchProducts();

  const productsContainer = document.getElementById("productCards");
  const cartAmountElement = document.getElementById("cart-amount");

  function updateCartAmount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    cartAmountElement.textContent = `${totalAmount}`;
  }

  function loadProducts(productsToLoad) {
    let htmlContent = "";
    productsToLoad.forEach((product) => {
      htmlContent += `
        <div class="product-card card">
          <div class="product-image" onclick="viewProduct('${product.id}')">
            <img loading="lazy" src="${product.image}">
          </div>
          <div class="product-body">
            <div class="product-info-left">
              <div class="product-categories">${product.categories.join(
                ", "
              )}</div>
              <div class="product-title" onclick="viewProduct('${
                product.id
              }')">${product.name}</div>
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
    });
    productsContainer.innerHTML = htmlContent;
  }

  function filterResults(query) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = "<p>No products found</p>";
    } else {
      loadProducts(filteredProducts);
    }
    updateCartAmount();
  }

  // Add to Cart function with fixed quantity initialization and duplicate handling
  window.addToCart = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Fetch cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      // If product exists, increment its quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If product is new, add it with a default quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart amount in the UI
    updateCartAmount();

    alert(`${product.name} added to cart`);
  };

  const mainContainer = document.getElementById("main");
  const bodyHeader = document.getElementById("body-header");

  window.viewProduct = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const productViewContent = `
      <div id="product" class="row">
        <span class="backbtn"><a href="store.html"><i class="fa-solid fa-backward"></i></a></span>
        <div class="col-md-4 col-sm-12">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="col-md-4 col-sm-12">
          <h2>${product.name}</h2>
          <a href="store.html">Visit QuickMED Store</a>
          <h3>Rs. ${product.price}</h3>
          <p class="taxinc">Inclusive of all Taxes</p>
          <h4>Description</h4>
          <p>${product.description}</p>
        </div>
        <div class="col-md-4 buttons-container col-sm-12"> 
          <button class="product-cart" onclick="addToCart('${productId}')">Add to Cart</button>
          <a href="cart.html" class="view-cart"><span>View Cart ></span></a>
        </div>
      </div>
    `;

    bodyHeader.style.display = "none";
    mainContainer.innerHTML = productViewContent;
  };

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    filterResults(query);
  });

  loadProducts(products);
  updateCartAmount();

  const expandBtn = document.getElementById("expand-btn");
  const expandIcon = document.getElementById("expand-icon");
  expandBtn.onclick = function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
    expandBtn.classList.toggle("expanded");
    expandIcon.classList.toggle("fa-down-long");
    expandIcon.classList.toggle("fa-up-long");
  };

  const categoriesList = document.getElementById("categories-list");
  const brandsList = document.getElementById("brands-list");
  const concernList = document.getElementById("concern-list");

  let filters = {
    category: ["Medicines", "Supplements", "Personal Care", "Health Devices"],
    brand: [
      "Eagle",
      "Dr. Morepen",
      "Dabur",
      "Liveasy",
      "Himalaya",
      "Moov",
      "Aivil",
      "AVP",
      "Micro Labs",
    ],
    concern: [
      "General Care",
      "Skin Care",
      "Diabetes",
      "Heart Care",
      "Joints Care",
      "Kidney Care",
      "Derma Care",
    ],
  };

  function loadFilters() {
    let categoryHtml = "";
    let brandHtml = "";
    let concernHtml = "";

    filters.category.forEach((category) => {
      categoryHtml += `
        <li class="filter">
          <input type="checkbox" id="category-${category}" value="${category}" onchange="toggleCategory('${category}')">
          <label for="category-${category}">${category}</label>
        </li>
      `;
    });

    filters.brand.forEach((brand) => {
      brandHtml += `
        <li class="filter">
          <input type="checkbox" id="brand-${brand}" value="${brand}" onchange="toggleBrand('${brand}')">
          <label for="brand-${brand}">${brand}</label>
        </li>
      `;
    });

    filters.concern.forEach((concern) => {
      concernHtml += `
        <li class="filter">
          <input type="checkbox" id="concern-${concern}" value="${concern}" onchange="toggleConcern('${concern}')">
          <label for="concern-${concern}">${concern}</label>
        </li>
      `;
    });

    categoriesList.innerHTML = categoryHtml;
    brandsList.innerHTML = brandHtml;
    concernList.innerHTML = concernHtml;
  }

  loadFilters();

  let selectedCategories = [];
  let selectedBrands = [];
  let selectedConcerns = [];

  localStorage.setItem(
    "selectedCategories",
    JSON.stringify(selectedCategories)
  );
  localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
  localStorage.setItem("selectedConcerns", JSON.stringify(selectedConcerns));

  window.toggleCategory = function (category) {
    const index = selectedCategories.indexOf(category);
    if (index > -1) {
      selectedCategories.splice(index, 1);
    } else {
      selectedCategories.push(category);
    }
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
    filterProducts();
  };

  window.toggleBrand = function (brand) {
    const index = selectedBrands.indexOf(brand);
    if (index > -1) {
      selectedBrands.splice(index, 1);
    } else {
      selectedBrands.push(brand);
    }
    localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
    filterProducts();
  };

  window.toggleConcern = function (concern) {
    const index = selectedConcerns.indexOf(concern);
    if (index > -1) {
      selectedConcerns.splice(index, 1);
    } else {
      selectedConcerns.push(concern);
    }
    localStorage.setItem("selectedConcerns", JSON.stringify(selectedConcerns));
    filterProducts();
  };

  function filterProducts() {
    let filteredProducts = products;
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.some((category) =>
          product.categories.includes(category)
        )
      );
    }
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }
    if (selectedConcerns.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedConcerns.some((category) =>
          product.categories.includes(category)
        )
      );
    }
    loadProducts(filteredProducts);
  }

  const clearFilterBtn = document.getElementById("clear-filters");
  clearFilterBtn.onclick = function () {
    selectedCategories = [];
    selectedBrands = [];
    selectedConcerns = [];
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
    localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
    localStorage.setItem("selectedConcerns", JSON.stringify(selectedConcerns));

    // Unclick all checkboxes
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    loadProducts(products);
  }; 
});
