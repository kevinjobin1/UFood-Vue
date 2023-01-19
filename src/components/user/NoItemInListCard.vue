<template>
    <div>
        <div
            class="relative flex flex-col items-center justify-center overflow-hidden text-black bg-white custom-transition card-transform reg-size rounded-3xl dark:bg-gray6 dark:text-white"
        >
            <div class="w-48">
                <img
                    src="@/assets/images/no-restaurant-visited-red.svg"
                    alt="No recently visited restaurants"
                />
            </div>
            <div class="pt-5 text-base mobile:text-xl">
                {{ message }}
            </div>
            <router-link to="/" v-show="isLinkToHomeVisible">
                <button
                    class="flex flex-row items-center gap-2 px-6 py-3 mt-3 text-white shadow outline-none bg-red dark:bg-red dark:text-white active:bg-gray-700 rounded-xl hover:shadow-2xl focus:outline-none"
                    type="button"
                >
                    <div class="flex items-center">
                        <unicon
                            name="home"
                            width="30px"
                            height="30px"
                            fill="white"
                        />
                    </div>
                    Keep exploring!
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NoItemInListCard",
    props: {
        message: String,
        isLinkToHomeVisible: Boolean,
    },
};
</script>

<style scoped>
.reg-size {
    width: 430px;
    height: 360px;
}

.custom-transition {
    transition: ease-in-out 300ms;
}
.card-transform {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 480px) {
    .reg-size {
        height: 85vw;
        width: 85vw;
    }
}
</style>
