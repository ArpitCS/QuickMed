// Firebase Imports
import { app, db, auth } from "./firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
  let products = [];

  const productsContainer = document.getElementById("productCards");
  const cartAmountElement = document.getElementById("cart-amount");

  window.fetchProducts = async function () {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      applyFilters(); // Apply filters after fetching products
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  fetchProducts();

  async function updateCartAmount() {
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

  function getSelectedFilters() {
    return {
      categories: JSON.parse(localStorage.getItem("selectedCategories")) || [],
      brands: JSON.parse(localStorage.getItem("selectedBrands")) || [],
      concerns: JSON.parse(localStorage.getItem("selectedConcerns")) || [],
    };
  }

  function setSelectedFilters(filters) {
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(filters.categories)
    );
    localStorage.setItem("selectedBrands", JSON.stringify(filters.brands));
    localStorage.setItem("selectedConcerns", JSON.stringify(filters.concerns));
  }

  function applyFilters() {
    const filters = getSelectedFilters();
    let filteredProducts = products;

    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.categories.some((category) =>
          product.categories.includes(category)
        )
      );
    }
    if (filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }
    if (filters.concerns.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.concerns.some((concern) => product.categories.includes(concern))
      );
    }

    loadProducts(filteredProducts);
    updateFilterCheckboxes();
  }

  function updateFilterCheckboxes() {
    const filters = getSelectedFilters();

    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      const filterType = checkbox.getAttribute("data-filter-type");
      const value = checkbox.value;

      if (filterType === "category") {
        checkbox.checked = filters.categories.includes(value);
      } else if (filterType === "brand") {
        checkbox.checked = filters.brands.includes(value);
      } else if (filterType === "concern") {
        checkbox.checked = filters.concerns.includes(value);
      }
    });
  }

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const filterType = this.getAttribute("data-filter-type");
      const value = this.value;
      const filters = getSelectedFilters();

      if (this.checked) {
        filters[filterType + "s"].push(value);
      } else {
        const index = filters[filterType + "s"].indexOf(value);
        if (index > -1) {
          filters[filterType + "s"].splice(index, 1);
        }
      }

      setSelectedFilters(filters);
      applyFilters();
    });
  });

  // Add to Cart function
  window.addToCart = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartAmount();
    alert(`${product.name} added to cart`);
  };

  // View Product function
  window.viewProduct = function (productId) {
    const bodyHeader = document.getElementById("body-header");
    const mainContainer = document.getElementById("main");

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    let informationContent = ""; // Declare the variable here

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
        <div class="col-md-3 buttons-container col-sm-12"> 
          <button class="product-cart" onclick="addToCart('${productId}')">Add to Cart</button>
          <a href="cart.html" class="view-cart"><span>View Cart ></span></a>
        </div>
      </div>
    `;

    if (product.drug_name) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const apiUrl = `https://api.fda.gov/drug/label.json?search=active_ingredient:${product.drug_name}&limit=1`;

      fetch(apiUrl, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          result = JSON.parse(result);
          if (result.results && result.results.length > 0) {
            const drug = result.results[0];
            const drugName = drug.openfda?.brand_name?.[0] || product.drug_name;
            const activeIngredient = drug.active_ingredient?.[0] || "N/A";
            const purpose = drug.purpose?.[0] || "N/A";
            const manufacturer = drug.openfda?.manufacturer_name?.[0] || "N/A";
            const description =
              drug.description?.[0] || "No description available";
            const warnings = drug.warnings?.[0] || "No warnings available";
            const dosage =
              drug.dosage_and_administration_table?.[0] ||
              "No dosage information available";
            const sideEffects =
              drug.adverse_reactions?.[0] || "No adverse reactions listed";

            informationContent = `
              <div class="drug-info-container">
                <div class="info-grid">
                  <div class="info-card">
                    <h2 class="info-heading">Active Ingredients</h2>
                    <p class="info-content">${activeIngredient}</p>
                  </div>
                  <div class="info-card">
                    <h2 class="info-heading">Purpose</h2>
                    <p class="info-content">${purpose}</p>
                  </div>
                  <div class="info-card">
                    <h2 class="info-heading">Dosage</h2>
                    <div class="dosage-table">${dosage}</div>
                  </div>
                  <div class="info-card">
                    <h2 class="info-heading">Side Effects</h2>
                    <p class="info-content">${sideEffects}</p>
                  </div>
                </div>
                <div class="warnings">
                  <h2 class="info-heading">Warnings</h2>
                  <p class="info-content">${warnings}</p>
                </div>
              </div>
            `;
          } else {
            informationContent = "<p>No information found for this drug.</p>";
          }

          // Update the DOM after fetching the drug information
          const productContainer = document.getElementById("product");
          if (productContainer) {
            productContainer.insertAdjacentHTML(
              "beforeend",
              informationContent
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching drug information:", error);
          informationContent = "<p>Error fetching drug information.</p>";

          // Update the DOM even if there's an error
          const productContainer = document.getElementById("product");
          if (productContainer) {
            productContainer.insertAdjacentHTML(
              "beforeend",
              informationContent
            );
          }
        });
    }

    bodyHeader.style.display = "none";
    mainContainer.innerHTML = productViewContent;
    window.location.href = "#product";
  };

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    const query = searchInput.value;
    searchInput.value = query;
    filterResults(query);
  });

  function getSearchQueryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("q") || "";
  }

  const initialSearchQuery = getSearchQueryFromURL();
  if (initialSearchQuery) {
    searchInput.value = initialSearchQuery;
    filterResults(initialSearchQuery);
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
      "Paracip",
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
          <input type="checkbox" id="category-${category}" value="${category}" data-filter-type="category" onchange="toggleCategory('${category}')">
          <label for="category-${category}">${category}</label>
        </li>
      `;
    });

    filters.brand.forEach((brand) => {
      brandHtml += `
        <li class="filter">
          <input type="checkbox" id="brand-${brand}" value="${brand}" data-filter-type="brand" onchange="toggleBrand('${brand}')">
          <label for="brand-${brand}">${brand}</label>
        </li>
      `;
    });

    filters.concern.forEach((concern) => {
      concernHtml += `
        <li class="filter">
          <input type="checkbox" id="concern-${concern}" value="${concern}" data-filter-type="concern" onchange="toggleConcern('${concern}')">
          <label for="concern-${concern}">${concern}</label>
        </li>
      `;
    });

    categoriesList.innerHTML = categoryHtml;
    brandsList.innerHTML = brandHtml;
    concernList.innerHTML = concernHtml;
  }

  loadFilters();

  let selectedCategories =
    JSON.parse(localStorage.getItem("selectedCategories")) || [];
  let selectedBrands = JSON.parse(localStorage.getItem("selectedBrands")) || [];
  let selectedConcerns =
    JSON.parse(localStorage.getItem("selectedConcerns")) || [];

  function initializeCheckboxes() {
    filters.category.forEach((category) => {
      const checkbox = document.querySelector(
        `input[type="checkbox"][value="${category}"]`
      );
      if (checkbox) checkbox.checked = selectedCategories.includes(category);
    });

    filters.brand.forEach((brand) => {
      const checkbox = document.querySelector(
        `input[type="checkbox"][value="${brand}"]`
      );
      if (checkbox) checkbox.checked = selectedBrands.includes(brand);
    });

    filters.concern.forEach((concern) => {
      const checkbox = document.querySelector(
        `input[type="checkbox"][value="${concern}"]`
      );
      if (checkbox) checkbox.checked = selectedConcerns.includes(concern);
    });

    if (
      selectedCategories.length > 0 ||
      selectedBrands.length > 0 ||
      selectedConcerns.length > 0
    ) {
      applyFilters();
    }
  }

  initializeCheckboxes();

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
    applyFilters();
  };

  window.toggleBrand = function (brand) {
    const index = selectedBrands.indexOf(brand);
    if (index > -1) {
      selectedBrands.splice(index, 1);
    } else {
      selectedBrands.push(brand);
    }
    localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
    applyFilters();
  };

  window.toggleConcern = function (concern) {
    const index = selectedConcerns.indexOf(concern);
    if (index > -1) {
      selectedConcerns.splice(index, 1);
    } else {
      selectedConcerns.push(concern);
    }
    localStorage.setItem("selectedConcerns", JSON.stringify(selectedConcerns));
    applyFilters();
  };

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

    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = false;
    });
    loadProducts(products);
  };

  loadProducts(products);
  updateCartAmount();
});
