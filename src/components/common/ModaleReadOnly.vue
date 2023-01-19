<template>
    <div>
        <div
            class="modale-container bg-white dark:bg-gray7 rounded-3xl flex flex-col items-center pt-10 gap-2 text-4xl shadow-2xl dark:text-white"
        >
            <div
                class="flex flex-col gap-8 justify-center text-3xl items-center w-9/12 h-full"
            >
                <div class="break-words text-center w-full">
                    <div
                        class="break-words text-center w-full text-4xl sm:text-5xl text-yellow dark:text-red"
                    >
                        {{ restaurantName }}
                    </div>
                </div>
                <div class="flex text-xl gap-2 items-center">
                    <div>Visit date:</div>
                    <div
                        class="bg-yellow dark:bg-red text-white text-center rounded-2xl p-1"
                    >
                        {{ visitDate.slice(0, 10) }}
                    </div>
                </div>
                <div class="flex gap-2 justify-center items-center">
                    <div>Rating:</div>
                    <star-rating
                        :show-rating="false"
                        :rating="givenRating"
                        :read-only="true"
                        :increment="0.01"
                        :star-size="20"
                        :padding="2"
                        :border-width="2"
                        active-color="#FFC529"
                        inactive-color="#A8A8A8"
                        border-color="#000"
                        :star-points="[
                            23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50,
                            36, 34, 46, 19, 31, 17,
                        ]"
                        class="-mt-1"
                    >
                    </star-rating>
                    <div class="text-gray3 text-sm">({{ givenRating }})</div>
                </div>
                <div
                    class="h-56 text-2xl w-full p-5 break-words text-black dark:text-white"
                >
                    <div
                        class="text-3xl border-b-2 w-max border-black dark:border-white"
                    >
                        Comment:
                    </div>
                    {{ givenComment }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
    name: "Modale",
    components: { StarRating },
    props: ["restaurantName", "givenRating", "givenComment", "visitDate"],
};
</script>

<style scoped>
.modale-container {
    width: 550px;
    height: fit-content;
    padding: 2rem 0;
}

@media screen and (max-width: 768px) {
    .modale-container {
        width: 80vw;
        height: 80vh;
        padding: 2rem 0;

        display: flex;
        align-items: center;
    }
}
</style>
