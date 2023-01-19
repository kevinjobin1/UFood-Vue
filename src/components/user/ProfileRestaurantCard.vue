<template>
    <div>
        <ModaleReadOnlyRow
            v-if="isModaleReadOnlyRowVisible"
            :userId="userId"
            :restaurantId="restaurant.id"
            :restaurantName="restaurant.name"
            @close-modale="toggleModaleReadOnlyRowVisibility"
        />
        <intersect @enter="cardInViewPort()" @leave="cardNotInViewPort()">
            <div
                class="relative w-full overflow-hidden text-black bg-white cursor-pointer card-container custom-transition card-transform reg-size rounded-3xl dark:bg-gray6 dark:text-white"
                :class="[inView ? 'in-view' : '']"
                id="card"
            >
                <div
                    class="absolute z-10 cursor-pointer bookmark-icon-container right-4"
                    @click="toggleModaleReadOnlyRowVisibility"
                >
                    <div
                        v-if="areVisitsCompiled"
                        class="bookmark-icon bg-yellow dark:bg-red"
                    >
                        <unicon
                            width="50"
                            height="50"
                            name="bookmark"
                            fill="white"
                        />
                    </div>
                </div>
                <router-link
                    :to="{ path: '/restaurant', query: { id: restaurant.id } }"
                    aria-label="Single Restaurant"
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
                            class="flex flex-row items-center w-full mx-4 content hide-on-mobile"
                        >
                            <div
                                class="flex flex-row flex-wrap w-3/4 gap-3 text-sm"
                            >
                                <div
                                    v-for="genre in restaurant.genres.slice(
                                        0,
                                        3
                                    )"
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
                                <div
                                    class="flex flex-row items-center justify-end"
                                >
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

                                <div
                                    class="flex flex-row items-center justify-end"
                                >
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
                        <div class="container-visible">
                            <div
                                v-if="areVisitsCompiled"
                                class="banner-visible"
                            >
                                <div
                                    class="ml-4 tablet:ml-6 text-2xl tablet:text-3xl text-left"
                                >
                                    Visited: {{ formatVisitNumber() }}
                                </div>
                                <div
                                    v-if="lastVisit != null"
                                    class="ml-4 tablet:ml-6 text-2xl tablet:text-3xl text-left"
                                >
                                    Last visit: {{ lastVisit }}
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </intersect>
    </div>
</template>

<script>
import Intersect from "vue-intersect";
import ModaleReadOnlyRow from "./ModaleReadOnlyRow.vue";

export default {
    name: "ProfileRestaurantCard",
    props: ["userId", "restaurant", "visitData", "areVisitsCompiled"],
    data() {
        return {
            lastVisit: null,
            currentScroll: null,
            inView: false,
            isModaleReadOnlyRowVisible: false,
        };
    },
    mounted() {
        this.formatLastVisitDate();
    },
    components: {
        Intersect,
        ModaleReadOnlyRow,
    },
    methods: {
        cardInViewPort() {
            this.inView = true;
        },
        cardNotInViewPort() {
            this.inView = false;
        },
        toggleModaleReadOnlyRowVisibility() {
            this.isModaleReadOnlyRowVisible = !this.isModaleReadOnlyRowVisible;
            if (this.isModaleReadOnlyRowVisible) {
                this.currentScroll = window.scrollY;
                document.body.style.position = "fixed";
            } else {
                document.body.style.position = "";
                window.scrollTo(window.scrollX, this.currentScroll);
            }
        },
        formatVisitNumber() {
            if (this.visitData.visitNumber > 2) {
                return `${this.visitData.visitNumber} times`;
            } else if (this.visitData.visitNumber == 2) {
                return "twice";
            } else {
                return "once";
            }
        },
        formatLastVisitDate() {
            //to present the date in a better format
            const lastVisitDate = new Date(this.visitData.lastVisit);
            const currentDate = new Date();

            const diffInDays = this.dateDiffInDays(currentDate, lastVisitDate);

            if (diffInDays < 7) {
                const weekdays = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ];
                //convert to UTC
                lastVisitDate.setMinutes(
                    lastVisitDate.getMinutes() +
                        lastVisitDate.getTimezoneOffset()
                );
                const weekdayNb = lastVisitDate.getDay();
                this.lastVisit = `${weekdays[weekdayNb]}`;
            } else if (diffInDays < 14) {
                this.lastVisit = `last week`;
            } else if (diffInDays < 31) {
                this.lastVisit = `last month`;
            } else if (diffInDays < 365) {
                const monthsNumber = Math.floor(diffInDays / 31);
                this.lastVisit =
                    monthsNumber == 1
                        ? `last month`
                        : `${monthsNumber} months ago`;
            } else if (diffInDays < 365 * 9) {
                const yearsNumber = Math.floor(diffInDays / 365);
                const s = yearsNumber == 1 ? "" : "s";
                this.lastVisit = `${yearsNumber} year${s} ago`;
            } else {
                this.lastVisit = lastVisitDate.toDateString().substring(4);
            }
        },
        dateDiffInDays(first, second) {
            return Math.round(Math.abs(second - first) / (1000 * 60 * 60 * 24));
        },
    },
};
</script>

<style scoped>
.bookmark-icon {
    transform: translateY(-100px);
    transition: all 0.2s;
}
.bookmark-icon-container:hover {
    transform: scale(1.05) translateY(0);
}

.bookmark-icon-container {
    transition: transform 0.2s;
    overflow: hidden;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
.card-container:hover .bookmark-icon-container .bookmark-icon {
    transform: translateY(0px);
}

.card-container:hover .cover {
    opacity: 1;
    background-color: #fff;
}
.card-container {
    transition: opacity 0.7s;
    opacity: 0;
    height: 350px;
}

.in-view {
    opacity: 1 !important;
}

.card-container:hover {
    transition: all 150ms;
}

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

.light-shadow {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.strong-shadow {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
.icons-color {
    fill: #ffae00;
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

.banner-visible {
    flex-grow: 1;
    padding: 1rem;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
    background-color: #e5383b;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    position: relative;
    right: 0;
}
.container-visible {
    width: 100%;
    left: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    transition: all 0.5s;
}

#card:hover div .container-visible {
    left: 0%;
}

@media (pointer: coarse), screen and (max-width: 768px) {
    .bookmark-icon-container {
        transition: transform 0.2s;
        overflow: hidden;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .bookmark-icon {
        --tw-bg-opacity: 0.8 !important;
        transform: translateY(0px);
    }
    .interactive-img {
        max-height: 200px;
    }

    .restaurant-name {
        display: inline-block;
        width: 100%;
        justify-content: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .hide-on-mobile {
        display: none;
    }

    .banner-visible {
        flex-grow: 1;
        padding: 0.5rem;
        border-top-left-radius: 1.5rem;
        border-bottom-left-radius: 1.5rem;
        background-color: #e5383b;
        margin-left: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        position: relative;
        right: 0;
    }
    .container-visible {
        padding-top: 1rem;
        width: 100%;
        left: 0%;
        display: flex;
        flex-direction: column;
    }
}

@media screen and (max-width: 480px) {
    .reg-size {
        height: 85vw;
        width: 85vw;
    }
}
</style>
