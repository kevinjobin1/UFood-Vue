<template>
    <div>
        <div
            class="flex flex-row items-center mt-16 mb-8 ml-4 text-3xl font-extrabold text-black dark:text-white"
        >
            Favorites Lists
            <unicon
                class="ml-2 text-black fill-current c-icon-button dark:text-white"
                name="plus"
                v-if="$isLoggedUserPage"
                @click="addFavRow"
            />
        </div>
        <div v-if="favoritesLists != null" :key="triggeredReload">
            <FavoritesRow
                v-for="favoriteList in favoritesLists"
                :key="favoriteList.id"
                :favoritesData="favoriteList"
                @refresh="getFavoritesListsData"
            />
            <NoItemInListCard
                class="p-1 pl-6 snaps-inline media-scroller-element"
                v-if="favoritesLists.length === 0"
                :message="'No favorites lists yet'"
                :isLinkToHomeVisible="false"
            />
        </div>
    </div>
</template>

<script>
import FavoritesRow from "./FavoritesRow.vue";
import NoItemInListCard from "./NoItemInListCard.vue";
import {
    getFavoritesLists,
    createFavoritesList,
} from "../../api/user/userAPI.js";

export default {
    name: "UserFavorites",
    components: {
        FavoritesRow,
        NoItemInListCard,
    },
    props: {
        userId: String,
        userEmail: String,
    },
    data: () => {
        return {
            favoritesLists: null,
            triggeredReload: false,
        };
    },
    mounted() {
        this.getFavoritesListsData();
    },
    methods: {
        async getFavoritesListsData() {
            this.favoritesLists = await getFavoritesLists(this.userId);
            this.favoritesLists.reverse();
            this.triggeredReload = !this.triggeredReload;
        },
        async addFavRow() {
            await createFavoritesList("New favorites list", this.userEmail);
            this.getFavoritesListsData();
            this.$newListCreatedCounter = new Date().valueOf();
            this.$newListCreatedHasAlertedOnce = true;
        },
    },
    watch: {
        userId: function (newValue, oldValue) {
            this.getFavoritesListsData();
        },
    },
};
</script>

<style>
.c-icon-button:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.snaps-inline {
    scroll-snap-align: start;
}

.media-scroller-element:active {
    cursor: grabbing;
}

@media (pointer: coarse), screen and (max-width: 768px) {
    .media-scroller-element {
        min-height: 360px;
        max-height: 360px;
    }
}
</style>
