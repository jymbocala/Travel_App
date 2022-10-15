import { pixabayApi, pixabayImg, weatherbitApiWithin16Days, weatherbitApiOver16Days, weatherIcon, weatherbitData, geoNamesApi, countdown, daysLeft, country } from "./apis";

let tripsData = [];

// RENDER ALL TRIP DATA TO PAGE
function renderTrips() {
    let html
    for (let trip of tripsData) {
        if (trip.daysLeft < 16) {
            html += `
            <div class="card" id="${trip.city}-trip">
                <img src="${trip.imgURL}" class="card-img" alt="${trip.city}, ${trip.country} ">
                <div class="card-img-overlay">
                    <h3 class="card-title mt-4">${trip.city}, ${trip.country}</h3>
                    <h4 class="card-title mt-3">${trip.date}</h4>
                    <p class="card-text">Weather for then is:
                        <br>High: ${trip.weather.max_temp}°C
                        <br>Low: ${trip.weather.min_temp}°C
                    </p>
                    <img src="https://www.weatherbit.io/static/img/icons/${weatherIcon}.png" /> 
                    <p>${trip.weather.weather.description}</p>.
                    <p class="card-text" id="countdown">${trip.city} is ${trip.countdown} days away!</p>
                    <button class="btn btn-danger delete-btn">Delete</button>
                </div>
            </div>
            `
        } else {
        html += `
            <div class="card" id="${trip.city}-trip">
                <img src="${trip.imgURL}" class="card-img" alt="${trip.city}, ${trip.country} ">
                <div class="card-img-overlay">
                    <h3 class="card-title mt-4">${trip.city}, ${trip.country}</h3>
                    <h4 class="card-title mt-3">${trip.date}</h4>
                    <p class="card-text">Typical weather for then is:
                        <br>High: ${trip.weather.max_temp}°C
                        <br>Low: ${trip.weather.min_temp}°C
                        <br>Weather conditions are described as: <span></span.
                    </p>
                    <p class="card-text" id="countdown">${trip.city} is ${trip.countdown} days away!</p>
                    <button class="btn btn-danger delete-btn">Delete</button>
                </div>
            </div>
            `
        }

    if (html) {
        document.getElementById("trip-cards").innerHTML = html;
    }

    for (let trip of tripsData) {
        const deleteBtnEl = document.querySelector(`#${trip.city}-trip .delete-btn`)[0]
        addDeleteListener(deleteBtnEl);
    }
    };
}

// POST DATA TO SERVER
const postData = async (url = "", data = {}) => {
    console.log(data);

    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        tripsData.unshift(newData); 
        renderTrips(); 
        document.getElementById("new-trip").reset();
        return newData; // ?? do I need this?
    } catch (error) {
        console.log("error", error);
    }
}

// GET DATA FROM SERVER
const getData = async (url = "") => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

getData("/trips").then(function (res) { // ? does this invoke when the page loads?
    tripsData = res; 
    renderTrips(); 
});

// DELETE DATA FROM SERVER AND PAGE
const deleteTrip = async (url = "/trips") => {
    const request = await fetch(url, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// EVENT LISTENER FOR SUBMIT BUTTON

document.getElementById('btn-el').addEventListener('click', async function (e) {
    console.log("button clicked");
    e.preventDefault();

    const cityInput = document.getElementById("location-input").value; // repeaated in apis.js
    const dateInput = document.getElementById("date").value; // need a function to turn the date into string format

    await geoNamesApi();
    countdown();

    // If statement to determine which API to use based on days left
    if (daysLeft <= 16) {
    await weatherbitApiWithin16Days();
    } else {
    await weatherbitApiOver16Days();
    }

    await pixabayApi();

    const data = {
        date: dateInput,
        city: cityInput,
        country: country,
        daysLeft: daysLeft,
        weather: weatherbitData,
        icon: weatherIcon,
        img: pixabayImg
    }

    // console.log(data.img);


    const trip = await postData("/trips", data); 
    tripsData.unshift(trip); 
    renderTrips();
});


// EVENT LISTENER FOR DELETE BUTTON
function addDeleteListener(element) {

    element.addEventListener("click", async function (e) {
        e.preventDefault(); 
        console.log("delete button clicked");
        const tripId = document.getElementById("trip-id").value; // how do I customize this to each trip card?
        await deleteTrip(tripId); 
        tripsData = tripsData.filter((trip) => trip.id !== tripId); 
        renderTrips(); 
        document.getElementById("delete-trip").reset();
});
}

//DELETE ICON
document.getElementById("delete-icon").addEventListener("click", async function(e) {
    e.preventDefault();
    console.log("delete button clicked");
});
