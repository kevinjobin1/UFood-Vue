<template>
    <div>
        <div v-if="isConfirmationPopInVisible">
            <ConfirmationPopIn
                :message="'Delete this Favorites list'"
                @confirm="deleteList"
                @cancel="toggleConfirmationPopInVisibility"
            />
        </div>
        <div
            class="mt-16"
            v-if="favorites != null && restaurantIDsList != null"
        >
            <div
                class="flex flex-row items-center pl-4 -mb-8 text-2xl text-black dark:text-white"
            >
                <input
                    v-if="isUpdatingName"
                    type="text"
                    autocomplete="off"
                    id="listNameInput"
                    @blur="saveNameEdit"
                    @keyup.enter="saveNameEdit"
                    v-model="newName"
                    class="dark:bg-gray7"
                />
                <div v-else>
                    {{ newName }}
                </div>
                <unicon
                    class="pl-2 text-black fill-current c-icon-button dark:text-white"
                    name="pen"
                    v-if="$isLoggedUserPage"
                    @click="enableNameEdit"
                />
                <unicon
                    class="pl-2 text-black fill-current c-icon-button dark:text-white"
                    name="book-medical"
                    v-if="$isLoggedUserPage"
                    @click="scrollToEnd"
                />
                <unicon
                    class="pl-2 text-black fill-current c-icon-button dark:text-white"
                    name="trash-alt"
                    v-if="$isLoggedUserPage"
                    @click="toggleConfirmationPopInVisibility"
                />
            </div>
            <div
                class="flex flex-row gap-6 media-scroller-container"
                :id="favorites.id"
            >
                <FavoriteCard
                    class="p-1 snaps-inline media-scroller-element"
                    v-for="(favoriteRestoId, index) in restaurantIDsList"
                    :key="favoriteRestoId + index"
                    :favoriteRestoID="favoriteRestoId"
                    :favoriteListID="favorites.id"
                />
                <AddRestoToFavorites
                    class="p-1 snaps-inline media-scroller-element"
                    :favoritesListId="favorites.id"
                    v-if="$isLoggedUserPage"
                    @refresh="notifyOfNeedToRefresh"
                />
                <NoItemInListCard
                    class="p-1 snaps-inline media-scroller-element"
                    v-else-if="restaurantIDsList.size === 0"
                    :message="'No restaurant in this list yet'"
                    :isLinkToHomeVisible="false"
                />
            </div>
        </div>
    </div>
</template>

<script>
import FavoriteCard from "./FavoriteCard.vue";
import AddRestoToFavorites from "./AddRestoToFavorites.vue";
import ConfirmationPopIn from "../common/ConfirmationPopIn.vue";
import NoItemInListCard from "./NoItemInListCard.vue";
import {
    updateFavoritesList,
    deleteFavoritesList,
} from "../../api/user/userAPI.js";

export default {
    name: "FavoritesRow",
    props: ["favoritesData"],
    components: {
        FavoriteCard,
        ConfirmationPopIn,
        AddRestoToFavorites,
        NoItemInListCard,
    },
    data: () => {
        return {
            restaurantIDsList: null,
            favorites: null,
            isUpdatingName: false,
            newName: null,
            isConfirmationPopInVisible: false,
            currentScroll: null,
        };
    },
    mounted() {
        this.setFavoritesData();
    },
    methods: {
        setFavoritesData() {
            if (this.variableExists(this.favoritesData)) {
                this.favorites = this.favoritesData;
                this.newName = this.favorites.name;
                //uses set to remove duplicatas
                this.restaurantIDsList = new Set();
                for (const resto of this.favoritesData.restaurants) {
                    this.restaurantIDsList.add(resto.id);
                }
            }
        },
        variableExists(varToTest) {
            return typeof varToTest != "undefined" && varToTest != null;
        },
        enableNameEdit() {
            this.isUpdatingName = true;
            setTimeout(() => {
                document.getElementById("listNameInput").focus();
            }, 1);
        },
        disableNameEdit() {
            this.isUpdatingName = false;
        },
        async saveNameEdit() {
            this.disableNameEdit();
            this.newName = this.newName.trim();
            if (
                this.newName.length !== 0 &&
                this.newName !== this.favorites.name
            ) {
                try {
                    await updateFavoritesList(
                        this.favorites.id,
                        this.newName,
                        this.favorites.owner
                    );
                    this.favorites.name = this.newName;
                } catch (error) {
                    this.newName = this.favorites.name;
                }
            } else {
                this.newName = this.favorites.name;
            }
        },
        toggleConfirmationPopInVisibility() {
            this.isConfirmationPopInVisible = !this.isConfirmationPopInVisible;
            if (this.isConfirmationPopInVisible) {
                this.currentScroll = window.scrollY;
            } else {
                document.body.style.position = "";
                window.scrollTo(window.scrollX, this.currentScroll);
            }
        },
        async deleteList() {
            this.toggleConfirmationPopInVisibility();

            await deleteFavoritesList(this.favorites.id);

            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        },
        scrollToEnd() {
            const scrollableArea = document.getElementById(this.favorites.id);
            scrollableArea.scrollTo({
                top: window.scrollY,
                left: scrollableArea.scrollWidth,
                behavior: "smooth",
            });
        },
        notifyOfNeedToRefresh() {
            this.$emit("refresh");
        },
    },
};
</script>

<style scoped>
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

@media (pointer: coarse), screen and (max-width: 768px) {
    .media-scroller-element {
        min-height: 360px;
        max-height: 360px;
    }
}

.snaps-inline {
    scroll-snap-align: start;
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

.c-icon-button:hover {
    transform: scale(1.1);
    cursor: pointer;
}
</style>
