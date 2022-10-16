// GEONAMES API
let longitude
let latitude
export let country 

export const geoNamesApi = async () => {
    const cityInput = document.getElementById("location-input").value;

    const res = await fetch(`http://api.geonames.org/searchJSON?q=${cityInput}&maxRows=10&username=jym_b`)
    try {   
        const data = await res.json();
        console.log("geoNamesApi function called");
        longitude = data.geonames[0].lng;
        latitude = data.geonames[0].lat;
        country = data.geonames[0].countryName;        
    }
    catch(error) {
        console.log("error", error);
    }
}


// WEATHERBIT API
const weatherbitApiKey = "ea57d13fc83f470ba9d135ec79988803";
export let weatherbitData
export let weatherIcon

// fetch weatherbit data if date is within 16 days
export const weatherbitApiWithin16Days = async () => {
    const dateInput = document.getElementById('date').value;

    const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`)
    try {
        const data = await res.json();
        console.log("weatherbitApiWithin16Days function called");

        weatherbitData = data.data.filter((day) => day.datetime === dateInput)[0];    
        weatherIcon = weatherbitData.weather.icon;    
    }
    catch(error) {
        console.log("error", error);
    }
}

// fetch weatherbit data if date is beyond 16 days
export const weatherbitApiOver16Days = async () => {
    const dateInput = document.getElementById('date').value;
    const monthAndDay = dateInput.slice(5, 10);
    
    const res = await fetch(`https://api.weatherbit.io/v2.0/normals?lat=${latitude}&lon=${longitude}&start_day=${monthAndDay}&end_day=${monthAndDay}&tp=daily&key=${weatherbitApiKey}`)
    try {
        const data = await res.json();
        console.log("weatherbitApiOver16Days function called");

        weatherbitData = data.data[0];
    }
    catch(error) {
        console.log("error", error);
    }
}


// PIXABAY API
const pixabayApiKey = "30078878-3aacf0d0b10bdf81d4923eea3";
export let pixabayImg

export const pixabayApi = async () => {
    const cityInput = document.getElementById("location-input").value;

    const res = await fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${cityInput}+${country}&image_type=photo&orientation=horizontal`) 
    try {
        const data = await res.json();
        console.log("pixabayApi function called");
        pixabayImg = data.hits[0].largeImageURL;
    }
    catch(error) {
        console.log("error", error);
    }
}

// COUNTDOWN
const countdownEl = document.getElementById('countdown-el');

export let daysLeft
const day = 1000 * 60 * 60 * 24;

export function countdown() {
    const dateInput = document.getElementById('date').value;
    const cityInput = document.getElementById("location-input").value;

    const today = new Date();
    const tripDate = new Date(dateInput);
    const timeLeft = tripDate - today;

    daysLeft = Math.floor(timeLeft / day);
}