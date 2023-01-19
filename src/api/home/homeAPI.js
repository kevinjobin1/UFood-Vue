const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?";
const PLACES_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?"
const GOOGLE_API_KEY = "AIzaSyCo5asruaqOTZJVyBSnq5YC35zMfTm7LWU";

export const getAddressFromCoordinates = async function(lat, long) {
    const response = await fetch(
        GEOCODE_URL + "latlng=" + lat + "," + long + "&key=" + GOOGLE_API_KEY
    );

    if (response.status != 200) {
        throw new Error("Error: " + response.error_message);
    }

    const jsonResponse = await response.json();

    return jsonResponse.results[0];
};

export const getPositionFromAddress = async function(address) {
    const response = await fetch(
        GEOCODE_URL +
        "address=" +
        address.replace(/\s/g, "+") +
        "&key=" +
        GOOGLE_API_KEY
    );

    if (response.status != 200) {
        throw new Error("Error: " + response.error_message);
    }

    const jsonResponse = await response.json();

    return jsonResponse.results[0];
};

export const getPredictions = async function(input) {
    const response = await fetch(
        PLACES_URL +
        "?input=" +
        input.replace(/\s/g, "+") +
        "&types=geocode" +
        "&region=CA" +
        "&language=fr" +
        "&key=" +
        GOOGLE_API_KEY
    );

    if (response.status != 200) {
        throw new Error("Error: " + response.error_message);
    }

    const jsonResponse = await response.json();

    return jsonResponse.predictions;
};