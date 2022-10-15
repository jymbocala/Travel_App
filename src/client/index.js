import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/cards.scss";
import "./styles/header.scss";

// import { handleAddTrip } from "./js/events.js";
import { geoNamesApi } from "./js/apis.js";


// export { geoNamesApi };

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))