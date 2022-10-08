import { allApiData } from "./apis";

const tripsData = []

// USER INPUT
const cityInput = document.getElementsByClassName('location-input').value;
const dateInput = document.getElementsByClassName('date-input').value; // need a function to turn the date into string format

// EVENT LISTENER
document.getElementById('btn-el').addEventListener('click', async function (e) {
    e.preventDefault();

    const data = allApiData

    const trip = await postData("/trips", data);
    tripsData.unshift(trip);
    renderTrips();
    document.getElementById("trip-cards").reset();
});


// RENDER ALL TRIP DATA TO PAGE
function renderTrips() {
    let html
    for (let trip of tripsData) {
        html += `
            <div class="card">
                <img src="${trip.imgURL}" class="card-img" alt="${trip.city}, ${trip.country} ">
                <div class="card-img-overlay">
                    <h3 class="card-title mt-4">${trip.city}, ${trip.country}</h3>
                    <h4 class="card-title mt-3">${trip.date}</h4>
                    <p class="card-text">Typical weather for then is:
                        <br>High: ${trip.weather.max_temp}°C
                        <br>Low: ${trip.weather.min_temp}°C
                        <br>Mostly cloudy throughout the day.
                    </p>
                    <p class="card-text" id="countdown">${trip.city} is ${trip.countdown} days away!</p>
                </div>
            </div>
            `
    }
    document.getElementById('trip-cards').innerHTML = html
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
        return newData;
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

getData("/trips").then(function (res) {
    tripsData = res;
    renderTrips();
});

























// // EVENT LISTENER
// export function handleSubmit(event) {
//     event.preventDefault();
//     console.log("button clicked");
// }
// export const handleSubmit = document
//     .getElementById("btn")
//     .addEventListener("click", async function (e) {
//     e.preventDefault();
    
    // const entryDate = newDate;
    // const entryContent = document.getElementById("feelings").value;
    // const zipValue = document.getElementById("zip").value;
    // const entryTemp = await getTemp(zipValue);

    // const data = {
    //     date: entryDate,
    //     temp: entryTemp,
    //     content: entryContent,
    // };

    // const entry = await postData("/entries", data);
    // entryData.unshift(entry);
    // renderEntries();
    // document.getElementById("new-entry").reset();
    // });

// export { handleSubmit };


// import { getLocation } from "./apis.js";

// const objfromAPIS = await getLocation()
//     try {
//         document.getElementById("submit").addEventListener("click", function (e) {
//             e.preventDefault();
//             console.log("button clicked");
//     })} 
//     catch (error) {
//         console.log(error)
//     };