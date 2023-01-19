import Cookies from "js-cookie";

const BASE_URL = "https://ufoodapi.herokuapp.com/";

export const getRestaurant = async function (restaurantID) {
    const response = await fetch(
        `${BASE_URL}unsecure/restaurants/${restaurantID}`
    );

    if (response.status != 200) {
        throw new Error("There is a error with the restaurant page.");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
};

export const getUserLists = async function (userID) {
    const response = await fetch(`${BASE_URL}users/${userID}/favorites`, {
        headers: new Headers({
            Authorization: Cookies.get("access_token"),
        }),
    });

    if (response.status != 200) {
        throw new Error("There is a error with the restaurant page.");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
};

export const addRestaurantToUserList = async function (listID, restaurantID) {
    const response = await fetch(`${BASE_URL}favorites/${listID}/restaurants`, {
        method: "post",
        body: JSON.stringify({
            id: restaurantID,
        }),
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: Cookies.get("access_token"),
        }),
    });

    if (response.status != 200) {
        throw new Error("There is a error with the restaurant page.");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
};
