import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/cards.scss";

import { handleSubmit } from "./js/events";
// addSubmitListener();

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


// Check that service workers are supported
// if ('serviceWorker' in navigator) {
//     // Use the window load event to keep the page load performant
//     window.addEventListener('load', () => {
//         try {
//             navigator.serviceWorker.register('/service-worker.js');
//         } catch (err) {
//             console.log('😥 Service worker registration failed: ', err);
//         }
//     });
// }
