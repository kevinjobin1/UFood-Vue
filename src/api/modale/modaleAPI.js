import Cookies from "js-cookie";

const BASE_URL = "https://ufoodapi.herokuapp.com";

export const postVisit = async function (
    userId,
    restaurantId,
    date,
    rating,
    comment
) {
    const response = await fetch(
        `${BASE_URL}/users/${userId}/restaurants/visits`,
        {
            method: "post",
            body: JSON.stringify({
                restaurant_id: restaurantId,
                comment: comment,
                rating: rating,
                date: date,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: Cookies.get("access_token"),
            }),
        }
    );

    if (response.status != 201) {
        throw new Error("There is an error with the review.");
    }
};

export const getVisits = async function (userId, restaurantId) {
    const response = await fetch(
        `${BASE_URL}/users/${userId}/restaurants/${restaurantId}/visits?limit=1000`,
        {
            headers: new Headers({
                Authorization: Cookies.get("access_token"),
            }),
        }
    );

    if (response.status != 200) {
        throw new Error("There is an error with the name request.");
    }

    const jsonResponse = await response.json();
    return jsonResponse.items;
};
