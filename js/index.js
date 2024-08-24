document.addEventListener("DOMContentLoaded", function () {
    const cartAmountElement = document.getElementById("cart-amount");
  
    function updateCartAmount() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let totalAmount = cart.reduce((total, item) => total + item.price, 0);
      cartAmountElement.textContent = `${totalAmount}`;
    }
  
    const searchBar = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
  
    searchButton.addEventListener("click", function () {
      const query = searchBar.value;
      const currentUrl = window.location.href;
      window.location.href = currentUrl.includes("html")
        ? `/QuickMed/html/store.html?search=${query}`
        : `/QuickMed/store.html?search=${query}`;
    });
  
    updateCartAmount();
  
    const consultButton = document.getElementById("consultBtn");
    const consultModalElement = document.querySelector("#consultModalContainer .modal");
    const consultModal = new bootstrap.Modal(consultModalElement);
    
    consultButton.addEventListener("click", function () {
      consultModal.toggle();
    });

    const closeButton = document.getElementById('closeBtn');

    closeButton.addEventListener('click', function() {
        consultModal.toggle();
    });

  });