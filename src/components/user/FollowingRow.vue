<template>
    <div class="mt-14">
        <div
            class="pl-6 -mb-8 text-3xl font-extrabold text-black dark:text-white"
        >
            Following
        </div>
        <div
            class="flex flex-row gap-6 media-scroller-container"
            v-if="following !== null && following.length !== 0"
            :id="'followingRow'"
        >
            <div
                class="p-1 snaps-inline media-scroller-element"
                v-for="followingUser in following"
                :key="followingUser.id"
            >
                <FollowCard
                    :pageUserId="userId"
                    :cardUserId="followingUser.id"
                    :isFollowingRow="true"
                    @refresh="refresh"
                />
            </div>
        </div>
        <div v-else class="flex flex-row gap-6 media-scroller-container">
            <NoItemInListCard
                class="p-1 snaps-inline media-scroller-element"
                :message="'No one follows yet'"
                :isLinkToHomeVisible="false"
            />
        </div>
    </div>
</template>

<script>
import FollowCard from "./FollowCard.vue";
import NoItemInListCard from "./NoItemInListCard.vue";
export default {
    name: "FollowingRow",
    components: {
        FollowCard,
        NoItemInListCard,
    },
    props: {
        userId: String,
        following: Array,
    },
    methods: {
        refresh(newUserData) {
            this.$emit("refresh", newUserData);
        },
        scrollToFront() {
            const scrollableArea = document.getElementById("followingRow");
            if (scrollableArea) {
                scrollableArea.scrollTo({
                    top: window.scrollY,
                    left: 0,
                });
            }
        },
    },
    watch: {
        userId: function (newValue, oldValue) {
            this.scrollToFront();
        },
        following: function (newValue, oldValue) {
            this.scrollToFront();
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

.snaps-inline {
    scroll-snap-align: start;
}

@media (pointer: coarse), screen and (max-width: 768px) {
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
