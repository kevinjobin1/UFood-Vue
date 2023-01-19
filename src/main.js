import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/css/tailwind.css";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import * as VueGoogleMaps from "vue2-google-maps";
import VTooltip from "v-tooltip";

Vue.prototype.$darkThemeEnabled =
    localStorage.getItem("theme") === "dark" ? true : false;

// 1. Add unicon icons in line below..
import {
    uniSlidersVAlt,
    uniSearch,
    uniFilter,
    uniX,
    uniMultiply,
    uniGithub,
    uniDollarSign,
    uniUsdCircle,
    uniStar,
    uniPlus,
    uniPlusCircle,
    uniDollarAlt,
    uniCalendarAlt,
    uniArrowUp,
    uniHome,
    uniDirections,
    uniAngleDown,
    uniBookmarkFull,
    uniBook,
    uniBookmark,
    uniPen,
    uniTrashAlt,
    uniBookMedical,
    uniCommentAltEdit,
    uniCheck,
    uniEye,
    uniEyeSlash,
    uniMapMarker,
    uniMap,
    uniSpinnerAlt,
} from "vue-unicons/dist/icons";

Vue.component("v-icon", Icon);

// 2. Add unicon icon here too
Unicon.add([
    uniBookmark,
    uniSearch,
    uniFilter,
    uniX,
    uniMultiply,
    uniSlidersVAlt,
    uniGithub,
    uniDollarSign,
    uniUsdCircle,
    uniStar,
    uniPlus,
    uniPlusCircle,
    uniDollarAlt,
    uniCalendarAlt,
    uniArrowUp,
    uniHome,
    uniDirections,
    uniAngleDown,
    uniPen,
    uniTrashAlt,
    uniBookMedical,
    uniCommentAltEdit,
    uniCheck,
    uniEye,
    uniEyeSlash,
    uniMapMarker,
    uniMap,
    uniSpinnerAlt,
]);
Vue.use(VTooltip);
Vue.use(Unicon);
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyCo5asruaqOTZJVyBSnq5YC35zMfTm7LWU",
        libraries: "places",
    },
});

Vue.config.productionTip = false;

let globalData = new Vue({
    data: {
        $userId: null,
        $isUserSignedIn: false,
        $isLoggedUserPage: false,

        $headerKey: new Date().valueOf() + 8,

        // alerts
        $loginAlertCounter: new Date().valueOf() + 1,
        $loginHasAlertedOnce: false,

        $logoutAlertCounter: new Date().valueOf() + 2,
        $logoutHasAlertedOnce: false,

        $notLoggedInAlertCounter: new Date().valueOf() + 3,
        $notLoggedInHasAlertedOnce: false,

        $restaurantAddedListAlertCounter: new Date().valueOf() + 4,
        $restaurantAddedListHasAlertedOnce: false,

        $restaurantAlreadyListAlertCounter: new Date().valueOf() + 5,
        $restaurantAlreadyListHasAlertedOnce: false,

        $signupErrorAlertCounter: new Date().valueOf() + 7,
        $signupErrorHasAlertedOnce: false,

        $followNotificationCounter: new Date().valueOf() + 9,
        $followNotificationHasAlertedOnce: false,

        $unfollowNotificationCounter: new Date().valueOf() + 10,
        $unfollowNotificationHasAlertedOnce: false,

        $newListCreatedCounter: new Date().valueOf() + 11,
        $newListCreatedHasAlertedOnce: false,
        $locationErrorAlertCounter: new Date().valueOf() + 12,
        $locationErrorHasAlertedOnce: false,
        $locationErrorMessage: "",
    },
});

Vue.mixin({
    computed: {
        // for screen alerts
        $loginAlertCounter: {
            get: function () {
                return globalData.$data.$loginAlertCounter;
            },
            set: function (value) {
                globalData.$data.$loginAlertCounter = value;
            },
        },
        $loginHasAlertedOnce: {
            get: function () {
                return globalData.$data.$loginHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$loginHasAlertedOnce = value;
            },
        },
        $logoutAlertCounter: {
            get: function () {
                return globalData.$data.$logoutAlertCounter;
            },
            set: function (value) {
                globalData.$data.$logoutAlertCounter = value;
            },
        },
        $logoutHasAlertedOnce: {
            get: function () {
                return globalData.$data.$logoutHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$logoutHasAlertedOnce = value;
            },
        },
        $notLoggedInAlertCounter: {
            get: function () {
                return globalData.$data.$notLoggedInAlertCounter;
            },
            set: function (value) {
                globalData.$data.$notLoggedInAlertCounter = value;
            },
        },
        $notLoggedInHasAlertedOnce: {
            get: function () {
                return globalData.$data.$notLoggedInHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$notLoggedInHasAlertedOnce = value;
            },
        },
        $restaurantAddedListAlertCounter: {
            get: function () {
                return globalData.$data.$restaurantAddedListAlertCounter;
            },
            set: function (value) {
                globalData.$data.$restaurantAddedListAlertCounter = value;
            },
        },
        $restaurantAddedListHasAlertedOnce: {
            get: function () {
                return globalData.$data.$restaurantAddedListHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$restaurantAddedListHasAlertedOnce = value;
            },
        },
        $restaurantAlreadyListAlertCounter: {
            get: function () {
                return globalData.$data.$restaurantAlreadyListAlertCounter;
            },
            set: function (value) {
                globalData.$data.$restaurantAlreadyListAlertCounter = value;
            },
        },
        $restaurantAlreadyListHasAlertedOnce: {
            get: function () {
                return globalData.$data.$restaurantAlreadyListHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$restaurantAlreadyListHasAlertedOnce = value;
            },
        },

        // different user pages handling
        $isLoggedUserPage: {
            get: function () {
                return globalData.$data.$isLoggedUserPage;
            },
            set: function (value) {
                globalData.$data.$isLoggedUserPage = value;
            },
        },
        $loginErrorAlertCounter: {
            get: function () {
                return globalData.$data.$loginErrorAlertCounter;
            },
            set: function (value) {
                globalData.$data.$loginErrorAlertCounter = value;
            },
        },
        $loginErrorHasAlertedOnce: {
            get: function () {
                return globalData.$data.$loginErrorHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$loginErrorHasAlertedOnce = value;
            },
        },
        $followNotificationCounter: {
            get: function () {
                return globalData.$data.$followNotificationCounter;
            },
            set: function (value) {
                globalData.$data.$followNotificationCounter = value;
            },
        },
        $followNotificationHasAlertedOnce: {
            get: function () {
                return globalData.$data.$followNotificationHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$followNotificationHasAlertedOnce = value;
            },
        },
        $unfollowNotificationCounter: {
            get: function () {
                return globalData.$data.$unfollowNotificationCounter;
            },
            set: function (value) {
                globalData.$data.$unfollowNotificationCounter = value;
            },
        },
        $unfollowNotificationHasAlertedOnce: {
            get: function () {
                return globalData.$data.$unfollowNotificationHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$unfollowNotificationHasAlertedOnce = value;
            },
        },
        $newListCreatedCounter: {
            get: function () {
                return globalData.$data.$newListCreatedCounter;
            },
            set: function (value) {
                globalData.$data.$newListCreatedCounter = value;
            },
        },
        $newListCreatedHasAlertedOnce: {
            get: function () {
                return globalData.$data.$newListCreatedHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$newListCreatedHasAlertedOnce = value;
            },
        },
        $locationErrorAlertCounter: {
            get: function () {
                return globalData.$data.$locationErrorAlertCounter;
            },
            set: function (value) {
                globalData.$data.$locationErrorAlertCounter = value;
            },
        },
        $locationErrorHasAlertedOnce: {
            get: function () {
                return globalData.$data.$locationErrorHasAlertedOnce;
            },
            set: function (value) {
                globalData.$data.$locationErrorHasAlertedOnce = value;
            },
        },

        $locationErrorMessage: {
            get: function () {
                return globalData.$data.$locationErrorMessage;
            },
            set: function (value) {
                globalData.$data.$locationErrorMessage = value;
            },
        },

        // authentification
        $isUserSignedIn: {
            get: function () {
                return globalData.$data.$isUserSignedIn;
            },
            set: function (value) {
                globalData.$data.$isUserSignedIn = value;
            },
        },
        $userName: {
            get: function () {
                return globalData.$data.$userName;
            },
            set: function (value) {
                globalData.$data.$userName = value;
            },
        },
        $userId: {
            get: function () {
                return globalData.$data.$userId;
            },
            set: function (value) {
                globalData.$data.$userId = value;
            },
        },
        $headerKey: {
            get: function () {
                return globalData.$data.$headerKey;
            },
            set: function (value) {
                globalData.$data.$headerKey = value;
            },
        },
    },
});

new Vue({
    render: (h) => h(App),
    router,
}).$mount("#app");
