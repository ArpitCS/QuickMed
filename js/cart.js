document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cartItems");
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
      cartItemElement.className = "cartCard row";
      cartItemElement.innerHTML = `
                    <div class="cardTitle col-md-3 justify-content-start">
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.name}</span>
                    </div>
                    <span class="col-md-3 cardPrice">Rs. ${item.price}</span>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            `;
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price;
    });

    totalPriceElement.textContent = `Total: Rs.${total}`;
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
