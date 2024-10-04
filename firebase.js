// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

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

// Function to add a product
window.addProduct = async function () {
  const name = document.getElementById("productName").value;
  const categories = document
    .getElementById("productCategories")
    .value.split(",")
    .map((cat) => cat.trim());
  const brand = document.getElementById("productBrand").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const description = document.getElementById("productDescription").value;
  const rating = parseFloat(document.getElementById("productRating").value);
  const image = document.getElementById("productImage").value;

  try {
    await addDoc(collection(db, "Products"), {
      name,
      categories,
      brand,
      price,
      description,
      rating,
      image,
    });
    console.log("Product added!");
    clearFields();
    fetchProducts();
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

// Function to clear input fields
function clearFields() {
  document.getElementById("productName").value = "";
  document.getElementById("productCategories").value = "";
  document.getElementById("productBrand").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productRating").value = "";
  document.getElementById("productImage").value = "";
}

// Function to fetch products
window.fetchProducts = async function () {
  const productDisplayArea = document.getElementById("product-display");
  productDisplayArea.innerHTML = ""; // Clear previous products

  try {
    const querySnapshot = await getDocs(collection(db, "Products"));
    querySnapshot.forEach((doc) => {
      const productData = doc.data();
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      // Create and append elements
      const productName = document.createElement("h3");
      productName.textContent = productData.name;

      const productImg = document.createElement("img");
      productImg.src = productData.image;
      productImg.alt = productData.name;

      const productInfo = document.createElement("p");
      productInfo.textContent = `Brand: ${productData.brand}, Price: $${productData.price}, Rating: ${productData.rating}`;

      productDiv.appendChild(productName);
      productDiv.appendChild(productImg);
      productDiv.appendChild(productInfo);
      productDisplayArea.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
};

// Fetch products on page load
window.onload = fetchProducts;
