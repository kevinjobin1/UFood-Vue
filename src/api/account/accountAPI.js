const BASE_URL = "https://ufoodapi.herokuapp.com";

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded"
        }),
        body: new URLSearchParams({
            email: email,
            password: password,
        }),
    });

    if (response.status != 200) {
        throw new Error("There was an error while trying to login.");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
};

export const signup = async function (email, name, password) {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: "post",
        body: new URLSearchParams({
            email: email,
            name: name,
            password: password,
        }),
    });

    if (response.status != 200) {
        throw new Error("There was an error while trying to signup.");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
};

export const getUserWithToken = async function (token) {
    const response = await fetch(`${BASE_URL}/tokenInfo`, {
        headers: new Headers({
            Authorization: token,
        }),
    });

    if (response.status != 200) {
        throw new Error(
            "There was an error while trying to find user info with the token."
        );
    }

    const jsonResponse = await response.json();
    return jsonResponse;
};
