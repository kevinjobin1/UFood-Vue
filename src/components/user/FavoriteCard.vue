<template>
    <div>
        <div v-if="isConfirmationPopInVisible" class="remove-parent-styling">
            <ConfirmationPopIn
                :message="'Delete this restaurant from the list ?'"
                @confirm="deleteFromList"
                @cancel="toggleConfirmationPopInVisibility"
            />
        </div>
        <div
            class="relative overflow-hidden text-black bg-white cursor-pointer reg-size custom-transition card-transform rounded-3xl dark:bg-gray6 dark:text-white"
        >
            <div
                @mouseover="triangleHover = true"
                @mouseleave="triangleHover = false"
                class="cursor-pointer"
                v-if="$isLoggedUserPage"
                @click="toggleConfirmationPopInVisibility"
            >
                <div v-if="triangleHover">
                    <div class="triangle-hover dark:border-red"></div>
                    <unicon
                        class="review-icon-hover"
                        name="x"
                        width="40"
                        height="40"
                    />
                </div>
                <div v-else>
                    <div class="triangle dark:border-red"></div>
                    <unicon
                        class="review-icon"
                        name="x"
                        width="30"
                        height="30"
                    />
                </div>
            </div>

            <router-link
                v-if="restaurant != null"
                :to="{ path: '/restaurant', query: { id: restaurant.id } }"
                aria-label="Single Restaurant"
                class=""
                id="card"
            >
                <img
                    :src="restaurant.pictures[0]"
                    class="object-cover w-full interactive-img h-1/2 rounded-t-3xl"
                />

                <div class="flex flex-col">
                    <div class="text-3xl text-center restaurant-name">
                        {{ restaurant.name }}
                    </div>

                    <div
                        class="flex flex-row items-center w-full mx-4 -mt-2 content"
                    >
                        <div
                            class="flex flex-row flex-wrap w-3/4 gap-3 text-sm"
                        >
                            <div
                                v-for="genre in restaurant.genres.slice(0, 3)"
                                :key="genre"
                                class="p-2 text-black uppercase rounded-full bg-yellow light-shadow"
                            >
                                {{ genre }}
                            </div>
                            <div
                                v-if="restaurant.genres.length > 3"
                                class="flex pt-2 pb-2 pl-2 pr-2 text-black rounded-full bg-yellow light-shadow"
                            >
                                <unicon name="plus" />
                            </div>
                        </div>
                        <div
                            class="flex flex-col justify-end w-1/4 mr-6 text-2xl text-right"
                        >
                            <div class="flex flex-row items-center justify-end">
                                <div
                                    v-for="dollar in restaurant.price_range"
                                    :key="dollar"
                                >
                                    <unicon
                                        class="-ml-1 -mr-1 icons-color"
                                        name="dollar-alt"
                                    />
                                </div>
                            </div>

                            <div class="flex flex-row items-center justify-end">
                                <div class="pt-0.5">
                                    {{
                                        Number.parseFloat(
                                            restaurant.rating
                                        ).toFixed(2)
                                    }}
                                </div>
                                <unicon class="icons-color" name="star" />
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { getRestaurant } from "../../api/restaurant/restaurantAPI.js";
import { deleteRestaurantFromFavoritesList } from "../../api/user/userAPI.js";
import ConfirmationPopIn from "../common/ConfirmationPopIn.vue";

export default {
    name: "FavoriteCard",
    props: { favoriteRestoID: String, favoriteListID: String },
    components: { ConfirmationPopIn },
    data: () => {
        return {
            restaurant: null,
            currentScroll: null,
            isConfirmationPopInVisible: false,
            triangleHover: false,
        };
    },
    mounted() {
        this.getRestaurantData();
    },
    methods: {
        async getRestaurantData() {
            this.restaurant = await getRestaurant(this.favoriteRestoID);
        },
        toggleConfirmationPopInVisibility() {
            this.isConfirmationPopInVisible = !this.isConfirmationPopInVisible;
            if (this.isConfirmationPopInVisible) {
                this.currentScroll = window.scrollY;
            } else {
                document.body.style.position = "";
                window.scrollTo(window.scrollX, this.currentScroll);
            }
        },
        async deleteFromList() {
            this.toggleConfirmationPopInVisibility();

            await deleteRestaurantFromFavoritesList(
                this.favoriteListID,
                this.favoriteRestoID
            );

            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        },
    },
};
</script>

<style scoped>
.content {
    padding: 10px 20px 0px 20px;
}
.reg-size {
    width: 430px;
    height: 360px;
}
.restaurant-name {
    max-width: 90%;
    border-bottom: 1px solid;
    width: min-content;
    align-self: center;
    margin: 15px 30px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.custom-transition {
    transition: ease-in-out 300ms;
}
.card-transform {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}
.card-transform:hover {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
}
.light-shadow {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.strong-shadow {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
.icons-color {
    fill: #ffae00;
}

@media screen and (max-width: 480px) {
    .interactive-img {
        max-height: 200px;
    }
    .reg-size {
        height: 85vw;
        width: 85vw;
    }
    .restaurant-name {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
    }
}
.triangle {
    border-left: 35px solid transparent !important;
    border-right: 35px solid #ffc529;
    border-top: 35px solid #ffc529;
    border-bottom: 35px solid transparent !important;
    height: 0;
    width: 0;
    position: absolute;
    top: 0px;
    right: 0px;
    border-top-right-radius: 0.5rem;
    transition: border-width 0.2s;
}

.triangle-hover {
    border-right: 45px solid #ffc529;
    border-top: 45px solid #ffc529;
    border-bottom: 45px solid transparent !important;
    border-left: 45px solid transparent !important;
    height: 0;
    width: 0;
    position: absolute;
    top: 0px;
    right: 0px;
    border-top-right-radius: 0.5rem;
    transition: border-width 0.2s;
}
.review-icon {
    fill: #212529;
    position: absolute;
    right: 5px;
    top: 5px;
}

.review-icon-hover {
    fill: #212529;
    position: absolute;
    right: 5px;
    top: 5px;
}
</style>
