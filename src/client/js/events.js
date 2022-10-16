import { pixabayApi, pixabayImg, weatherbitApiWithin16Days, weatherbitApiOver16Days, weatherIcon, weatherbitData, geoNamesApi, countdown, daysLeft, country } from "./apis";

let tripsData = [];

// RENDER ALL TRIP DATA TO PAGE
function renderTrips() {
    let html = "";
    for (let trip of tripsData) {
        if (trip.daysLeft < 16) {
            html += `
            <div class="card" id="${trip.city}-trip">
                <img src="${trip.img}" class="card-img" alt="${trip.city}, ${trip.country} ">
                <div class="card-img-overlay">
                    <div class="card-top">
                        <div class="card-heading col-10">
                            <h2 class="card-title mt-3">${trip.city}, ${trip.country}</h2>
                            <h4 class="card-title mt-3">${trip.date}</h4>
                        </div>
                        <div class="card-weather col-2">
                            <h6 class="weather-title">Expected weather</h6>
                            <img src="https://www.weatherbit.io/static/img/icons/${trip.icon}.png" class="weather-icon" /> 
                            <p class="temp">${trip.weather.max_temp}</p>
                            <p class="weather-description">${trip.weather.weather.description}</p>
                        </div>
                    </div>
                    <div class="card-bottom">
                        <div></div>
                        <h5 class="card-text countdown">${trip.city} is ${trip.daysLeft} days away!</h5>
                        <i class="fa-regular fa-trash-can delete-icon" data-city="${trip.city}"></i>
                    </div>
                </div>
            </div>
            `
        } else {
        html += `
            <div class="card" id="${trip.city}-trip">
            <img src="${trip.img}" class="card-img" alt="${trip.city}, ${trip.country} ">
                <div class="card-img-overlay">
                    <div class="card-top">
                        <div class="card-heading col-10">
                            <h2 class="card-title mt-3">${trip.city}, ${trip.country}</h2>
                            <h4 class="card-title mt-3">${trip.date}</h4>
                        </div>
                        <div class="card-weather col-2">
                            <h6 class="weather-title">Typical temp for then is:</h6> 
                            <p class="temp">${trip.weather.max_temp}</p>
                        </div>
                    </div>
                    <div class="card-bottom">
                        <div></div>
                        <h5 class="card-text countdown">${trip.city} is ${trip.daysLeft} days away!</h5>
                        <i class="fa-regular fa-trash-can delete-icon" data-city="${trip.city}"></i>
                    </div>
                </div>
            </div>
            `
        }
    }
    
    if (html) {
        document.getElementById("trip-cards").innerHTML = html;
    }

    for (let trip of tripsData) {
        const deleteBtnEl = document.querySelector(`#${trip.city}-trip .delete-icon`);
        addDeleteListener(deleteBtnEl);
    }
};

// POST DATA TO SERVER
const postData = async (data = {}) => {
    console.log(data);

    const response = await fetch("//localhost:3000/trips", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// GET DATA FROM SERVER
const getData = async () => {
    const request = await fetch("//localhost:3000/trips");
    try {
        // Transform into JSON
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

getData().then(function (res) {
    tripsData = res; 
    renderTrips(); 
});

// DELETE DATA FROM SERVER AND PAGE
const deleteTrip = async () => {
    const request = await fetch("//localhost:3000/trips", {
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
export function addSubmitListener(){
document.getElementById('btn-el').addEventListener('click', async function (e) {
    console.log("button clicked");
    e.preventDefault();

    const cityInput = document.getElementById("location-input").value;
    const dateInput = document.getElementById("date").value;

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

    const trip = await postData(data); 
    tripsData.unshift(trip); 
    renderTrips();
    document.getElementById("new-trip").reset();
});
}


// EVENT LISTENER FOR DELETE BUTTON
function addDeleteListener(element) {
    element.addEventListener("click", async function (e) {
        e.preventDefault(); 
        console.log("delete button clicked");
        const tripCity = e.target.getAttribute("data-city");
        
        tripsData =  await deleteTrip(tripCity);; 
        renderTrips(); 
});
}