<template>
    <div>
        <div
            class="relative w-full cursor-pointer card-container"
            @click="notifyRestoSelected"
        >
            <div class="relative w-full h-full">
                <img
                    v-if="restaurant.pictures[0]"
                    :src="restaurant.pictures[0]"
                    :alt="restaurant.name"
                    class="w-full cover rounded-t-xl h-2/3 opacity-80"
                />
                <img
                    v-if="!restaurant.pictures[0]"
                    :src="defaultImage"
                    :alt="restaurant.name"
                    class="w-full cover rounded-t-xl h-2/3 opacity-90 bg-gray1 dark:bg-white"
                />
                <div
                    class="flex flex-col p-3 bg-white card-shadow background-transition dark:bg-gray6 content"
                >
                    <div class="flex gap-x-0.5 items-center">
                        <div
                            class="relative text-xl font-medium border-white text-gray7 dark:text-white md:text-2xl background-transition h-restaurant-name"
                        >
                            {{ restaurant.name }}
                        </div>
                        <span
                            class="text-2xl text-gray5 background-transition text-circle dark:text-gray1"
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
                            class="text-2xl text-gray5 background-transition text-circle dark:text-gray1"
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
                                    class="mt-1 icons-yellow"
                                    name="dollar-alt"
                                />
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center mt-2 gap-x-2">
                        <div class="flex items-center genre-container gap-x-2">
                            <div
                                v-for="genre in restaurant.genres.slice(0, 3)"
                                :key="genre"
                                class="p-2 text-black uppercase genre bg-yellow dark:bg-red dark:text-white rounded-xl light-shadow"
                            >
                                {{ genre }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "RestaurantCardNoLink",
    components: {

    },
    methods: {
        cardInViewPort() {
            this.inView = true;
        },
        cardNotInViewPort() {
            this.inView = false;
        },
        notifyRestoSelected() {
            this.$emit("restoSelected", this.restaurant.id);
        },
    },
    props: ["restaurant", "index"],
    data() {
        return {
            inView: false,
            defaultImage: require("../../assets/images/hamburger-red.svg"),
        };
    },
};
</script>

<style scoped>
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
