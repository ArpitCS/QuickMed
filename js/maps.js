let map, infoWindow;
let hospitals = [];
let currentLocationMarker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 }, // Default center
        zoom: 15,
        // Enable current location button
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    });
    infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation to get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
                addCurrentLocationMarker(pos);
                findNearbyHospitals(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // Create a button to center the map on the user's location
    const locationButton = document.createElement("button");
    locationButton.textContent = "Reset to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
                map.setZoom(15); // Set zoom level for better visibility
                if (currentLocationMarker) {
                    currentLocationMarker.setMap(null); // Remove previous marker
                }
                addCurrentLocationMarker(pos); // Add marker at current location
            });
        }
    });
}

function addCurrentLocationMarker(location) {
    currentLocationMarker = new google.maps.Marker({
        position: location,
        map,
        title: "Your Location",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#4285F4",
            fillOpacity: 0.8,
            strokeColor: "#ffffff",
            strokeWeight: 2
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function findNearbyHospitals(location) {
    const request = {
        location: location,
        radius: '5000', // 5 km radius
        type: ['hospital'],
    };
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            hospitals = results;
            displayHospitals(results);
            results.forEach((place) => {
                addMarker(place);
            });
        } else {
            document.getElementById("hospital-list").innerHTML = "No hospitals found nearby.";
        }
    });
}

function displayHospitals(hospitals) {
    const hospitalList = document.getElementById("hospital-list");
    hospitalList.innerHTML = ""; // Clear existing list

    hospitals.forEach((hospital) => {
        const hospitalElement = document.createElement("div");
        hospitalElement.classList.add("hospital");
        hospitalElement.innerHTML = `<strong>${hospital.name}</strong><br>${hospital.vicinity}`;
        hospitalElement.addEventListener("click", () => {
            showHospitalDetails(hospital);
        });
        hospitalList.appendChild(hospitalElement);
    });
}

function addMarker(place) {
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name,
    });

    google.maps.event.addListener(marker, 'click', () => {
        showHospitalDetails(place);
    });
}

function showHospitalDetails(hospital) {
    const content = `
                <h3>${hospital.name}</h3>
                <p>${hospital.vicinity}</p>
                <div class="details">
                    <p><strong>Rating:</strong> ${hospital.rating || 'N/A'}</p>
                    <p><strong>Total Ratings:</strong> ${hospital.user_ratings_total || 'N/A'}</p>
                </div>
            `;
    infoWindow.setContent(content);
    infoWindow.open(map, new google.maps.Marker({ position: hospital.geometry.location, map }));
    map.setCenter(hospital.geometry.location);
    map.setZoom(17);
}