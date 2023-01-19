import router from "../../router";

const Cookies = require("js-cookie");

// handle login
export function loginClickEvent() {
    this.$isUserSignedIn = true;
    this.$loginHasAlertedOnce = true;
    this.$loginAlertCounter = new Date().valueOf();
}

// handle logout
export function logoutClickEvent() {
    this.$isUserSignedIn = false;
    this.$logoutHasAlertedOnce = true;
    this.$logoutAlertCounter = new Date().valueOf();

    this.$userId = null;
    Cookies.remove("access_token");

    if (this.$router.currentRoute.path != "/") this.$router.push("/");
}

export function notLoggedInAction() {
    this.$notLoggedInHasAlertedOnce = true;
    this.$notLoggedInAlertCounter = new Date().valueOf();
}

export function loginErrorEvent() {
    this.$loginErrorHasAlertedOnce = true;
    this.$loginErrorAlertCounter = new Date().valueOf();
}
