import { pixabayApi, pixabayImg, weatherbitApiWithin16Days, weatherbitApiOver16Days, weatherbitData, geoNamesApi, countdown, daysLeft, country } from "./apis";

let tripsData = []

// USER INPUT

// EVENT LISTENER FOR SUBMIT BUTTON
document.getElementById('btn-el').addEventListener('click', async function (e) {
    console.log("button clicked");
    e.preventDefault();

    const cityInput = document.getElementById("location-input").value; // repeaated in apis.js
    const dateInput = document.getElementById("date").value; // need a function to turn the date into string format


    await geoNamesApi();
    await countdown();
    console.log(daysLeft, "daysLeft");

    // If statement to determine which API to use based on days left
    if (daysLeft <= 16) {
    await weatherbitApiWithin16Days();
    } else {
    await weatherbitApiOver16Days();
    }

    // await pixabayApi();
    const data = {
        date: dateInput,
        city: cityInput,
        country: country,
        daysLeft: daysLeft,
        weather: weatherbitData,
        img: pixabayImg
    }

    console.log(data.weather);


    // const trip = await postData(data); 
    // tripsData.unshift(trip); 
    // renderTrips();
});

// EVENT LISTENER FOR DELETE BUTTON
function addDeleteListener(element) {

    element.addEventListener("click", async function (e) {
        e.preventDefault(); 
        const tripId = document.getElementById("trip-id").value; // how do I customize this to each trip card?
        await deleteTrip(tripId); 
        tripsData = tripsData.filter((trip) => trip.id !== tripId); 
        renderTrips(); 
        document.getElementById("delete-trip").reset();
});
}

// RENDER ALL TRIP DATA TO PAGE
function renderTrips() {
    let html
    for (let trip of tripsData) {
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
}

// POST DATA TO SERVER
const postData = async (data = {}) => {
    console.log(data);

    const response = await fetch("//localhost:8080/trips", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json(); // this is the data that is returned from the server
        tripsData.unshift(newData); 
        renderTrips(); 
        document.getElementById("new-trip").reset();
        return newData; // ?? do I need this?
    } catch (error) {
        console.log("error", error);
    }
}

// GET DATA FROM SERVER
const getData = async (url = "//localhost:8080/trips") => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

getData().then(function (res) { // ? does this invoke when the page loads?
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