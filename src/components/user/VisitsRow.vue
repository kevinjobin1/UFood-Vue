<template>
    <div class="mt-14">
        <div
            class="pl-6 -mb-8 text-3xl font-extrabold text-black dark:text-white"
        >
            Last Visits
        </div>
        <div
            class="flex flex-row gap-6 media-scroller-container"
            v-if="restaurants !== null && restaurants.length !== 0"
        >
            <div
                class="p-1 snaps-inline media-scroller-element"
                v-for="restaurant in restaurants"
                :key="restaurant.id + areVisitsCompiled"
            >
                <ProfileRestaurantCard
                    :areVisitsCompiled="areVisitsCompiled"
                    :userId="userId"
                    :restaurant="restaurant"
                    :visitData="restaurants_visitsData[restaurant.id]"
                />
            </div>
        </div>
        <div v-else class="flex flex-row gap-6 media-scroller-container">
            <NoItemInListCard
                class="p-1 snaps-inline media-scroller-element"
                :message="'No visited restaurants yet'"
                :isLinkToHomeVisible="true"
            />
        </div>
    </div>
</template>

<script>
import ProfileRestaurantCard from "./ProfileRestaurantCard.vue";
import NoItemInListCard from "./NoItemInListCard.vue";
import { getVisitedRestaurants } from "../../api/user/userAPI.js";
import { getRestaurant } from "../../api/restaurant/restaurantAPI.js";
export default {
    name: "VisitsRow",
    props: { userId: String },
    components: {
        ProfileRestaurantCard,
        NoItemInListCard,
    },
    data: () => {
        return {
            restaurants: null,
            restaurants_visitsData: {},
            areVisitsCompiled: false,
        };
    },
    mounted() {
        if (this.userId) {
            this.getVisitedRestaurantsData();
        }
    },
    methods: {
        async getVisitedRestaurantsData() {
            const visitedRestaurants = await getVisitedRestaurants(this.userId);
            this.restaurants_visitsData = {};
            this.restaurants = [];
            //each visitedRestaurant contains info such as date of visit, rating, etc.
            //(not restaurant name, genre, location, etc.)
            for (const visitedRestaurant of visitedRestaurants) {
                if (this.wasNeverVisited(visitedRestaurant.restaurant_id)) {
                    await this.addFirstVisitToResto(visitedRestaurant);
                } else {
                    this.addOtherVisitToResto(visitedRestaurant);
                }
            }
            this.areVisitsCompiled = true;
        },
        wasNeverVisited(restaurant_id) {
            return !this.restaurants_visitsData.hasOwnProperty(restaurant_id);
        },
        async addFirstVisitToResto(visitedRestaurant) {
            let restoInfo;
            try {
                restoInfo = await getRestaurant(
                    visitedRestaurant.restaurant_id
                );
            } catch (e) {
                return;
            }

            this.restaurants_visitsData[visitedRestaurant.restaurant_id] = {
                visitNumber: 1,
                lastVisit: visitedRestaurant.date,
            };

            this.restaurants.push(restoInfo);
        },
        addOtherVisitToResto(visitedRestaurant) {
            this.restaurants_visitsData[
                visitedRestaurant.restaurant_id
            ].visitNumber += 1;

            if (this.thisVisitIsMoreRecent(visitedRestaurant)) {
                this.restaurants_visitsData[
                    visitedRestaurant.restaurant_id
                ].lastVisit = visitedRestaurant.date;
            }
        },
        thisVisitIsMoreRecent(visitedRestaurant) {
            const previousLastVisitString =
                this.restaurants_visitsData[visitedRestaurant.restaurant_id]
                    .lastVisit;
            const previousLastVisit = new Date(previousLastVisitString);
            const lastVisitCandidate = new Date(visitedRestaurant.date);
            return lastVisitCandidate > previousLastVisit;
        },
    },
    watch: {
        userId: function (newValue, oldValue) {
            this.getVisitedRestaurantsData();
        },
    },
};
</script>

<style scoped>
.custom-height {
    height: 250px;
}
.custom-min-width {
    min-width: 50%;
}
.custom-size {
    height: 300px;
    width: 550px;
}

.media-scroller-container {
    padding: 50px 20px;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    scroll-padding-inline: 1rem;
}

.media-scroller-element:active {
    cursor: grabbing;
}

.snaps-inline {
    scroll-snap-align: start;
}

@media (pointer: coarse), screen and (max-width: 768px) {
    .custom-size {
        height: 400px;
        width: calc(100vw - 80px);
        flex-direction: column;
        justify-content: center;
        max-width: 400px;
    }
    .custom-height {
        height: 150px;
    }

    .media-scroller-element {
        min-height: 360px;
        max-height: 360px;
    }
}

.media-scroller-container::-webkit-scrollbar {
    width: 7px;
    height: 8px;
}
.media-scroller-container::-webkit-scrollbar-thumb {
    background-color: rgba(86, 86, 86, 0.7);
    border-radius: 10px;
}

.media-scroller-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(86, 86, 86, 1);
}
</style>
