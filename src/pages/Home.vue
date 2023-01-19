<template>
    <div
        class="flex flex-col items-center background-transition mx-auto bg-white dark:bg-gray7"
    >
        <HomeBanner class="viewportHeight pt-20 ml-14 mr-14" />
        <HomeSearchContainer
            :areCardsWithRouterLink="true"
            :containerHeaderText="homeSearchContainerHeaderText"
        />
    </div>
</template>

<style>
.viewportHeight {
    height: 100vh;
    min-height: fit-content;
}
@media screen and(max-width: 1024px) {
    .viewportHeight {
        min-height: 800px !important;
    }
}
</style>

<script>
import HomeSearchContainer from "../components/home/HomeSearchContainer.vue";
import HomeBanner from "../components/home/HomeBanner.vue";

export default {
    name: "Home",
    components: {
        HomeBanner,
        HomeSearchContainer,
    },
    data: () => {
        return {
            homeSearchContainerHeaderText: "Browse Restaurants",
        };
    },
    mounted() {
        if (this.$route.query.scroll) {
            setTimeout(() => {
                window.scrollTo(0, 0);
                let el = document.getElementsByClassName(
                    "restaurant-search-container"
                )[0];
                el.scrollIntoView({ behavior: "smooth" });
            }, 200);
        } else {
            window.scrollTo(0, 0);
        }
        window.scrollTo(0, 0);
    },
};
</script>
