<template>
    <section
        class="relative flex flex-col justify-center h-full items-center lg:flex-row pb-36"
    >
        <div
            class="items-center lg:items-baseline transform flex flex-col ml-0 lg:ml-20 h-full w-full md:w-1/3 text-left"
        >
            <h1
                v-if="!$isUserSignedIn"
                class="welcome-font text-3xl md:text-3xl xl:text-4xl text-center lg:text-left background-transition text-gray7 dark:text-white mt-10"
            >
                Welcome to UFood!
            </h1>
            <h1
                v-if="$isUserSignedIn"
                class="welcome-font text-3xl md:text-3xl xl:text-4xl text-center lg:text-left background-transition text-gray7 dark:text-white uppercase mt-10"
            >
                Welcome, {{ this.name }}!
            </h1>
            <p
                class="font-general-medium background-transition text-lg lg:text-xl xl:text-2xl text-center lg:text-left leading-none text-gray3 dark:text-gray1 mt-5"
            >
                Find all the restaurants you need, in one place.
            </p>
            <div
                v-if="!$isUserSignedIn"
                class="flex justify-center lg:block mt-10"
            >
                <router-link
                    :to="{ name: 'Login', params: { toLogin: true } }"
                    class="whitespace-nowrap bg-yellow dark:bg-yellow background-transition dark:text-gray7 text-gray7 active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded-2xl shadow hover:shadow-2xl outline-none focus:outline-none mr-3 mb-1"
                    type="button"
                >
                    Login
                </router-link>
                <router-link
                    :to="{ name: 'Login', params: { toLogin: false } }"
                    class="whitespace-nowrap bg-red dark:bg-red dark:text-white background-transition text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded-2xl shadow hover:shadow-2xl outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                >
                    Sign up
                </router-link>
            </div>
            <router-link
                to="/user"
                v-if="$isUserSignedIn"
                class="account-button mt-10 whitespace-nowrap bg-red dark:bg-red dark:text-white background-transition text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded-2xl shadow hover:shadow-2xl outline-none focus:outline-none mr-1 mb-1"
                type="button"
            >
                My account
            </router-link>
        </div>
        <div class="w-full mr-0 lg:mr-20 md:w-2/3 text-right float-right mt-10">
            <img
                src="@/assets/images/pizza-sharing-red.svg"
                alt="Pizza Sharing"
            />
        </div>

        <div class="absolute bottom-6 arrow-scroller">
            <v-icon
                width="20"
                height="27"
                name="arrow-down"
                class="arrow-icon"
            />
        </div>
    </section>
</template>

<style scoped>
.account-button {
    width: min-content;
}
.arrow-scroller > svg {
    fill: rgb(85, 83, 119) !important;
}
.welcome-font {
    letter-spacing: 3px;
    font-size: 45px;
    font-family: "Permanent Marker", cursive;
    font-weight: 300;
}
.arrow-scroller {
    animation: 1.3s arrow-scroll ease-in-out infinite;
}
@keyframes arrow-scroll {
    0% {
        transform: translateY(0px);
    }
    40% {
        transform: translateY(9px);
    }
    50% {
        transform: translateY(9px);
    }
    60% {
        transform: translateY(9px);
    }
    100% {
        transform: translateY(0px);
    }
}

button {
    transition: all 150ms;
}
button:hover {
    transform: scale(1.05);
}
</style>

<script>
import {
    loginClickEvent,
    logoutClickEvent,
} from "../../utils/authentification/authentification";
import { getUserWithToken } from '../../api/account/accountAPI';
const Cookies = require("js-cookie");

export default {
    name: "HomeBanner",
    data: () => {
        return {
            theme: "",
            name: "",
        };
    },
    created() {
        this.theme = localStorage.getItem("theme") || "light";
    },
    mounted() {
        this.theme = localStorage.getItem("theme") || "light";
    },
    updated() {},
    methods: {
        loginClickEvent,
        logoutClickEvent,
    },
    async created() {
        try {
            if (Cookies.get("access_token")) {
                let res = await getUserWithToken(Cookies.get("access_token"));
                this.name = res.name;
            }
        } catch {}
    }
};
</script>
