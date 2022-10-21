const fetch = require('isomorphic-unfetch')

import { pixabayApi, pixabayImg, weatherbitApiWithin16Days, weatherbitApiOver16Days, weatherIcon, weatherbitData, geoNamesApi, countdown, daysLeft, country } from "./apis";
import { renderTrips } from "./renderTrips";

export let tripsData = [];

// EVENT LISTENER FOR SUBMIT BUTTON
const submitButton = document.getElementById("btn-el");
if (submitButton) {
    submitButton.addEventListener("click", handleSubmit);
    console.log("submit button exists");
}

export async function handleSubmit(e) {
    e.preventDefault();
    console.log("button clicked, now running handleSubmit");

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
    renderTrips(tripsData);
    document.getElementById("new-trip").reset();
};


// EVENT LISTENER FOR DELETE BUTTON
export function addDeleteListener(element) {
    element.addEventListener("click", async function (e) {
        e.preventDefault(); 
        console.log("delete button clicked");
        const tripCity = e.target.getAttribute("data-city");
        console.log(tripCity);
        tripsData =  await deleteTrip(tripCity);
        console.log(tripsData);
        renderTrips(tripsData); 
    });
}


// POST DATA TO SERVER
const postData = async (data = {}) => {
    console.log(data);

    const response = await fetch("//localhost:5000/trips", {
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
    const request = await fetch("//localhost:5000/trips");
    try {
        // Transform into JSON
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

getData().then(function (res) {
    tripsData = res; 
    renderTrips(tripsData); 
});


// DELETE DATA FROM SERVER AND PAGE
const deleteTrip = async () => {
    const request = await fetch("//localhost:5000/trips", {
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
};