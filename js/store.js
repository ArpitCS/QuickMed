document.addEventListener("DOMContentLoaded", function () {
  let products = [
    {
      id: 1,
      name: "Product Eagle 1006a Weighing Scale",
      brand: "Eagle",
      price: 1000,
      description:
        "Eagle 1006a Weighing Scale is a digital weighing scale that is used to measure the weight of a person. It is a very useful device for people who are trying to lose weight or maintain their current weight. The scale is easy to use and provides accurate results.",
      categories: ["Equipment", "Weighing Scale", "General"],
      image: "../images/eaglescale.webp",
    },
    {
      id: 2,
      name: "Dr. Morepen Bp-02 Blood Pressure Monitor",
      brand: "Morepen",
      price: 1200,
      description:
        "A Bp Monitor is a medical device used for monitoring blood pressure. It can be easily used at home and gives precise results. This device detects accurate systolic and diastolic pressure for individuals as well as their heart rate frequencies.",
      categories: ["Equipment", "Heart Care"],
      image: "..//images/morepenbp.webp",
    },
    {
      id: 3,
      name: "Dolo Paracetamol 650mg Strip Of 15 Tablets",
      brand: "Micro Labs",
      price: 30,
      description:
        "Dolo 650 tablet is used to treat pain, fever, headaches, toothaches, migraines, body aches, and fever. It contains paracetamol, which inhibits the formation of certain chemicals that cause pain and fever in the body. Side effects of Dolo 650 are rare.",
      categories: ["General", "Paracetamol"],
      image: "../images/dolo650.png",
    },
    {
      id: 4,
      name: "Liveasy Wellness Ors Oral Rehydration Salts-20.5g Sachet -Orange Flavour",
      brand: "Liveasy",
      price: 20,
      description:
        "Oral Rehydration Salt is made with several essential electrolytes like Sodium Chloride, Potassium Chloride and Sodium Citrate. It helps restore our body fluids and electrolytes lost due to dehydration. It is a must-have in every household.",
      categories: ["General", "Glucose"],
      image: "../images/ors.webp",
    },
    {
      id: 5,
      name: "Himalaya Herbals Purifying Neem Face Wash",
      brand: "Himalaya",
      price: 250,
      description:
        "Himalaya Herbals Purifying Neem Face Wash is a soap-free, herbal formulation that cleans impurities and helps clear pimples. Neem and turmeric have antibacterial and antifungal properties that help prevent acne recurrence over time. This paraben and soap-free face care product is suitable for all skin types.",
      categories: ["Derma Care", "Face Wash"],
      image: "../images/himalaya1.jpg",
    },
    {
      id: 6,
      name: "Moov Pain Relief Ointment for Back Pain, Joint Pain, Knee Pain, Muscle Pain",
      brand: "Moov",
      price: 200,
      description:
        "Moov presents their range of 100% ayurvedic pain relief creams which provide instant relief to the affected area when applied. Made with a soothing blend of Turpentine Oil, Nilgiri Oil, Wintergreen Oil and Mint Extract into the skin.",
      categories: ["Bones & Joints", "Pain Relief"],
      image: "../images/moov.jpg",
    },
    {
      id: 7,
      name: "Aimil Amlycure DS Syrup",
      brand: "Aimil",
      price: 280,
      description:
        "Aimil Amlycure DS Syrup / Stomach Care is an Ayurvedic proprietary formulation comprising poly-herbal constituents that can help protect the liver from diseases and disorders due to various causes. It contains several potent herbs like kalmegh, kutaki, giloe, tulsi, sharpunkha, etc.",
      categories: ["Stomach Care"],
      image: "../images/aimilds.jpg",
    },
    {
      id: 8,
      name: "Dabur Hepano Tablet",
      brand: "Dabur",
      price: 140,
      description:
        "Dabur Hepano Tablet / For Liver Care & Detoxification is an ayurvedic formulation that can help protect liver tissues and prevent toxicity. It is beneficial for abnormal liver functions, which leads to fatty liver and other conditions. It protects the liver from various hepatotoxins such as heavy metals etc.",
      categories: ["Liver Care", "Detoxification"],
      image: "../images/daburhepano.jpg",
    },
    {
      id: 9,
      name: "AVP Narayana Thailam Balm",
      brand: "AVP",
      price: 340,
      description:
        "The Arya Vaidya Pharmacy (Coimbatore) Ltd Narayana Thailam Balm is a new-age Ayurveda product, which is an effective pain relief balm for knee, neck, back and shoulder pain and stiffness. This is a new-age ayurvedic product of the traditional narayana thailam in a portable, spill-free balm format.",
      categories: ["Bones & Joints", "Pain Relief"],
      image: "../images/avpbalm.webp",
    },
    {
      id: 10,
      name: "Dr Morepen ST01A Deluxe Stethoscope",
      brand: "Morepen",
      price: 250,
      description:
        "Dr Morepen ST01A Deluxe Stethoscope is an acoustic medical device for auscultation, or listening to the internal sounds or heart beats of human body. It is used by medical professionals to listen to the sounds produced by the heart, lungs, and intestines.",
      categories: ["Equipment", "Stethoscope"],
      image: "../images/morepenstethoscope.jpg",
    },
  ];

  const productsContainer = document.getElementById("productCards");

  const cartAmountElement = document.getElementById("cart-amount");
  function updateCartAmount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((total, item) => total + item.price, 0);
    cartAmountElement.textContent = `${totalAmount}`;
  }

  function loadProducts(productsToLoad) {
    let htmlContent = "";
    let htmlContentA = "";
    productsToLoad.forEach((product) => {
      let shortDesc = getWords(product.description, 15);
      htmlContent += `
        <div class="product-card card">
                    <div class="product-image" onclick="viewProduct(${product.id})">
                        <img src="${product.image}">
                    </div>
                    <div class="product-body">
                        <div class="product-info-left">
                            <div class="product-categories">${product.categories.join(", ")}</div>
                            <div class="product-title" onclick="viewProduct(${product.id})">${product.name}</div>
                            <div class="product-brand">by ${product.brand}</div>
                        </div>
                        <div class="product-info-right">
                            <div class="product-rating">
                                <i class="fa fa-star"></i>
                                (4.5)
                            </div>
                            <div class="product-price">₹${product.price}</div>
                        </div>
                    </div>
                    <div class="product-footer">
                        <button class="btn" onclick="addToCart(${product.id})">+ Add to Cart</button>
                    </div>
                </div>
      `;

      htmlContentA += `
              <div class="card">
                <img src="${product.image}" alt="Placeholder" class="card-img">
                <div class="card-content">
                    <div class="card-category">${product.categories.join(", ")}</div>              
                    <div class="card-title">${product.name}</div>
                    <div class="brand">by ${product.brand}</div>
                    <p class="card-description" onclick="viewProduct(${product.id})">
                        ${shortDesc}...
                    </p>
                    <div class="card-price">Rs. ${product.price}</div>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})"> + Add to Cart</button>
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
    const product  = products.find((p) => p.id === productId);
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

                <h4>Description</h4 >
                <p>${product.description}</p>
            </div>
            <div class="col-md-4 buttons-container col-sm-12"> 
                <button class="product-cart" onclick="addToCart(${productId})">Add to Cart</button>
                <a href="cart.html" class="view-cart"><span>View Cart ></span></a>
            </div>
        </div>
    `;

    bodyHeader.style.display = "none";
    mainContainer.innerHTML = productViewContent;
  }


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
    return selectedWords.join(' ');
  }
});

