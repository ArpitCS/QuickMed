document.addEventListener("DOMContentLoaded", function () {
  const cartAmountElement = document.getElementById("cart-amount");

  async function updateCartAmount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    cartAmountElement.textContent = `${totalAmount}`;
  }

  updateCartAmount();

  const consultButton = document.getElementById("consultBtn");
  const consultModalElement = document.querySelector(
    "#consultModalContainer .modal"
  );
  const consultModal = new bootstrap.Modal(consultModalElement);

  consultButton.addEventListener("click", function () {
    consultModal.toggle();
  });

  const closeButton = document.getElementById("closeBtn");

  closeButton.addEventListener("click", function () {
    consultModal.hide();
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  });

  const searchValue = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchButton");

  searchBtn.addEventListener("click", function () {
    const query = searchValue.value;
    window.location.href = `html/store.html?q=${query}`;
  });
});
