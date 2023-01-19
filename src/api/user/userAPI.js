import Cookies from "js-cookie";

const BASE_URL = "https://ufoodapi.herokuapp.com/unsecure";
const SECURE_BASE_URL = "https://ufoodapi.herokuapp.com";

export const getUserData = async function (userID) {
    const response = await fetch(`${BASE_URL}/users/${userID}`);

    if (response.status != 200) {
        throw new Error("An error occured while fetching the user's data.");
    }
    const jsonResponse = await response.json();
    return jsonResponse;
};

export const getUsersWithString = async function (string) {
    const response = await fetch(`${BASE_URL}/users?q=${string}&limit=2000`);

    if (response.status != 200) {
        throw new Error("An error occured while fetching the user's data.");
    }
    const jsonResponse = await response.json();
    return jsonResponse;
};

export const getVisitedRestaurants = async function (userID) {
    const response = await fetch(
        `${BASE_URL}/users/${userID}/restaurants/visits?limit=1000`
    );

    if (response.status != 200) {
        throw new Error(
            "An error occured while fetching the user's visited restaurants."
        );
    }

    const jsonResponse = await response.json();
    return jsonResponse.items;
};

export const getFavoritesLists = async function (userID) {
    const response = await fetch(
        `${BASE_URL}/users/${userID}/favorites?limit=1000`
    );
    if (response.status != 200) {
        throw new Error(
            "An error occured while fetching the user's favorites lists."
        );
    }

    const jsonResponse = await response.json();
    return jsonResponse.items;
};

export const getFavoritesList = async function (listId) {
    const response = await fetch(`${BASE_URL}/favorites/${listId}`, {
        method: "get",
    });

    if (response.status != 200) {
        throw new Error("Could not get favorites list.");
    }
};

export const createFavoritesList = async function (name, owner) {
    const response = await fetch(`${SECURE_BASE_URL}/favorites`, {
        method: "post",
        body: JSON.stringify({
            name: name,
            owner: owner,
        }),
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: Cookies.get("access_token"),
        }),
    });

    if (response.status != 201) {
        throw new Error("Could not create favorites list.");
    }
};

export const updateFavoritesList = async function (listId, name, owner) {
    const response = await fetch(`${SECURE_BASE_URL}/favorites/${listId}`, {
        method: "put",
        body: JSON.stringify({
            name: name,
            owner: owner,
        }),
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: Cookies.get("access_token"),
        }),
    });

    if (response.status != 200) {
        throw new Error("Could not update favorites list.");
    }
};

export const deleteFavoritesList = async function (listId) {
    const response = await fetch(`${SECURE_BASE_URL}/favorites/${listId}`, {
        method: "delete",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: Cookies.get("access_token"),
        }),
    });

    if (response.status != 200) {
        throw new Error("Could not delete favorites list.");
    }
};

export const addRestaurantToFavoritesList = async function (
    listId,
    restaurantId
) {
    const response = await fetch(
        `${SECURE_BASE_URL}/favorites/${listId}/restaurants`,
        {
            method: "post",
            body: JSON.stringify({
                id: restaurantId,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: Cookies.get("access_token"),
            }),
        }
    );

    if (response.status != 200) {
        throw new Error("Could not add restaurant to favorites list.");
    }
};

export const deleteRestaurantFromFavoritesList = async function (
    listId,
    restaurantId
) {
    const response = await fetch(
        `${BASE_URL}/favorites/${listId}/restaurants/${restaurantId}`,
        {
            method: "delete",
        }
    );

    if (response.status != 200) {
        throw new Error("Could not delete restaurant from favorites list.");
    }
};

export const followUser = async function (otherUserId) {
    const response = await fetch(`${SECURE_BASE_URL}/follow`, {
        method: "post",
        body: JSON.stringify({
            id: otherUserId,
        }),
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: Cookies.get("access_token"),
        }),
    });

    if (response.status != 201) {
        throw new Error("Could not follow user.");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
};

export const unfollowUser = async function (otherUserId) {
    const response = await fetch(`${SECURE_BASE_URL}/follow/${otherUserId}`, {
        method: "delete",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: Cookies.get("access_token"),
        }),
    });

    if (response.status != 200) {
        throw new Error("Could not unfollow user.");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
};
