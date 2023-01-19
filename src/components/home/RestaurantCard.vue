<template>
    <div>
        <Modale
            v-if="isModaleVisible"
            :userId="userId"
            :restaurantId="restaurant.id"
            :restaurantName="restaurant.name"
            @close-modale="toggleModaleVisibility"
        />
        <div
            class="w-full relative card-container"
            :class="[inView ? 'in-view' : '']"
        >
            <div
                v-if="this.$isUserSignedIn"
                @click="toggleModaleVisibility"
                class="absolute z-10 cursor-pointer bookmark-icon-container right-4"
            >
                <div class="bookmark-icon bg-yellow dark:bg-red">
                    <unicon
                        width="50"
                        height="50"
                        name="bookmark"
                        fill="white"
                    />
                </div>
            </div>
            <router-link
                v-else
                to="/login"
                class="cursor-pointer bookmark-icon-container absolute right-4 z-10"
            >
                <div class="bookmark-icon bg-yellow dark:bg-red">
                    <unicon
                        width="50"
                        height="50"
                        name="bookmark"
                        fill="white"
                    />
                </div>
            </router-link>

            <router-link
                :to="{ path: '/restaurant', query: { id: restaurant.id } }"
                aria-label="Single Restaurant"
                class="w-full relative"
            >
                <img
                    v-if="restaurant.pictures[0]"
                    :src="restaurant.pictures[0]"
                    :alt="restaurant.name"
                    class="cover rounded-t-xl h-2/3 w-full opacity-80"
                />
                <img
                    v-if="!restaurant.pictures[0]"
                    :src="defaultImage"
                    :alt="restaurant.name"
                    class="cover rounded-t-xl h-2/3 w-full opacity-90 bg-gray1 dark:bg-white"
                />
                <div
                    class="flex p-3 card-shadow background-transition bg-white dark:bg-gray6 flex-col content"
                >
                    <div class="flex gap-x-0.5 items-center">
                        <div
                            class="text-gray7 relative dark:text-white text-xl md:text-2xl background-transition font-medium border-white h-restaurant-name"
                        >
                            {{ restaurant.name }}
                        </div>
                        <span
                            class="text-gray5 background-transition text-circle text-2xl dark:text-gray1"
                        >
                            ︱
                        </span>
                        <div class="flex gap-x-1">
                            <span
                                class="restaurant-rating text-gray7 dark:text-gray1"
                            >
                                {{
                                    Number.parseFloat(
                                        restaurant.rating
                                    ).toFixed(2)
                                }}
                            </span>
                            <unicon
                                class="icons-color star"
                                fill="orange"
                                name="star"
                            />
                        </div>
                        <span
                            class="text-gray5 text-2xl background-transition text-circle dark:text-gray1"
                        >
                            ︱
                        </span>
                        <div
                            class="flex flex-row items-start justify-start mr-2"
                        >
                            <span
                                v-for="dollar in restaurant.price_range"
                                :key="dollar"
                                class="-m-1"
                            >
                                <unicon
                                    width="20"
                                    class="icons-yellow mt-1"
                                    name="dollar-alt"
                                />
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center mt-2 gap-x-2">
                        <div class="flex genre-container items-center gap-x-2">
                            <div
                                v-for="genre in restaurant.genres.slice(0, 3)"
                                :key="genre"
                                class="uppercase genre bg-yellow dark:bg-red dark:text-white text-black p-2 rounded-xl light-shadow"
                            >
                                {{ genre }}
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import Modale from "../common/Modale.vue";

export default {
    components: {
        Modale,
    },
    methods: {
        cardInViewPort() {
            this.inView = true;
        },
        cardNotInViewPort() {
            this.inView = false;
        },
        toggleModaleVisibility() {
            this.isModaleVisible = !this.isModaleVisible;

            if (this.isModaleVisible) {
                this.currentScroll = window.scrollY;
            } else {
                document.body.style.position = "";
                window.scrollTo(window.scrollX, this.currentScroll);
            }
        },
    },
    props: ["restaurant", "index", "userId"],
    data() {
        return {
            inView: false,
            currentScroll: null,
            defaultImage: require("../../assets/images/hamburger-red.svg"),
            isModaleVisible: false,
        };
    },
};
</script>

<style scoped>
.bookmark-icon-container {
    transition: transform 0.2s;
    overflow: hidden;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
.bookmark-icon {
    --tw-bg-opacity: 0.8 !important;
}
@media screen and (min-width: 1000px) {
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
}
.light-shadow {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.genre {
    font-size: 12px;
}

.icons-yellow {
    fill: #ffae00;
}

.icons-red {
    fill: #e5383b;
}

.star {
    transform: translateY(-2px);
}
.content {
    height: 30%;
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
}
.restaurant-price {
    bottom: 5px;
    left: 10px;
}
.leading-sms {
    margin-left: 0 !important;
}
.h-restaurant-name {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.card-container:hover .cover {
    opacity: 1;
    background-color: #fff;
}
.card-container {
    transition: opacity 0.7s;
    opacity: 1;
    height: 350px;
}

.in-view {
    opacity: 1 !important;
}

.card-container:hover {
    transition: all 150ms;
}

.cover {
    transition: opacity 150ms;
    object-fit: cover;
}

.cover:hover {
    opacity: 1;
}
.cover:hover + .card-shadow {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.8),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
}
.card-shadow {
    transition: all 150ms;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
}
.card-shadow:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.8),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
}
</style>
