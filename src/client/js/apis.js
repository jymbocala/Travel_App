// USER INPUT
const cityInput = document.getElementsByClassName('location-input').value;
const dateInput = document.getElementsByClassName('date-input').value;

// GEONAMES API
let longitude  //data.geonames[0].lng; ??
let latitude //data.geonames[0].lat; ??
let country //data.geonames[0].countryName; ??

export const geoNamesApi = async () => {
    const res = await fetch(`http://api.geonames.org/searchJSON?q=${cityInput}&maxRows=10&username=jym_b`)
    try {   
        const data = await res.json();
        console.log("geoNamesApi function called");
        console.log(data);
        // longitude = data.geonames[0].lng;
        // latitude = data.geonames[0].lat;
        // country = data.geonames[0].countryName;
    }
    catch(error) {
        console.log("error", error);
    }
}

// WEATHERBIT API
const weatherbitApiKey = "ea57d13fc83f470ba9d135ec79988803"; //need to hide the key
let weatherbitData

export const weatherbitApi = async () => {
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
const pixabayApiKey = "30078878-3aacf0d0b10bdf81d4923eea3"; //need to hide the key
let pixabayImg

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
countdownEl = document.getElementById('countdown-el'); // is this incorrect?

let daysLeft
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24; // ?? should I just explicitly write the number of milliseconds in a day?
let timerId
timerId = setInterval(countdown, day);


function countdown() {
    const today = new Date();
    const tripDate = new Date(dateInput);
    const timeLeft = tripDate - today;
    
    if (timeLeft <= 0) {
        countdownEl.innerHTML = "Have a great trip!";
        clearInterval(timerId);
        return
    } else if (timeLeft <= -0) {
        clearInterval(timerId);
        // delete card
        return
    }

    daysLeft = Math.floor(timeLeft / day);

    countdownEl.innerHTML = `${cityInput} is ${daysLeft} days away!`;
}


// POST DATA TO SERVER
apiDatas = {
    city: cityInput,
    country: country,
    weather: weatherbitData,
    img: pixabayImg,
    countdown: daysLeft
}

export const postData = async (url = "", data = {}) => {
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
export const getData = async (url = "") => {
    const request = await fetch(url);
    try {
        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// UPDATE UI
export const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        document.getElementById("city").innerHTML = allData.city;
        document.getElementById("country").innerHTML = allData.country;
        document.getElementById("weather").innerHTML = allData.weather;
        document.getElementById("img").innerHTML = allData.img;
    } catch (error) {
        console.log("error", error);
    }
}

