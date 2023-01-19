<template>
    <div class="mb-16">
        <div
            class="flex flex-col items-center justify-center w-screen h-screen bg-white dark:bg-gray7 background-transition"
        >
            <UserCard
                v-if="userProfileData != null"
                :user="userProfileData"
                :isUserInitiallyFollowed="isUserAlreadyFollowed"
            />
            <div
                class="absolute flex flex-col items-center bottom-6 c-arrow-scroller"
            >
                <v-icon
                    width="20"
                    height="27"
                    name="arrow-down"
                    class="arrow-icon"
                />
            </div>
        </div>
        <div>
            <VisitsRow :userId="pageUserId" />
        </div>
        <div class="flex justify-center">
            <div class="w-2/3 pt-10"><DropDown /></div>
        </div>
        <div>
            <FollowingRow
                :following="followingData"
                :userId="pageUserId"
                :key="followingData.length"
                @refresh="updateFollowersRow"
            />
        </div>
        <div>
            <FollowersRow
                :followers="followersData"
                :userId="pageUserId"
                :key="followersData.length"
                @refresh="updateFollowingRow"
            />
        </div>
        <div>
            <UserFavorites
                :userId="pageUserId"
                :userEmail="userProfileData.email"
            />
        </div>
    </div>
</template>

<script>
import { getUserData } from "../api/user/userAPI.js";
import { getUserWithToken } from "../api/account/accountAPI.js";
import UserCard from "../components/user/UserCard.vue";
import UserFavorites from "../components/user/UserFavorites.vue";
import VisitsRow from "../components/user/VisitsRow.vue";
import DropDown from "../components/common/DropDown.vue";
import FollowersRow from "../components/user/FollowersRow.vue";
import FollowingRow from "../components/user/FollowingRow.vue";
const Cookies = require("js-cookie");

export default {
    name: "User",
    components: {
        VisitsRow,
        UserFavorites,
        UserCard,
        DropDown,
        FollowersRow,
        FollowingRow,
    },
    data: () => {
        return {
            pageUserId: null,
            userProfileData: { rating: "", name: "", email: "", id: "" },
            followingData: [],
            followersData: [],
            isUserAlreadyFollowed: false,
        };
    },
    async mounted() {
        if (this.$route.path == "/user") {
            const user = await getUserWithToken(Cookies.get("access_token"));
            this.$isUserSignedIn = true;
            this.$userId = user.id;
        }
        window.scrollTo(0, 0);
        this.setPageUserId();
        this.getUserInfo();
    },
    methods: {
        setPageUserId() {
            if (this.$route.path == "/user") {
                this.$isLoggedUserPage = true;
                this.pageUserId = this.$userId;
            } else if (this.$route.params.userId == this.$userId) {
                this.$router.push("/user");
                this.$isLoggedUserPage = true;
                this.pageUserId = this.$userId;
            } else {
                this.$isLoggedUserPage = false;
                this.pageUserId = this.$route.params.userId;
            }
        },
        async getUserInfo() {
            const userData = await getUserData(this.pageUserId);
            this.userProfileData = {
                rating: userData.rating,
                name: userData.name,
                email: userData.email,
                id: userData.id,
            };
            this.followingData = userData.following;
            this.followersData = userData.followers;
            this.pageUserId = userData.id;

            this.findFollowedBackFollowers();

            if (this.isFollowedByLoggedUser()) {
                this.isUserAlreadyFollowed = true;
            } else {
                this.isUserAlreadyFollowed = false;
            }
        },
        updateFollowersRow(newUserData) {
            this.followersData = {};
            this.followingData = newUserData.following;
            this.followersData = newUserData.followers;
            this.findFollowedBackFollowers();
        },
        updateFollowingRow(newUserData) {
            this.followingData = {};
            this.followingData = newUserData.following;
        },
        isFollowedByLoggedUser() {
            const matchingUsers = this.followersData.filter(
                (user) => user.id == this.$userId
            );
            return matchingUsers.length > 0;
        },
        findFollowedBackFollowers() {
            const followingUsersIds = this.followingData.map((user) => user.id);
            for (let follower of this.followersData) {
                if (followingUsersIds.includes(follower.id)) {
                    follower.isAlreadyFollowed = true;
                } else {
                    follower.isAlreadyFollowed = false;
                }
            }
        },
    },
    watch: {
        "$route.path": async function (newPath, oldPath) {
            this.setPageUserId();
            this.getUserInfo();
            window.scrollTo(0, 0);
        },
    },
};
</script>

<style>
@media screen and (max-width: 768px) {
    .home-size svg {
        width: 35px;
        height: 35px;
    }
}

.c-scale {
    transition: all 0.3s;
}

.c-scale:hover {
    transform: scale(1.02);
}

.c-arrow-scroller > svg {
    fill: rgb(85, 83, 119) !important;
}

.c-arrow-scroller {
    animation: 1.3s arrow-scroll ease-in-out infinite;
}
@keyframes arrow-scroll {
    0% {
        transform: translateY(0px);
    }
    40% {
        transform: translateY(9px);
    }
    50% {
        transform: translateY(9px);
    }
    60% {
        transform: translateY(9px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>
