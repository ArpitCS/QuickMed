document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("totalPrice");
  //   const cartAmountElement = document.getElementById("cart-amount");

  const productsContainer = document.getElementById("productCards");

  const cartAmountElement = document.getElementById("cart-amount");
  function updateCartAmount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((total, item) => total + item.price, 0);
    cartAmountElement.textContent = `${totalAmount}`;
  }

  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart(cart);
  }

  window.addToCart = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartAmount();
  };

  function updateCart(cart) {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      if (item.image === undefined) {
        item.image = "../assets/testsIcon.png";
      }
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item col-12";
      cartItemElement.innerHTML = `
              <div class="cart-remove">
                <button onclick="removeFromCart(${item.id})" class="remove-btn">
                  <i class="fa-solid fa-close"></i>
                </button>
              </div>
              <div class="cart-title">
                <img src="${item.image}" alt="${item.name}" />
                <div>
                    <p>${item.name}</p>
                </div>
              </div>
              <div class="cart-price">
                <p class="tag">Price: </p>
                <p>Rs.100</p>
              </div>
              <div class="cart-quantity">
                <p class="tag">Quantity: </p>
                <div>
                  <button onclick="decrementQty(1)" class="btn">-</button>
                  <p>1</p>
                  <button onclick="incrementQty(1)" class="btn">+</button>
                </div>
              </div>
              <div class="cart-net-price">
                <p class="tag">Net Price: </p>
                <p>Rs.100</p>
              </div>
            `;
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price;
    });

    totalPriceElement.textContent = `Rs.${total}`;
  }

  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((p) => p.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(cart);

    alert("Item removed from cart");
    updateCartAmount();
  }

  const clearButton = document.getElementById("clearBtn");
  clearButton.addEventListener("click", clearCart);

  function clearCart() {
    localStorage.removeItem("cart");
    updateCart([]);
    updateCartAmount();
  }

  window.removeFromCart = removeFromCart;

  loadCart();
  updateCartAmount();
});
