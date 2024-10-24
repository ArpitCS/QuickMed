document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("totalPrice");
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const taxElement = document.getElementById("tax");
  const discountElement = document.getElementById("discount");
  const cartAmountElement = document.getElementById("cart-amount");
  
  // Set static values for shipping, tax, and discount
  const shippingAmount = 500;
  const taxRate = 0.18; // 18%
  const discountRate = 0.05; // 5%

  async function updateCartAmount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    cartAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
  }

  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart(cart);
  }

  function updateCart(cart) {
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item col-12";
      cartItemElement.innerHTML = `
        <div class="cart-remove">
          <button onclick="removeFromCart('${item.id}')" class="remove-btn">
            <i class="fa-solid fa-close"></i>
          </button>
        </div>
        <div class="cart-title">
          <img src="${item.image || '../assets/testsIcon.png'}" alt="${item.name}" />
          <div>
            <p>${item.name}</p>
          </div>
        </div>
        <div class="cart-price">
          <p class="tag">Price: </p>
          <p>₹${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-quantity">
          <p class="tag">Quantity: </p>
          <div>
            <button onclick="decrementQty('${item.id}')" class="btn">-</button>
            <p>${item.quantity}</p>
            <button onclick="incrementQty('${item.id}')" class="btn">+</button>
          </div>
        </div>
        <div class="cart-net-price">
          <p class="tag">Net Price: </p>
          <p>₹${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      subtotal += item.price * item.quantity; // Calculate subtotal
    });

    // Calculate totals
    const taxAmount = subtotal * taxRate;
    const discountAmount = subtotal * discountRate;
    const total = subtotal + shippingAmount + taxAmount - discountAmount;

    // Update total display elements
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    shippingElement.textContent = `₹${shippingAmount}`;
    taxElement.textContent = `₹${taxAmount.toFixed(2)}`;
    discountElement.textContent = `₹${discountAmount.toFixed(2)}`;
    totalPriceElement.textContent = `₹${total.toFixed(2)}`;
  }

  window.incrementQty = function (productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find((p) => p.id === productId);
    if (product) {
      product.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart(cart);
      updateCartAmount();
    }
  };

  window.decrementQty = function (productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find((p) => p.id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart(cart);
      updateCartAmount();
    } else if (product && product.quantity === 1) {
      removeFromCart(productId);
    }
  };

  window.removeFromCart = function (productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((p) => p.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(cart);
    updateCartAmount();
    alert("Item removed from cart");
  };

  const clearButton = document.getElementById("clearBtn");
  clearButton.addEventListener("click", function () {
    localStorage.removeItem("cart");
    updateCart([]);
    updateCartAmount();
  });

  loadCart();
  updateCartAmount();
});
