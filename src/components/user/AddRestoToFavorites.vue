<template>
    <div>
        <div
            v-if="isSelectionPopInVisible"
            class="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-50 selection-pop-in-container dark:bg-gray7"
        >
            <div class="flex justify-center">
                <div>
                    <unicon
                        width="50"
                        height="50"
                        class="fixed cursor-pointer fill-current right-10 top-10 text-yellow dark:text-red close-button opacity-95 bg-white rounded-3xl p-2"
                        name="x"
                        @click="togglePopInVisibility"
                    />
                </div>
                <div
                    class="w-screen h-screen mr-2 overflow-y-scroll bg-white dark:bg-gray7 customImage-container"
                >
                    <HomeSearchContainer
                        :areCardsWithRouterLink="false"
                        :containerHeaderText="homeSearchContainerHeaderText"
                        class="mt-10"
                        @restoSelected="addResto"
                    />
                </div>
            </div>
        </div>
        <div
            @click="togglePopInVisibility"
            class="relative flex flex-col items-center justify-center overflow-hidden text-black bg-white cursor-pointer custom-transition card-transform reg-size rounded-3xl dark:bg-gray6 dark:text-white"
        >
            <div
                class="flex items-center justify-center w-40 h-40 mb-10 rounded-full bg-gray1 dark:bg-gray7"
            >
                <unicon
                    class="fill-current text-gray7 dark:text-white"
                    width="90"
                    height="90"
                    name="plus"
                />
            </div>
            <div class="text-base mobile:text-xl">
                Add a restaurant to this list
            </div>
        </div>
    </div>
</template>

<script>
import HomeSearchContainer from "../home/HomeSearchContainer.vue";
import { addRestaurantToFavoritesList } from "../../api/user/userAPI.js";
export default {
    name: "AddRestoToFavorites",
    props: {
        favoritesListId: String,
    },
    components: {
        HomeSearchContainer,
    },
    data: () => {
        return {
            isSelectionPopInVisible: false,
            homeSearchContainerHeaderText: "Add a restaurant",
            currentScroll: null,
        };
    },
    mounted() {},
    methods: {
        togglePopInVisibility() {
            this.isSelectionPopInVisible = !this.isSelectionPopInVisible;

            if (this.isSelectionPopInVisible) {
                this.currentScroll = window.scrollY;
                document.body.style.position = "fixed";
            } else {
                document.body.style.position = "";
                window.scrollTo(window.scrollX, this.currentScroll);
            }
        },
        async addResto(restoId) {
            this.togglePopInVisibility();
            await addRestaurantToFavoritesList(this.favoritesListId, restoId);
            this.$emit("refresh");
        },
    },
};
</script>

<style scoped>
.close-button {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
    z-index: 1000001;
}

.selection-pop-in-container {
    z-index: 1000000;
}

.reg-size {
    width: 430px;
    height: 360px;
}

.custom-transition {
    transition: ease-in-out 300ms;
}
.card-transform {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}
.card-transform:hover {
    transform: scale(1);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
}

@media screen and (max-width: 480px) {
    .reg-size {
        height: 85vw;
        width: 85vw;
    }
}

.customImage-container::-webkit-scrollbar {
    width: 7px;
    height: 8px;
}
.customImage-container::-webkit-scrollbar-thumb {
    background-color: rgba(86, 86, 86, 0.7);
    border-radius: 10px;
}

.customImage-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(86, 86, 86, 1);
}
</style>
