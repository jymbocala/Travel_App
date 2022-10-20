import { tripsData, addDeleteListener, handleSubmit } from './events.js';

// RENDER ALL TRIP DATA TO PAGE
export function renderTrips() {
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
                            <p class="temp">${trip.weather.max_temp}°C</p>
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
                            <p class="temp">${trip.weather.max_temp}°C</p>
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