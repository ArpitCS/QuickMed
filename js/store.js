import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDrnWyO4P2SqgDa2jenxq1FxiRf0KIvrbs",
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
      console.log("Products: ", products);
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
    let totalAmount = cart.reduce((total, item) => total + item.price, 0);
    cartAmountElement.textContent = `${totalAmount}`;
  }

  function loadProducts(productsToLoad) {
    let htmlContent = "";
    productsToLoad.forEach((product) => {
      let shortDesc = getWords(product.description, 15);
      htmlContent += `
        <div class="product-card card">
          <div class="product-image" onclick="viewProduct('${product.id}')">
            <img src="${product.image}">
          </div>
          <div class="product-body">
            <div class="product-info-left">
              <div class="product-categories">${product.categories.join(", ")}</div>
              <div class="product-title" onclick="viewProduct('${product.id}')">${product.name}</div>
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

  window.addToCart = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} added to cart`);
    updateCartAmount();
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

  function getWords(str, numWords) {
    const words = str.split(/\s+/);
    const selectedWords = words.slice(0, numWords);
    return selectedWords.join(" ");
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
});
