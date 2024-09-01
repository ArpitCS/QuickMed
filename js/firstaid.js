document.addEventListener('DOMContentLoaded', function () {
    let procedure = [
        {
            id: 1,
            title: "Burns",
            steps: [
                "Cool the burn under cold running water for at least 10 minutes.",
                "If the burn is severe, seek medical help.",
                "Remove any clothing or jewellery near the burn.",
                "Cover the burn with a sterile dressing.",
                "Do not apply creams, lotions or ointments.",
                "Do not break any blisters.",
                "Do not touch the burn.",
                "Do not remove anything sticking to the burn.",
            ],
            img: "../images/burns.jpg"
        },
        {
            id: 2,
            title: "Choking",
            steps: [
                "Encourage the person to cough.",
                "If the person is unable to cough, speak or breathe, give up to 5 back blows.",
                "If back blows do not dislodge the object, give up to 5 abdominal thrusts.",
                "If the person is still choking, call 108 for Ambulance.",
            ],
            img: "../images/choking.jpg"
        },
        {
            id: 3,
            title: "CPR",
            steps: [
                "Check for response.",
                "Call 108 for Ambulance.",
                "Give 30 chest compressions.",
                "Give 2 rescue breaths.",
                "Continue with cycles of 30 chest compressions and 2 rescue breaths until emergency help arrives.",
            ],
            img: "../images/cpr.jpg"
        },
        {
            id: 4,
            title: "Seizures",
            steps: [
                "Protect the person from injury.",
                "Cushion their head.",
                "Loosen any tight clothing around their neck.",
                "Do not hold them down.",
                "Do not put anything in their mouth.",
                "After the seizure, help the person to rest on their side.",
                "Stay with the person until they are fully recovered.",
            ],
            img: "../images/seizures.jpg"
        },
        {
            id: 5,
            title: "Stroke",
            steps: [
                "Check for signs of a stroke.",
                "Call 108 for Ambulance.",
                "Help the person to sit down and keep them calm.",
                "If the person is conscious, reassure them.",
                "Do not give them anything to eat or drink.",
                "Note the time when the symptoms started.",
            ],
            img: "../images/stroke.jpg"
        },
        {
            id: 6,
            title: "Heart Attack",
            steps: [
                "Call 108 for Ambulance.",
                "Help the person to sit down and keep them calm.",
                "If the person is conscious, reassure them.",
                "If the person is not allergic to aspirin, give them one tablet to chew slowly.",
                "If the person is not allergic to GTN spray, help them to use it.",
                "If the person is not allergic to GTN tablets, help them to take one.",
            ],
            img: "../images/heartattack.jpg"
        },
        {
            id: 7,
            title: "Bleeding",
            steps: [
                "Put pressure on the wound with whatever is available to stop or slow down the flow of blood.",
                "If the bleeding is severe, call 108 for Ambulance.",
                "Keep pressure on the wound until help arrives.",
                "If the bleeding is severe, raise the injured limb above the level of the heart.",
            ],
            img: "../images/bleeding.jpg"
        },
        {
            id: 8,
            title: "Head Injury",
            steps: [
                "Check for signs of a serious head injury.",
                "Call 108 for Ambulance.",
                "Help the person to sit down and keep them calm.",
                "If the person is conscious, reassure them.",
                "Do not give them anything to eat or drink.",
            ],
            img: "../images/headinjury.jpg"
        }
    ]

    let firstaid = document.getElementById('firstaidcards');

    function displayProcedures() {
        let output = '';
        procedure.forEach((item) => {
            output += `
            <div class="card">
                <img src="${item.img}" alt="${item.title}" class="card-img">
                <div class="card-title">${item.title}</div>
                <div class="procedure hidden">
                    <div class="card-header">Procedure</div>
                    <div class="card-steps">
                        <ul>`;  
                        item.steps.forEach((step) => {
                            output += `<li>${step}</li>`;
                        });
                output += `
                        </ul>
                    </div>
                </div>
            </div>
            `;
        });
        firstaid.innerHTML = output;
    }

    displayProcedures();

    firstaid.addEventListener('click', function (e) {
        let card = e.target.closest('.card');
        if (card) {
            let procedure = card.querySelector('.procedure');
            procedure.classList.toggle('hidden');

        }
    });
});