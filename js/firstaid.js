document.addEventListener('DOMContentLoaded', function () {

    async function updateCartAmount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        cartAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
    }

    updateCartAmount();

    let procedures = [
        {
            id: 1,
            title: "Minor Burns",
            thumbnail: "../images/burns.jpg",
            steps: [
                {
                    step: "Cool the burn under cold running water for at least 10 minutes",
                    img: "../images/first-aid/burns/burns-1.png"
                },
                {
                    step: "Remove any clothing or jewellery near the burn",
                    img: "../images/first-aid/burns/burns-2.png"
                },
                {
                    step: "Apply the compress for 10 minutes, wait for 30 minutes, and then reapply.",
                    img: "../images/first-aid/burns/burns-3.png"
                },
                {
                    step: "Take an over the counter pain reliever.",
                    img: "../images/first-aid/burns/burns-4.png"
                },
                {
                    step: "Clean the burn, do not pop blisters.",
                    img: "../images/first-aid/burns/burns-5.png"
                },
                {
                    step: "Lightly cover the burn with ointment and then, gauze.",
                    img: "../images/first-aid/burns/burns-6.png"
                }
            ]
        },
        {
            id: 2,
            title: "Heart Attack",
            thumbnail: "../images/heartattack.jpg",
            steps: [
                {
                    step: "Assess the signs of heart attack.",
                    img: "../images/first-aid/heart-attack/heart-attack-1.png"
                },
                {
                    step: "Call 108 to contact an ambulance for professional treatment.",
                    img: "../images/first-aid/heart-attack/heart-attack-2.png"
                },
                {
                    step: "Assure the person and give them a ASPIRIN (if non-allergic).",
                    img: "../images/first-aid/heart-attack/heart-attack-3.png"
                }
            ]
        },
        {
            id: 3,
            title: "Stroke",
            thumbnail: "../images/stroke.jpg",
            steps: [
                {
                    step: "Assess the signs of stroke, Ask the Person to Smile.",
                    img: "../images/first-aid/stroke/stroke-1.png"
                },
                {
                    step: "Ask the person to raise both arms.",
                    img: "../images/first-aid/stroke/stroke-2.png"
                },
                {
                    step: "Ask the person a simple question, like their name or their age.",
                    img: "../images/first-aid/stroke/stroke-3.png"
                },
                {
                    step: "If there are any anamolies in the behaviour tests, call an ambulance",
                    img: "../images/first-aid/stroke/stroke-4.png"
                }

            ]
        }
    ];

    const firstaidcards = document.getElementById('firstaidcards');
    const procedureModal = new bootstrap.Modal(document.getElementById('procedureModal'));
    const carousel = document.getElementById('procedureCarousel');

    // Create cards for each procedure
    procedures.forEach(procedure => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100 first-aid-card" data-procedure-id="${procedure.id}">
                <img src="${procedure.thumbnail}" class="card-img-top" alt="${procedure.title}">
                <div class="card-body">
                    <h5 class="card-title">${procedure.title}</h5>
                </div>
            </div>
        `;

        card.querySelector('.card-img-top').onerror = function () {
            this.src = '/api/placeholder/400/200';
        };

        card.addEventListener('click', () => showProcedure(procedure));
        firstaidcards.appendChild(card);
    });

    // Function to show procedure steps in modal
    function showProcedure(procedure) {
        document.getElementById('procedureModalLabel').textContent = procedure.title;

        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = '';

        procedure.steps.forEach((step, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            slideDiv.innerHTML = `
                <img src="${step.img}" class="step-image" alt="Step ${index + 1}">
            `;

            slideDiv.querySelector('.step-image').onerror = function () {
                this.src = '/api/placeholder/800/400';
            };

            carouselInner.appendChild(slideDiv);
        });

        // Update step description when slide changes
        carousel.addEventListener('slide.bs.carousel', (event) => {
            updateStepDescription(procedure.steps[event.to]);
        });

        // Initial step description
        updateStepDescription(procedure.steps[0]);

        procedureModal.show();
    }

    // Function to update step description
    function updateStepDescription(step) {
        const stepNumber = Array.from(document.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active')) + 1;
        document.getElementById('stepDescription').innerHTML = `
            <span class="step-counter">Step ${stepNumber}:</span>${step.step}
        `;
    }
});