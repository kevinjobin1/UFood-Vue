<template>
    <div
        class="modale-container bg-white dark:bg-gray7 rounded-3xl flex flex-col items-center pt-10 gap-2 text-4xl shadow-2xl dark:text-white"
    >
        <div
            class="flex flex-col gap-8 justify-center text-3xl items-center w-9/12 h-full"
        >
            <div class="break-words text-center w-full">
                <div>Leave a Review</div>
                <div
                    class="break-words text-center w-full text-4xl sm:text-5xl text-red"
                >
                    {{ restaurantName }}
                </div>
            </div>
            <div class="flex text-xl gap-2 items-center">
                <div>Last visit date:</div>
                <input
                    class="bg-red text-white text-center rounded-2xl"
                    type="date"
                    id="datePicker"
                />
            </div>
            <div class="flex gap-2 justify-center items-center">
                <div>Your rating:</div>
                <InteractiveStarComponent @update-rating="onUpdateRating" />
            </div>
            <textarea
                id="commentArea"
                placeholder="Leave a comment..."
                class="resize-none h-56 text-2xl w-full p-5 text-black"
            />
            <button
                class="bg-red rounded-3xl text-xl w-1/2 py-2"
                @click="postVisitModale"
            >
                Submit
            </button>
        </div>
    </div>
</template>

<script>
import InteractiveStarComponent from "../common/InteractiveStarComponent.vue";
import { postVisit } from "../../api/modale/modaleAPI";

export default {
    data: () => {
        return {
            defaultImage: require("../../assets/images/hamburger-red.svg"),
            rating: 0,
        };
    },
    methods: {
        postVisitModale: postVisitModale,
        onUpdateRating: onUpdateRating,
    },
    props: {
        userId: String,
        restaurantId: String,
        restaurantName: String,
    },
    components: { InteractiveStarComponent },
};

function postVisitModale() {
    const dateString = document.getElementById("datePicker").value;

    const date = new Date(dateString);

    const dateISO = date.toISOString().split(".")[0] + "Z";
    const comment = document.getElementById("commentArea").value;

    postVisit(userId, restaurantId, dateISO, rating, comment);
    // postVisit(
    //     "60765a3d505e68000443c7bb",
    //     "5f31fc6155d7790550c08afe",
    //     dateISO,
    //     this.rating,
    //     comment
    // );
}

function onUpdateRating(rating) {
    this.rating = rating;
}
</script>

<style scoped>
.modale-container {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    height: fit-content;

    position: fixed;
    z-index: 9999;
}

@media screen and (max-width: 768px) {
    .modale-container {
        width: 100vw;
        height: 100vh;
        padding: 2rem 0;

        border-radius: 0;

        display: flex;
        align-items: center;
    }
}

input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
    cursor: pointer;
}

input[type="date"]:focus {
    outline: none;
}
</style>
