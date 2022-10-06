
btnEl.addEventListener('click', async () => {
    console.log("button event listener called");
    Client.geoNamesApi()
})

// function handleSubmit(event) {
//     event.preventDefault()
//     console.log("handleSubmit function called");
// }

// export { handleSubmit };

const btnEl = document.getElementById('btn-el');

function handleAddTrip() {
    console.log("handleAddTrip function called + button called");
    btnEl.addEventListener('click', Client.geoNamesApi);
}

export { handleAddTrip };



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