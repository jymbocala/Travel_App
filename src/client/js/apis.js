// GEONAMES API
let longitude = ""; //data.geonames[0].lng; ??
let latitude = ""; //data.geonames[0].lat; ??
let country = ""; //data.geonames[0].countryName; ??

export const geoNamesApi = async () => {
    const cityInput = document.getElementsByClassName('location-input').value;

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
let weatherbitData = {};

export const weatherbitApi = async () => {
    const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=ea57d13fc83f470ba9d135ec79988803`) //need to hide the key
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
let pixabayData = {};

export const pixabayApi = async () => {
    const res = await fetch(`https://pixabay.com/api/?key=19222372-3d3b9c1d3f8d3b7a5c6d7e7f0&q=${cityInput}&image_type=photo`)
    try {
        const data = await res.json();
        console.log("pixabayApi function called");
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}