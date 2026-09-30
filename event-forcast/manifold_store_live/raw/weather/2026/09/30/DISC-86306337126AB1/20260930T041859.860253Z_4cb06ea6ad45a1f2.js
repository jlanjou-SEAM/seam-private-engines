// Define base URLs for environments
let STC_URL;
let staticURL  = "https://hads.ncep.noaa.gov/";
let dynamicURL = "https://hads.ncep.noaa.gov/";
let testURL    = "https://hads.ncep.noaa.gov/";

// Check if BASE_URL can be defined
const BASE_URL = window.location.protocol && window.location.host
    ? `${window.location.protocol}//${window.location.host}/`
    : undefined;

// Update URLs only if BASE_URL is valid
if (BASE_URL) {
    staticURL = (url) => `${BASE_URL}${url.startsWith('/') ? url.slice(1) : url}`;
    dynamicURL = (url) => `${BASE_URL}${url.startsWith('/') ? url.slice(1) : url}`;
    testURL = (url) => `${BASE_URL}${url.startsWith('/') ? url.slice(1) : url}`;
} 
else {
    // Preserve original values if BASE_URL isn't valid
    staticURL = (url) => `https://hads.ncep.noaa.gov/${url.startsWith('/') ? url.slice(1) : url}`;
    dynamicURL = (url) => `https://hads.ncep.noaa.gov/${url.startsWith('/') ? url.slice(1) : url}`;
    testURL = (url) => `https://hads.ncep.noaa.gov/${url.startsWith('/') ? url.slice(1) : url}`;
}
