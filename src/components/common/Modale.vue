<template>
    <div>
        <div
            class="modale-container bg-white dark:bg-gray7 rounded-3xl flex flex-col items-center pt-10 gap-2 text-4xl shadow-2xl dark:text-white"
        >
            <div
                id="error-div"
                class="fixed top-1/2 -mt-12 w-full h-24 bg-red pointer-events-none hidden transition-all flex items-center justify-center"
            >
                {{ errorMessage }}
            </div>
            <unicon
                width="50"
                height="50"
                class="fixed right-10 top-10 fill-current text-yellow dark:text-red cursor-pointer"
                name="x"
                @click="$emit('close-modale')"
            />
            <div
                class="flex flex-col gap-8 justify-center text-3xl items-center w-9/12 h-full"
            >
                <div class="break-words text-center w-full">
                    <div>Leave a Review</div>
                    <div
                        class="break-words text-center w-full text-4xl sm:text-5xl text-yellow dark:text-red"
                    >
                        {{ restaurantName }}
                    </div>
                </div>
                <div class="flex text-xl gap-2 items-center">
                    <div>Last visit date:</div>
                    <input
                        class="bg-yellow dark:bg-red text-white text-center rounded-2xl"
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
                    class="bg-yellow dark:bg-red rounded-3xl text-xl w-1/2 py-2"
                    @click="postVisitModale()"
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import InteractiveStarComponent from "./InteractiveStarComponent.vue";
import { postVisit } from "../../api/modale/modaleAPI";

export default {
    name: "Modale",
    components: { InteractiveStarComponent },
    data: () => {
        return {
            defaultImage: require("../../assets/images/hamburger-red.svg"),
            rating: 0.5,
            errorMessage: String,
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
};

async function postVisitModale() {
    try {
        const dateString = document.getElementById("datePicker").value;
        const date = new Date(dateString);
        const today = new Date();
        if (date > today) {
            throw new Error("Invalid visit date");
        }
        const dateISO = date.toISOString().split(".")[0] + "Z";
        const comment = document.getElementById("commentArea").value;

        postVisit(
            this.userId,
            this.restaurantId,
            dateISO,
            this.rating,
            comment
        );

        this.$emit("close-modale");
    } catch (error) {
        this.errorMessage = error.message;

        let errorDiv = document.getElementById("error-div");

        errorDiv.classList.remove("hidden");

        errorDiv.classList.add("opacityAnimation");

        await sleep(3000);

        errorDiv.classList.remove("opacityAnimation");

        errorDiv.classList.add("hidden");
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
    padding: 2rem 0;
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

.opacityAnimation {
    animation: changeOpacity 3s cubic-bezier(0.06, 1.03, 0.03, 1.02) 1;
}

@keyframes changeOpacity {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        right: 0;
    }
}
</style>
