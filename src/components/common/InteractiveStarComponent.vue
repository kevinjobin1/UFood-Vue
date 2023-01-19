<template>
    <div class="flex flex-row gap-2 justify-center items-center">
        <div
            @mouseleave="setRatingWhenMouseLeave"
            @click="$emit('update-rating', rating)"
        >
            <star-rating
                @rating-selected="setRating"
                @current-rating="setTempRating"
                :show-rating="false"
                :rating="rating"
                :increment="0.5"
                :star-size="20"
                :padding="2"
                :border-width="2"
                active-color="#FFC529"
                inactive-color="#A8A8A8"
                :star-points="[
                    23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34,
                    46, 19, 31, 17,
                ]"
                class="-mt-1"
            >
            </star-rating>
        </div>
        <div
            id="star-rating-text"
            class="w-14 py-1 text-2xl text-center bg-transparent"
        >
            0.5
        </div>
    </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
    name: "InteractiveStarComponent",
    data: () => {
        return {
            rating: 0.5,
            tempRating: 0.5,
        };
    },
    methods: {
        setRating(rating) {
            this.rating = rating;
            document.getElementById("star-rating-text").innerHTML = rating;
        },
        setTempRating(tempRating) {
            this.tempRating = tempRating;
            document.getElementById("star-rating-text").innerHTML = tempRating;
        },
        setRatingWhenMouseLeave() {
            document.getElementById("star-rating-text").innerHTML = this.rating;
        },
    },
    components: { StarRating },
};
</script>

<style scoped></style>
