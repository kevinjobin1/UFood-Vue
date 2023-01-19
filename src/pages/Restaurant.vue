<template>
    <div
        class="p-2 px-6 background-transition bg-white dark:bg-gray7 text-black dark:text-white"
    >
        <Modale
            v-if="isModaleVisible"
            :userId="userId"
            :restaurantId="restaurantId"
            :restaurantName="restaurant.name"
            @close-modale="onClickModale"
        />
        <div
            v-if="restaurant != null"
            class="mx-auto max-w-screen-xl pt-20 pb-20 flex flex-col gap-6"
        >
            <RestaurantCard
                :restaurant="restaurant"
                @open_modale="onClickModale"
            />
            <ButtonAddToList
                v-if="$isUserSignedIn && userFavorites"
                :favorites="userFavorites"
                :restaurantID="restaurantId"
                @updateFavorites="getDataUserLists"
            />
            <PhotoGallery :restaurant="restaurant" />
            <RestaurantMap :restaurant="restaurant" />
        </div>
    </div>
</template>

<script>
import RestaurantCard from "../components/restaurant/RestaurantCard.vue";
import PhotoGallery from "../components/restaurant/PhotoGallery.vue";
import RestaurantMap from "../components/restaurant/RestaurantMap.vue";
import ButtonAddToList from "../components/restaurant/ButtonAddToList.vue";
import Modale from "../components/common/Modale.vue";
import {
    getRestaurant,
    getUserLists,
} from "../api/restaurant/restaurantAPI.js";
import { getUserWithToken } from "../api/account/accountAPI";
const Cookies = require("js-cookie");

export default {
    name: "Restaurant",
    data() {
        const restaurantId = this.$route.query.id;
        return {
            restaurantId,
            userId: this.$userId,
            restaurant: null,
            userFavorites: null,
            isModaleVisible: false,
            currentScroll: null,
        };
    },
    async mounted() {
        try {
            if (Cookies.get("access_token")) {
                const user = await getUserWithToken(
                    Cookies.get("access_token")
                );
                this.$isUserSignedIn = true;
                this.$userId = user.id;
                this.userId = user.id;
                this.getDataUserLists();
            }
        } catch {
            this.$isUserSignedIn = false;
        }
        this.getDataRestaurant();
    },
    methods: {
        async getDataRestaurant() {
            this.restaurant = await getRestaurant(this.restaurantId);
        },
        async getDataUserLists() {
            this.userFavorites = await getUserLists(this.userId);
        },
        onClickModale() {
            this.isModaleVisible = !this.isModaleVisible;
            if (this.isModaleVisible) {
                this.currentScroll = window.scrollY;
                document.body.style.position = "fixed";
            } else {
                document.body.style.position = "";
                window.scrollTo(window.scrollX, this.currentScroll);
            }
        },
    },
    components: {
        RestaurantCard,
        PhotoGallery,
        RestaurantMap,
        ButtonAddToList,
        Modale,
    },
};
</script>

<style scoped></style>
