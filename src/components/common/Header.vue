<template>
    <div
        v-bind:class="{ 'h-invisible': !headerVisible }"
        class="fixed z-50 flex items-center justify-between w-screen h-16 bg-white shadow-lg background-transition header dark:bg-gray7"
    >
        <router-link to="/">
            <div class="h-12 header-logo w-13">
                <img
                    class="w-full h-full"
                    src="../../assets/images/logo.png"
                    alt=""
                />
                <div class="flex items-end">
                    <span class="mt-1 ml-2 text-2xl font-bold dark:text-white"
                        >UF</span
                    ><span class="text-2xl font-bold text-red">oo</span
                    ><span class="text-2xl font-bold dark:text-white">d</span>
                </div>
            </div>
        </router-link>
        <div class="items-center hidden h-full md:flex gap-x-7">
            <div class="flex items-center gap-x-2">
                <div class="pt-1">
                    <DarkModeSwitch
                        @switched="toggleDarkTheme"
                        :initialState="isDarkModeEnabled"
                    />
                </div>
                <div v-on:click="searchClickEvent" class="pt-1">
                    <unicon
                        width="30"
                        height="30"
                        v-bind:class="{ 'light-icon': isDarkModeEnabled }"
                        class="background-transition unicon-icon"
                        name="search"
                    />
                </div>
            </div>
            <div class="bg-gray4 dark:bg-white h-1/2 separator"></div>
            <div class="flex items-center">
                <div
                    class="flex items-center gap-x-4"
                    v-bind:class="getItemVisibility('desktop-menu-logout')"
                >
                    <router-link
                        to="/user"
                        href="#"
                        class="flex items-center header-username-flex"
                    >
                        <img
                            :src="this.gravatarLink"
                            alt=""
                            class="border-2 object-cover border-gray1 dark:border-white rounded-full h-logo w-logo"
                        />
                        <span
                            class="header-username background-transition text-gray7 dark:text-white mr-3 ml-3"
                        >
                            {{ this.name }}
                        </span>
                    </router-link>
                    <div
                        v-on:click="logoutClickEvent"
                        class="flex items-center justify-center cursor-pointer"
                    >
                        <v-icon
                            v-bind:class="{ 'light-icon': isDarkModeEnabled }"
                            width="20"
                            height="20"
                            class="background-transition h-icon"
                            name="sign-out-alt"
                        />
                    </div>
                </div>
                <router-link
                    :to="{ name: 'Login', params: { toLogin: true } }"
                    v-bind:class="getItemVisibility('desktop-menu-login')"
                    class="flex items-center justify-center cursor-pointer login-flex gap-x-2"
                >
                    <span class="text-black dark:text-white">Login</span>
                    <v-icon
                        v-bind:class="{ 'light-icon': isDarkModeEnabled }"
                        width="20"
                        height="20"
                        class="background-transition"
                        name="sign-in-alt"
                    />
                </router-link>
            </div>
        </div>
        <div class="flex items-center gap-x-3 md:hidden">
            <div v-on:click="searchClickEvent" class="pt-2">
                <unicon
                    width="30"
                    height="30"
                    v-bind:class="{ 'light-icon': isDarkModeEnabled }"
                    class="background-transition unicon-icon"
                    name="search"
                />
            </div>
            <div
                v-on:click="burgerClickEvent"
                class="flex flex-col justify-between cursor-pointer burger"
            >
                <div
                    v-bind:class="{ 'h-line1': isBurgerOpened }"
                    class="w-full origin-right rounded-lg h-line dark:bg-white bg-gray5"
                ></div>
                <div
                    v-bind:class="{ 'h-line2': isBurgerOpened }"
                    class="w-full rounded-lg h-line dark:bg-white bg-gray5"
                ></div>
                <div
                    v-bind:class="{ 'h-line3': isBurgerOpened }"
                    class="w-full origin-right rounded-sm h-line dark:bg-white bg-gray5"
                ></div>
            </div>
        </div>
        <div
            v-bind:class="{ 'burger-menu-invisible': !isBurgerOpened }"
            class="fixed right-0 w-screen transition-all duration-150 ease-in-out bg-white opacity-95 burger-menu top-16 md:hidden dark:bg-gray7"
        >
            <div
                class="relative flex flex-col items-center justify-center w-full h-full"
            >
                <div
                    class="relative"
                    v-bind:class="getItemVisibility('mobile-menu-login')"
                >
                    <div
                        v-on:click="
                            return (function () {
                                burgerClickEvent();
                                searchClickEvent();
                            })();
                        "
                        class="flex items-center mb-10 cursor-pointer browse xasdasd gap-x-3"
                    >
                        <div class="text-2xl text-dark dark:text-white">
                            Browse Restaurants
                        </div>
                        <unicon
                            width="30"
                            height="30"
                            v-bind:class="{ 'light-icon': isDarkModeEnabled }"
                            class="cursor-pointer"
                            name="search"
                        />
                    </div>
                    <div class="flex flex-col items-center gap-y-2">
                        <router-link
                            :to="{ name: 'Login', params: { toLogin: true } }"
                            @click.native="burgerClickEvent"
                            class="pt-2 pb-2 pl-4 pr-4 text-white rounded bg-red"
                        >
                            Login
                        </router-link>
                        <router-link
                            :to="{ name: 'Login', params: { toLogin: false } }"
                            @click.native="burgerClickEvent"
                            class="text-black dark:text-gray1"
                            >Sign Up</router-link
                        >
                        <div v-on:click="toggleDarkTheme">
                            <DarkMode></DarkMode>
                        </div>
                    </div>
                </div>

                <div
                    class="relative"
                    v-bind:class="getItemVisibility('mobile-menu-logout')"
                >
                    <div class="h-name dark:text-white">
                        Hi, {{ this.name }}!
                    </div>
                    <div
                        v-on:click="
                            return (function () {
                                burgerClickEvent();
                                searchClickEvent();
                            })();
                        "
                        class="flex items-center mb-10 cursor-pointer browse xasdasd gap-x-3"
                    >
                        <div class="text-2xl text-dark dark:text-white">
                            Browse Restaurants
                        </div>
                        <unicon
                            width="30"
                            height="30"
                            v-bind:class="{ 'light-icon': isDarkModeEnabled }"
                            class="cursor-pointer"
                            name="search"
                        />
                    </div>
                    <div class="flex flex-col items-center gap-y-2">
                        <div class="mb-2" v-on:click="burgerClickEvent">
                            <router-link
                                to="/user"
                                class="pt-2 pb-2 pl-4 pr-4 text-white rounded bg-red"
                            >
                                My account
                            </router-link>
                        </div>
                        <router-link
                            to="/"
                            @click.native="
                                return (function () {
                                    burgerClickEvent();
                                    logoutClickEvent();
                                })();
                            "
                            class="text-black dark:text-gray1"
                        >
                            Sign Out
                        </router-link>
                    </div>
                    <div
                        class="pt-4 flex justify-center"
                        v-on:click="toggleDarkTheme"
                    >
                        <DarkMode></DarkMode>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DarkModeSwitch from "vue-dark-mode-switch";
import DarkMode from "vue-dark-mode-switcher";
import "vue-dark-mode-switch/dist/vue-dark-mode-switch.css";
import {
    loginClickEvent,
    logoutClickEvent,
} from "../../utils/authentification/authentification";
import { getUserWithToken } from "../../api/account/accountAPI";
const Cookies = require("js-cookie");
const md5 = require("md5");

export default {
    name: "Header",
    data() {
        return {
            isDarkModeEnabled: getStoredTheme(),
            isBurgerOpened: false,
            hasScrolled: false,
            scrollPosition: window.scrollY,
            headerVisible: true,
            gravatarLink: "",
            name: "",
            email: "",
        };
    },
    components: {
        DarkModeSwitch: DarkModeSwitch,
        DarkMode,
    },
    methods: {
        setScrollInterval,
        toggleDarkTheme,
        burgerClickEvent,
        getItemVisibility,
        searchClickEvent,
        loginClickEvent,
        logoutClickEvent,
        getHashedEmail,
        getGravatarLink,
    },
    // this is needed to detect whether or not isDarkModeEnabled is first initialized as false or true
    mounted: async function () {
        setStoredTheme();

        try {
            if (Cookies.get("access_token")) {
                let res = await getUserWithToken(Cookies.get("access_token"));
                this.name = res.name;
                this.email = res.email;
            }
        } catch {}

        this.getGravatarLink();
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        },
    },
};

// store current theme in local storage
// switch theme on DarkModeSwitch click event
function toggleDarkTheme() {
    if (this.isDarkModeEnabled) localStorage.theme = "light";
    else localStorage.theme = "dark";

    this.isDarkModeEnabled = !this.isDarkModeEnabled;
    document.documentElement.classList.toggle("dark");
}

// on component mount, get last used theme from local storage
function setStoredTheme() {
    if (localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function getStoredTheme() {
    if (localStorage.theme === "dark") {
        return true;
    } else {
        return false;
    }
}

function getItemVisibility(elem) {
    var appliedClasses = "";
    switch (elem) {
        case "sign-out-icon":
            if (!this.$isUserSignedIn) appliedClasses += "hidden";
            break;
        case "sign-in-icon":
            if (this.$isUserSignedIn) appliedClasses += "hidden";
            break;
        case "desktop-menu-logout":
            if (!this.$isUserSignedIn) appliedClasses += "hidden";
            break;
        case "desktop-menu-login":
            if (this.$isUserSignedIn) appliedClasses += "hidden";
            break;
        case "mobile-menu-login":
            if (this.$isUserSignedIn) appliedClasses += "hidden";
            break;
        case "mobile-menu-logout":
            if (!this.$isUserSignedIn) appliedClasses += "hidden";
            break;
        default:
            break;
    }
    return appliedClasses;
}

function burgerClickEvent() {
    this.isBurgerOpened = !this.isBurgerOpened;
}

function setScrollInterval() {}

function searchClickEvent() {
    let currentURL = this.$router.currentRoute.path;
    if (currentURL === "/") {
        let el = document.getElementsByClassName(
            "restaurant-search-container"
        )[0];
        el.scrollIntoView({ behavior: "smooth" });
    } else {
        this.$router.push({ path: "/", query: { scroll: "search" } });
    }
}

function getHashedEmail() {
    if (this.email != "") {
        return md5(this.email.toLowerCase());
    } else return "";
}

function getGravatarLink() {
    this.gravatarLink = `https://www.gravatar.com/avatar/${this.getHashedEmail()}?s=2048
    &d=https%3A%2F%2Fi.postimg.cc%2FDm3w4YJ9%2Fuser-default-image.png`;
}
</script>

<style>
.h-name {
    text-align: center;
    letter-spacing: 3px;
    font-size: 22px;
    font-family: "Permanent Marker", cursive;
    font-weight: 300;
}
.h-invisible {
    transform: translateY(-100px);
}
.header-logo {
    display: flex;
    align-items: center;
    transition: all 150ms;
}
.header-logo:hover {
    transform: scale(1.05);
}
.header {
    top: 0;
    transition: transform 150ms ease-in-out;
    padding: 0 80px 0 80px;
}
.header-username-flex {
    transition: transform 150ms;
}
.header-username-flex:hover {
    transform: scale(1.07);
}
@media screen and (max-width: 768px) {
    .header {
        padding: 0 30px 0 30px;
    }
}
.separator {
    width: 0.15rem;
}
.h-line1 {
    transform: translateX(-2px) translateY(-2px) rotate(-45deg);
}
.h-line2 {
    transform: translateX(80px);
    transition: all 350ms !important;
    opacity: 0;
}
.h-line3 {
    transform: translateX(-2px) translateY(2px) rotate(45deg);
}
.burger {
    height: 19px;
    width: 29px;
}
.h-line {
    transition: all 200ms;
    height: 3px;
}
.burger-menu {
    height: calc(100vh);
}
.burger-menu-invisible {
    opacity: 0;
    right: -110% !important;
}
.light-icon {
    fill: #f7f7ee;
}
.unicon-icon > svg {
    cursor: pointer;
    transition: all 150ms;
}
.unicon-icon:hover > svg {
    transform: scale(1.07);
}
.login-flex {
    transition: transform 150ms;
}
.login-flex:hover {
    transform: scale(1.05);
}
@media screen and (max-height: 400px) {
    .mobile-toggler {
        display: none;
    }
}
</style>
