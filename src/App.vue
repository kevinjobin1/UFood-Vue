<template>
    <div class="bg-white dark:bg-gray7" id="app">
        <Header :key="this.$headerKey" />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
        <UserAlert
            :key="this.$loginAlertCounter"
            :counter="this.$loginAlertCounter"
            :canActivate="this.$loginHasAlertedOnce"
            type="message"
            message="Logged in!"
        />

        <UserAlert
            :key="this.$logoutAlertCounter"
            type="alert"
            :counter="this.$logoutAlertCounter"
            :canActivate="this.$logoutHasAlertedOnce"
            message="Logged out!"
        />

        <UserAlert
            :key="this.$restaurantAddedListAlertCounter"
            type="message"
            :counter="this.$restaurantAddedListAlertCounter"
            :canActivate="this.$restaurantAddedListHasAlertedOnce"
            message="Successfully added restaurant to your list."
        />

        <UserAlert
            :key="this.$restaurantAlreadyListAlertCounter"
            type="alert"
            :counter="this.$restaurantAlreadyListAlertCounter"
            :canActivate="this.$restaurantAlreadyListHasAlertedOnce"
            message="This restaurant is already in this list."
        />

        <UserAlert
            :key="this.$loginErrorAlertCounter"
            type="alert"
            :counter="this.$loginErrorAlertCounter"
            :canActivate="this.$loginErrorHasAlertedOnce"
            message="Invalid name or password."
        />
        <UserAlert
            :key="this.$followNotificationCounter"
            type="message"
            :counter="this.$followNotificationCounter"
            :canActivate="this.$followNotificationHasAlertedOnce"
            message="Successfully followed user."
        />
        <UserAlert
            :key="this.$unfollowNotificationCounter"
            type="message"
            :counter="this.$unfollowNotificationCounter"
            :canActivate="this.$unfollowNotificationHasAlertedOnce"
            message="Successfully unfollowed user."
        />
        <UserAlert
            :key="this.$newListCreatedCounter"
            type="message"
            :counter="this.$newListCreatedCounter"
            :canActivate="this.$newListCreatedHasAlertedOnce"
            message="Successfully created a new favorites list."
        />

        <UserAlert
            :key="this.$locationErrorAlertCounter"
            type="alert"
            :counter="this.$locationErrorAlertCounter"
            :canActivate="this.$locationErrorHasAlertedOnce"
            message="Unable to find your location."
        />

        <back-to-top
            visibleoffset="500"
            right="35px"
            bottom="35px"
            class="p-2 transition duration-500 ease-in-out transform shadow-lg bg-yellow dark:bg-red hover:-translate-y-1 hover:scale-110"
        >
            <unicon name="arrow-up" fill="black"></unicon>
        </back-to-top>
        <Footer />
    </div>
</template>

<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import BackToTop from "vue-backtotop";
import UserAlert from "./components/common/UserAlert.vue";
import { getUserWithToken } from "./api/account/accountAPI";
const Cookies = require("js-cookie");

export default {
    name: "app",
    components: { Header, Footer, BackToTop, UserAlert },
    async created() {
        try {
            if (Cookies.get("access_token")) {
                await getUserWithToken(Cookies.get("access_token"));
                this.$isUserSignedIn = true;
            }
        } catch {
            this.$isUserSignedIn = false;
        }
    },
};
</script>

<style>
.vue-back-to-top {
    border-radius: 50%;
    font-size: 22px;
    line-height: 22px;
}

.fade-enter-active {
    animation: coming 0.4s;
    animation-delay: 0.2s;
    opacity: 0;
}

.fade-leave-active {
    animation: going 0.4s;
}

@keyframes going {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-10px);
        opacity: 0;
    }
}

@keyframes coming {
    from {
        transform: translateX(-10px);
        opacity: 0;
    }

    to {
        transform: translateX(0px);
        opacity: 1;
    }
}
</style>
