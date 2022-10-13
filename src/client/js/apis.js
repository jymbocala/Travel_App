// GEONAMES API
let longitude
let latitude
export let country 

export const geoNamesApi = async () => {
    const res = await fetch(`http://api.geonames.org/searchJSON?q=${cityInput}&maxRows=10&username=jym_b`)
    try {   
        const data = await res.json();
        console.log("geoNamesApi function called");
        console.log(data);
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
let weatherbitData

// fetch weatherbit data if date is within 16 days
export const weatherbitApiWithin16Days = async () => {
    const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`) // add if: &days=16 ???? or days over 16 to get different data
    try {
        const data = await res.json();
        console.log("weatherbitApi function called");
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}

// fetch weatherbit data if date is beyond 16 days
export const weatherbitApiOver16Days = async () => {
    const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`) // add if: &days=16 ???? or days over 16 to get different data
    try {
        const data = await res.json();
        console.log("weatherbitApi function called");
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}


// PIXABAY API
const pixabayApiKey = "30078878-3aacf0d0b10bdf81d4923eea3"; //TODO: hide the key
export let pixabayImg

export const pixabayApi = async () => {
    const res = await fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${cityInput}&image_type=photo&orientation=horizontal`) 
    try {
        const data = await res.json();
        console.log("pixabayApi function called");
        console.log();
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
    const today = new Date();
    const tripDate = new Date(dateInput);
    const timeLeft = tripDate - today;
    
    if (timeLeft <= 0) {
        countdownEl.innerHTML = "Have a great trip!";
        return
    } else if (timeLeft <= -0) {
        // TODO: add a function to remove the trip from the page
        return
    }

    daysLeft = Math.floor(timeLeft / day);

    countdownEl.innerHTML = `${cityInput} is ${daysLeft} days away!`;
}