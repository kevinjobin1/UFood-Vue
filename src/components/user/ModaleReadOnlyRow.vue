<template>
    <div
        class="fixed top-0 left-0 flex items-center w-screen h-screen gap-2 pl-2 overflow-x-auto bg-white custom-z-index mobile-modale-container dark:bg-black bg-opacity-95"
    >
        <unicon
            width="50"
            height="50"
            class="fixed cursor-pointer fill-current top-5 right-5 text-yellow dark:text-red"
            name="x"
            @click="$emit('close-modale')"
        />
        <modale-read-only
            v-for="review in reviews"
            :key="review.id"
            :restaurantName="restaurantName"
            :givenRating="review.rating"
            :givenComment="review.comment"
            :visitDate="review.date"
        />
    </div>
</template>

<script>
import { getVisits } from "../../api/modale/modaleAPI.js";
import ModaleReadOnly from "../common/ModaleReadOnly.vue";

export default {
    name: "ModaleReadOnlyRow",
    props: ["userId", "restaurantId", "restaurantName"],
    components: {
        ModaleReadOnly,
    },
    data: () => {
        return {
            reviews: null,
        };
    },
    mounted() {
        this.setReviewsData();
    },
    methods: {
        async setReviewsData() {
            this.reviews = await getVisits(this.userId, this.restaurantId);
        },
    },
};
</script>

<style scoped>
.custom-z-index {
    z-index: 100000;
}

@media screen and (max-width: 768px) {
    .mobile-modale-container {
        padding: 0.5rem 0;
        width: 100%;
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

.c-icon-button:hover {
    transform: scale(1.1);
    cursor: pointer;
}
</style>
