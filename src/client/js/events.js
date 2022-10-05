export function handleSubmit (e) {
    e.preventDefault()
    console.log("handleSubmit function called");
    const btnEl = document.querySelector('#btn-el');
    btnEl.addEventListener('click', async () => {
        console.log("testing testing button clicked");
    })
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