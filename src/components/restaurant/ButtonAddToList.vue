<template>
    <div :style="buttonVars" class="relative mb-4 z-20">
        <div
            v-bind:class="{ listVisible: listVisibility }"
            class="list button-shadow pt-5 pb-3 flex flex-col rounded-b-lg absolute w-full background-transition bg-yellow dark:bg-red"
        >
            <div class="listContainer flex flex-col items-center w-full">
                <div
                    v-if="!favorites.items.length"
                    class="text-lg text-center flex justify-center w-full background-transition px-3 py-1 text-black dark:text-white"
                >
                    You have currently no list on your profile.
                </div>
                <div
                    v-on:click="addToList(list.id)"
                    class="text-lg text-center flex justify-center font-bold w-full cursor-pointer background-transition hover:bg-yellowDarker dark:hover:bg-redDarker px-3 py-1 text-black dark:text-white"
                    v-for="list in favorites.items"
                    :key="list.id"
                >
                    <div v-if="list.name.length > 0" class="relative truncate">
                        {{ list.name }}
                        <unicon
                            v-if="checkRestaurantInList(list.id)"
                            name="check"
                            class="static -mb-1.5 fill-current text-black dark:text-white"
                        />
                    </div>
                    <div v-else class="relative">
                        (No name)
                        <unicon
                            v-if="checkRestaurantInList(list.id)"
                            name="check"
                            class="static -mb-1.5 fill-current text-black dark:text-white"
                        />
                    </div>
                </div>
            </div>
            <div
                class="flex flex-col mx-auto px-8 buttonContainer border-t-2 border-black dark:border-white"
            >
                <button
                    v-on:click="
                        toggleListVisibility();
                        topFunction();
                    "
                    v-bind:class="{ buttonListVisible: listVisibility }"
                    class="buttonList flex pt-4"
                >
                    <div class="flex w-full justify-center">
                        <div>Add this restaurant to your list</div>
                        <unicon
                            v-bind:class="{
                                iconRotation: listVisibility,
                            }"
                            class="angleIcon fill-current text-black dark:text-white"
                            name="angle-down"
                        />
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { addRestaurantToUserList } from "../../api/restaurant/restaurantAPI.js";

export default {
    name: "ButtonAddToList",
    props: ["favorites", "restaurantID"],
    data() {
        return {
            listVisibility: false,
            translateIN: 0,
            translateOUT: 0,
            translateSpeed: 0,
        };
    },
    mounted() {
        this.getTranslation();
    },
    methods: {
        toggleListVisibility: function () {
            this.listVisibility = !this.listVisibility;
        },
        topFunction: function () {
            let container = document.getElementsByClassName("listContainer")[0];
            container.scrollTo({ top: 0, behavior: "smooth" });
        },
        addToList: async function (listId) {
            if (!this.checkRestaurantInList(listId)) {
                await addRestaurantToUserList(listId, this.restaurantID);
                this.$emit("updateFavorites");
                this.$restaurantAddedListHasAlertedOnce = true;
                this.$restaurantAddedListAlertCounter = new Date().valueOf();
            } else {
                this.$restaurantAlreadyListHasAlertedOnce = true;
                this.$restaurantAlreadyListAlertCounter = new Date().valueOf();
            }
        },
        getTranslation: function () {
            let translationIN = 36 * this.favorites.total + 48;
            if (this.favorites.total == 0) {
                translationIN = 84;
            }
            this.translateOUT = -30;
            if (translationIN >= 228) {
                this.translateIN = -192;
                this.translateSpeed = 1;
            } else {
                this.translateIN = -translationIN;
                this.translateSpeed = 1 + this.favorites.total * 0.14;
            }
        },
        checkRestaurantInList: function (listId) {
            let currentFavorite = this.favorites.items.find(
                (favorite) => favorite.id == listId
            );
            if (
                currentFavorite.restaurants.find(
                    (restaurant) => restaurant.id == this.restaurantID
                )
            ) {
                return true;
            }
            return false;
        },
    },
    computed: {
        buttonVars() {
            return {
                "--translateIN": this.translateIN + "px",
                "--translateOUT": this.translateOUT + "px",
                "--translateSpeed": this.translateSpeed + "s",
            };
        },
    },
};
</script>

<style scoped>
.list {
    transform: translateY(var(--translateIN));
    transition: transform var(--translateSpeed);
}

.listVisible {
    transform: translateY(var(--translateOUT));
}

.listContainer {
    max-height: 145px;
    overflow-y: scroll;
}

.listContainer::-webkit-scrollbar {
    width: 8px;
}

.listContainer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(86, 86, 86, 0.7);
}

.listContainer::-webkit-scrollbar-thumb:hover {
    background-color: rgba(86, 86, 86, 1);
}

.angleIcon {
    transition: transform 1s;
}

.iconRotation {
    transform: rotate(180deg);
}

.buttonContainer {
    max-width: 360px;
}

.button-shadow {
    box-shadow: 0 10px 15px 0px rgb(0 0 0 / 0.3),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
}
</style>
