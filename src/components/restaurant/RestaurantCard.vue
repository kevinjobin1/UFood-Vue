<template>
    <div class="mx-auto flex flex-col w-full z-40">
        <div
            v-bind:class="{ calendarVisible: calendarShown }"
            class="calendar flex flex-col self-center fixed p-5 w-80 bg-white"
        >
            <div
                class="absolute top-2 right-2 cursor-pointer"
                v-on:click="toggleCalendarVisibility"
            >
                <unicon width="25" height="25" class="" name="x" />
            </div>
            <h2 class="text-black self-center custom-underline mb-5">
                Open Hours
            </h2>
            <div
                class="text-black px-2 rounded-full"
                v-for="(hours, day, index) in restaurant.opening_hours"
                :key="'Card' + day"
            >
                <div
                    v-if="index === currentDay"
                    class="text-red font-bold flex justify-between"
                >
                    <div class="capitalize">{{ day }}:</div>
                    <div v-if="hours === null">Closed</div>
                    <div v-else>
                        {{ hours }}
                    </div>
                </div>
                <div v-else class="flex justify-between">
                    <div class="capitalize">{{ day }}:</div>
                    <div v-if="hours === null">Closed</div>
                    <div v-else>
                        {{ hours }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="background-transition relative flex items-center py-2 rounded-lg card-shadow bg-white dark:bg-gray6"
        >
            <img
                :src="restaurant.pictures[0]"
                alt="photo of restaurant"
                class="w-32 md:w-80 h-full rounded-l-lg object-cover absolute"
            />
            <div
                @mouseover="triangleHover = true"
                @mouseleave="triangleHover = false"
                class="cursor-pointer"
                v-if="$isUserSignedIn"
                v-on:click="openModaleRestaurant"
            >
                <div v-if="triangleHover">
                    <div class="triangle-hover dark:border-red"></div>
                    <unicon
                        class="review-icon-hover"
                        name="comment-alt-edit"
                        width="40"
                        height="40"
                    />
                </div>
                <div v-else>
                    <div class="triangle dark:border-red"></div>
                    <unicon
                        class="review-icon"
                        name="comment-alt-edit"
                        width="30"
                        height="30"
                    />
                </div>
            </div>
            <div
                class="flex flex-1 flex-col gap-4 md:ml-80 md:pl-5 ml-36 md:py-2.5"
            >
                <div class="flex gap-4 items-center flex-wrap gap-y-2">
                    <div
                        class="text-2xl md:text-4xl font-general-semibold font-semibold text-clip"
                    >
                        {{ restaurant.name }}
                    </div>
                    <div class="flex gap-2 items-center">
                        <star-rating
                            :show-rating="false"
                            :rating="
                                parseFloat(restaurant.rating.toPrecision(2))
                            "
                            :read-only="true"
                            :increment="0.01"
                            :star-size="20"
                            :padding="2"
                            :border-width="2"
                            active-color="#FFC529"
                            inactive-color="#A8A8A8"
                            border-color="#000"
                            :star-points="[
                                23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38,
                                50, 36, 34, 46, 19, 31, 17,
                            ]"
                            class="-mt-1"
                        >
                        </star-rating>
                        <div class="text-gray3 text-sm">
                            ({{ restaurant.rating.toPrecision(2) }})
                        </div>
                    </div>
                </div>
                <div class="pr-2 flex flex-wrap gap-x-2 gap-y-0 items-center">
                    <div
                        class="text-xs md:text-lg text-center font-bold uppercase px-3 py-1 my-2 bg-yellow text-black dark:text-white dark:bg-red rounded-full"
                        v-for="genre in restaurant.genres"
                        :key="genre"
                    >
                        {{ genre }}
                    </div>
                </div>
                <a :href="'tel:' + restaurant.tel" class="hover:underline">
                    {{ restaurant.tel }}
                </a>
                <div class="flex -mx-1">
                    <unicon
                        v-for="i in restaurant.price_range"
                        :key="'Full' + i"
                        class="price-icons-color -mr-1.5"
                        name="dollar-sign"
                    />
                    <unicon
                        v-for="i in 5 - restaurant.price_range"
                        :key="'Empty' + i"
                        class="-mr-1.5"
                        name="dollar-sign"
                        fill="#A8A8A8"
                    />
                </div>
            </div>
            <div
                class="flex-col w-80 border-l-2 p-2 dark:border-gray5 hidden xl:block"
            >
                <h2
                    class="text-center border-b border-black dark:border-white mb-5"
                >
                    Open Hours
                </h2>
                <div
                    class="px-2 rounded-full"
                    v-for="(hours, day, index) in restaurant.opening_hours"
                    :key="'Static' + day"
                >
                    <div
                        v-if="index === currentDay"
                        class="text-red font-bold flex justify-between"
                    >
                        <div class="capitalize">{{ day }}:</div>
                        <div v-if="hours === null">Closed</div>
                        <div v-else>
                            {{ hours }}
                        </div>
                    </div>
                    <div v-else class="flex justify-between">
                        <div class="capitalize">{{ day }}:</div>
                        <div v-if="hours === null">Closed</div>
                        <div v-else>
                            {{ hours }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-on:click="toggleCalendarVisibility"
                class="flex justify-center items-center bg-yellow dark:bg-red absolute bottom-2 right-2 h-10 w-10 calendarborderIcon rounded-full xl:hidden"
            >
                <unicon class="calendar-icon-color" name="calendar-alt" />
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
    name: "RestaurantCard",
    props: ["restaurant"],
    methods: {
        toggleCalendarVisibility,
        openModaleRestaurant,
    },
    data() {
        return {
            triangleHover: false,
            currentDay: getCurrentDay(),
            calendarShown: false,
        };
    },
    components: { StarRating },
};

function toggleCalendarVisibility() {
    this.calendarShown = !this.calendarShown;
}

function getCurrentDay() {
    const d = new Date();
    return d.getDay();
}

function openModaleRestaurant() {
    this.$emit("open_modale");
}
</script>

<style scoped>
.triangle {
    border-right: 35px solid transparent !important;
    border-left: 35px solid #ffc529;
    border-top: 35px solid #ffc529;
    border-bottom: 35px solid transparent !important;
    height: 0;
    width: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    border-top-left-radius: 0.5rem;
    transition: border-width 0.2s;
}

.triangle-hover {
    border-left: 45px solid #ffc529;
    border-top: 45px solid #ffc529;
    border-bottom: 45px solid transparent !important;
    border-right: 45px solid transparent !important;
    height: 0;
    width: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    border-top-left-radius: 0.5rem;
    transition: border-width 0.2s;
}

.calendar {
    box-shadow: 0 10px 15px 20px rgb(0 0 0 / 0.4),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    z-index: -1;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    opacity: 0;
    transform: translateY(300px);
    bottom: 0;
    transition: all 300ms;
}
.calendarVisible {
    z-index: 40;
    opacity: 1;
    transform: translateY(0);
}

.calendarborderIcon {
    border: 2px solid #212529;
}

.calendarborderIcon:hover {
    cursor: pointer;
}

.card-shadow {
    transition: all 150ms;
    box-shadow: 0 10px 15px 0px rgb(0 0 0 / 0.3),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.review-icon {
    fill: #212529;
    position: absolute;
    left: 5px;
    top: 5px;
}

.review-icon-hover {
    fill: #212529;
    position: absolute;
    left: 5px;
    top: 5px;
}

.calendar-icon-color {
    fill: #212529;
}

.price-icons-color {
    fill: #ffc529;
}
</style>
