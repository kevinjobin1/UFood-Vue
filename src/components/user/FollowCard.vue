<template>
    <div>
        <div v-if="isConfirmationPopInVisible" class="remove-parent-styling">
            <ConfirmationPopIn
                :message="confirmationPopInMessage"
                @confirm="doFollowAction"
                @cancel="toggleConfirmationPopInVisibility"
            />
        </div>
        <div
            class="relative overflow-hidden text-black bg-white cursor-pointer reg-size custom-transition card-transform rounded-3xl dark:bg-gray6 dark:text-white"
        >
            <router-link
                :to="{ path: `/user/${cardUserId}` }"
                class=""
                id="card"
            >
                <div
                    class="flex flex-col gap-2 items-center font-bold text-2xl pt-10"
                >
                    <img
                        :src="this.gravatarLink"
                        alt=""
                        class="c-img-style object-cover rounded-full border-red"
                    />
                    <div>{{ username }}</div>
                    <div class="flex flex-row">
                        <div class="">{{ rating }}</div>
                        <unicon class="pl-1 pt-0.5 c-icons-color" name="star" />
                    </div>
                </div>
            </router-link>
            <div
                class="cursor-pointer justify-center flex flex-row"
                v-if="$isLoggedUserPage"
            >
                <div
                    v-if="isAlreadyFollowedBack || isNowFollowedBack"
                    :key="refresh"
                    class="bg-gray1 cursor-default text-center rounded-2xl w-2/3 p-2 text-sm font-bold"
                >
                    <div>Already following back</div>
                </div>
                <div
                    v-else
                    @click="toggleConfirmationPopInVisibility"
                    class="bg-red text-center rounded-2xl w-1/3 p-2 text-sm font-bold hover:shadow-2xl"
                >
                    <div>{{ buttonMessage }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const md5 = require("md5");
import {
    getUserData,
    followUser,
    unfollowUser,
} from "../../api/user/userAPI.js";
import ConfirmationPopIn from "../common/ConfirmationPopIn.vue";

export default {
    name: "FollowCard",
    props: {
        pageUserId: String,
        cardUserId: String,
        isFollowingRow: Boolean,
        isAlreadyFollowedBack: Boolean,
    },
    components: { ConfirmationPopIn },
    data: () => {
        return {
            confirmationPopInMessage: "Are you sure?",
            buttonMessage: "",
            currentScroll: null,
            isConfirmationPopInVisible: false,
            isNowFollowedBack: false,
            username: null,
            rating: null,
            email: null,
            gravatarLink: "",
            refresh: false,
        };
    },
    mounted() {
        this.setup();
        this.getUserRating();
    },
    methods: {
        setup() {
            if (this.isFollowingRow) {
                this.confirmationPopInMessage = "Unfollow this user?";
                this.buttonMessage = "Unfollow";
            } else {
                this.confirmationPopInMessage = "Follow back this user?";
                this.buttonMessage = "Follow back";
            }
        },
        async getUserRating() {
            const userData = await getUserData(this.cardUserId);
            this.username = userData.name;
            this.rating = userData.rating;
            this.email = userData.email;
            this.getGravatarLink();
        },
        doFollowAction() {
            this.toggleConfirmationPopInVisibility();
            if (this.isFollowingRow) {
                this.unfollowUser();
            } else {
                this.followUser();
            }
        },
        async followUser() {
            const newUserData = await followUser(this.cardUserId);
            this.$emit("refresh", newUserData);
            this.isNowFollowedBack = true;
            this.$followNotificationCounter = new Date().valueOf();
            this.$followNotificationHasAlertedOnce = true;
        },
        async unfollowUser() {
            const newUserData = await unfollowUser(this.cardUserId);
            this.$emit("refresh", newUserData);
            this.$unfollowNotificationCounter = new Date().valueOf();
            this.$unfollowNotificationHasAlertedOnce = true;
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
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
        getHashedEmail() {
            return md5(this.email.toLowerCase());
        },
        getGravatarLink() {
            this.gravatarLink = `https://www.gravatar.com/avatar/${this.getHashedEmail()}?s=2048
            &d=https%3A%2F%2Fi.postimg.cc%2FDm3w4YJ9%2Fuser-default-image.png`;
        },
    },
    watch: {
        isAlreadyFollowedBack(newValue) {
            this.isNowFollowedBack = false;
            this.refresh = !this.refresh;
        },
    },
};
</script>

<style scoped>
.c-img-style {
    width: 40%;
    height: 40%;
    border-width: 4px;
}
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
.card-transform:hover {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
}

.icons-color {
    fill: #ffae00;
}

@media screen and (max-width: 480px) {
    .reg-size {
        height: 85vw;
        width: 85vw;
    }
}
</style>
