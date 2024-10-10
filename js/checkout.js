document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("totalPrice");
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const taxElement = document.getElementById("tax");
  const discountElement = document.getElementById("discount");
  const cartAmountElement = document.getElementById("cart-amount");
  const cartContainer = document.getElementById("cart-items");
  const payAmount = document.getElementById("pay-amount");

  cartContainer.classList.add("hide");

  // Set static values for shipping, tax, and discount
  let shippingAmount = 500;
  const taxRate = 0.18; // 18%
  const discountRate = 0.05; // 5%
  let totalAmount = 0;

  function updateCartAmount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    cartAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
  }

  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  }

  function loadCartSummary() {
    subtotalElement.innerHTML = `₹${totalAmount.toFixed(2)}`;
    shippingElement.innerHTML = `₹${shippingAmount}`;
    taxElement.innerHTML = `₹${(totalAmount * taxRate).toFixed(2)}`;
    discountElement.innerHTML = `₹${(totalAmount * discountRate).toFixed(2)}`;
    totalPriceElement.innerHTML = `₹${(
      totalAmount +
      shippingAmount +
      totalAmount * taxRate -
      totalAmount * discountRate
    ).toFixed(2)}`;
  }

  function totalAmountF() {
    return (
      (totalAmount +
      shippingAmount +
      totalAmount * taxRate -
      totalAmount * discountRate).toFixed(2)
    );
  }

  async function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = `${cart.length} Items in Cart`;

    cart.forEach((item) => {
      let cartItemElement = `
              <div class="cart-item">
                <div class="left">
                  <img src="${item.image}" alt="" />
                </div>
                <div class="right">
                  <div class="top">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                  </div>
                  <div class="bottom">Qty: ${item.quantity}</div>
                </div>
              </div>
            `;

      cartItemsContainer.innerHTML += cartItemElement;
    });
  }

  const cartExpandBtn = document.getElementById("cart-expand-btn");
  cartExpandBtn.addEventListener("click", function () {
    cartContainer.classList.toggle("hide");
  });

  const checkoutBtn = document.getElementById("checkout-btn");
  let checkoutData = {};

  checkoutBtn.addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const country = document.getElementById("country").value;
    const phone = document.getElementById("phone-no").value;

    // Get selected shipping method
    const shippingMethod = document.querySelector(
      'input[name="shipping"]:checked'
    );
    const selectedShipping = shippingMethod ? shippingMethod.id : null;

    // Get selected payment method
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    );
    const selectedPayment = paymentMethod ? paymentMethod.id : null;

    // Create an object to store the checkout data
    checkoutData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: state,
      zip: zip,
      country: country,
      phone: phone,
      shippingMethod: selectedShipping,
      paymentMethod: selectedPayment,
    };

    console.log(checkoutData);
    if (!paymentMethod || !shippingMethod) {
      alert("Please select a payment and shipping method");
      return;
    }

    // Proceed based on selected payment method
    if (selectedPayment === "payment-card") {
      renderPaymentPortal(); // Redirect to payment portal
    } else {
      renderSuccessfulOrder(); // Complete order
    }
  });

  function renderPaymentPortal() {
    const paymentPortal = document.getElementById("payment-portal");
    const shippingContainer = document.getElementById("shipping-container");


    const header = document.getElementById("header-element");
    const newsletter = document.getElementById("newsletter");
    const footer = document.getElementById("footer-element");

    payAmount.textContent = `₹ ${totalAmountF()}`;

    header.classList.add("hide");
    newsletter.classList.add("hide");
    footer.classList.add("hide");
    shippingContainer.classList.add("hide");

    paymentPortal.classList.remove("hide");

    // shippingContainer.classList.add("hide");
  }

  function renderSuccessfulOrder() {
    const orderSuccess = document.getElementById("order-success");
    const shippingContainer = document.getElementById("shipping-container");

    console.log("Success!");
  }

  const shippingMethods = document.querySelectorAll('input[name="shipping"]');
  shippingMethods.forEach((method) => {
    method.addEventListener("change", function () {
      if (method.id === "shipping-express") {
        shippingAmount = 600; // Express shipping cost
      } else {
        shippingAmount = 500; // Standard shipping cost
      }
      loadCartSummary(); // Update cart summary when shipping method is changed
    });
  });

  const paymentMethods = document.querySelectorAll('input[name="pay-method"]');
  const paymentDetailsContainer = document.getElementById("payment-details");
  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      if (method.id === "pay-by-card") {
        paymentDetailsContainer.innerHTML = `
          <form id="card-payment">
            <div class="form-group">
              <label for="card-number">Card Number</label>
              <input
                type="text"
                class="form-control"
                id="card-number"
                placeholder="Enter Card Number"
              />
            </div>  
            <div class="form-group">
              <label for="card-name">Name on Card</label>
              <input
                type="text"
                class="form-control"
                id="card-name"
                placeholder="Enter Name on Card"
              />
            </div>
            <div class="form-group">
              <label for="expiry-date">Expiry Date</label>
              <input
                type="text"
                class="form-control"
                id="expiry-date"
                placeholder="Enter Expiry Date"
              />
            </div>
            <div class="form-group">
              <label for="cvv">CVV</label>
              <input
                type="text"
                class="form-control"
                id="cvv"
                placeholder="Enter CVV"
              />
            </div>
            <button type="submit" class="btn btn-primary">Pay</button>
          </form>
        `;
      } else {
        paymentDetailsContainer.innerHTML = `
          <div id="upi-details">
            <h2>QuickMed</h2>
            <p>quickmed@upi</p>
            <img src="../assets/QRCode.png" alt="quickmed@upi" width="150">
            <p>Amount: ₹ 4000</p>

            <p>Scan the QR using any UPI app on your phone</p>
          </div>
        `;
      }
    });
  });

  loadCart();
  updateCartAmount();
  loadCartSummary();
  loadCartItems();
});
