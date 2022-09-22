/* Global Variables */
let entryData = [];
const d = new Date();
const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Function to render all entries
function renderEntries() {
  let html = "";
  for (let entry of entryData) {
    html += `
            <h3 class="date">${entry.date}</h3>
            <p class="temp">${entry.temp}º</p>
            <p class="content">${entry.content}</p>
            <hr />
        `;
  }
  document.getElementById("entry-holder").innerHTML = html;
}

// Function to POST data
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
};

// Function to GET data
const getData = async (url = "") => {
  const request = await fetch(url);
  try {
    //Transform into JSON
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

getData("/entries").then(function (res) {
  entryData = res;
  renderEntries();
});

//  WEATHER API
const apiKey = "&appid=d9b0f8ce5594d88a6cea3c6066ee2c05";

const getTemp = async function (zipValue) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipValue}&units=metric${apiKey}`
  );
  if (!res.ok) {
    throw Error("Weather data not available");
  }
  const data = await res.json();
  return Math.round(data.main.temp);
};

// EVENT LISTENER
document
  .getElementById("generate")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const entryDate = newDate;
    const entryContent = document.getElementById("feelings").value;
    const zipValue = document.getElementById("zip").value;
    const entryTemp = await getTemp(zipValue);

    const data = {
      date: entryDate,
      temp: entryTemp,
      content: entryContent,
    };

    const entry = await postData("/entries", data);
    entryData.unshift(entry);
    renderEntries();
    document.getElementById("new-entry").reset();
  });
