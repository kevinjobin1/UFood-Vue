<template>
    <div>
        <div v-if="isConfirmationPopInVisible">
            <ConfirmationPopIn
                :message="confirmationPopInMessage"
                @confirm="doFollowAction"
                @cancel="toggleConfirmationPopInVisibility"
            />
        </div>
        <div class="flex flex-col items-center">
            <div
                class="flex flex-row items-center pt-2 text-3xl text-black dark:text-white dark:border-white background-transition"
            >
                <div class="font-extrabold pt-1/2">
                    Score : {{ user.rating }}
                </div>
                <unicon class="pl-1 scale-200 c-icons-color" name="star" />
            </div>
            <div class="flex flex-col items-center justify-center gap-8 mt-4">
                <img
                    :src="this.gravatarLink"
                    alt=""
                    class="object-cover rounded-full c-img-style border-red"
                />
                <div
                    v-if="!$isLoggedUserPage && $isUserSignedIn"
                    @click="toggleConfirmationPopInVisibility"
                    class="cursor-pointer px-6 py-3 mb-1 mr-3 text-sm font-bold text-white shadow outline-none whitespace-nowrap bg-red background-transition active:bg-gray-700 rounded-2xl hover:shadow-2xl focus:outline-none"
                >
                    {{ FollowOrUnFollowMessage }}
                </div>
                <div
                    class="flex flex-col items-center text-2xl text-black truncate sm:text-5xl dark:text-white background-transition"
                >
                    <div :style="myStyle" class="mr-2 c-translate-left">
                        Discover what
                    </div>
                    <div class="text-4xl sm:text-7xl c-max-width">
                        <span class="text-red">{{ user.name }}</span
                        >'s
                    </div>
                    <div :style="myStyle" class="c-translate-right">
                        favorite places are...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const md5 = require("md5");
import ConfirmationPopIn from "../common/ConfirmationPopIn.vue";
import { followUser, unfollowUser } from "../../api/user/userAPI.js";

export default {
    name: "UserCard",
    props: { user: Object, isUserInitiallyFollowed: Boolean },
    components: {
        ConfirmationPopIn,
    },
    data: function () {
        return {
            lastScrollY: 0,
            gravatarLink: "",
            confirmationPopInMessage: "Are you sure?",
            isConfirmationPopInVisible: false,
            isUserAlreadyFollowed: this.isUserInitiallyFollowed,
            FollowOrUnFollowMessage: "Follow",
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        this.getGravatarLink();
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll(event) {
            //if in User Card range
            if (window.scrollY < window.innerHeight) {
                this.lastScrollY = window.scrollY;
            }
        },
        getHashedEmail() {
            return md5(this.user.email.toLowerCase());
        },
        getGravatarLink() {
            this.gravatarLink = `https://www.gravatar.com/avatar/${this.getHashedEmail()}?s=2048
            &d=https%3A%2F%2Fi.postimg.cc%2FDm3w4YJ9%2Fuser-default-image.png`;
        },
        doFollowAction() {
            this.toggleConfirmationPopInVisibility();
            if (this.isUserAlreadyFollowed) {
                this.unfollowUser();
            } else {
                this.followUser();
            }
        },
        async followUser() {
            const newUserData = await followUser(this.user.id);
            this.isUserAlreadyFollowed = true;
            this.FollowOrUnFollowMessage = this.isUserAlreadyFollowed
                ? "Unfollow"
                : "Follow";
            this.$followNotificationCounter = new Date().valueOf();
            this.$followNotificationHasAlertedOnce = true;
        },
        async unfollowUser() {
            const newUserData = await unfollowUser(this.user.id);
            this.isUserAlreadyFollowed = false;
            this.FollowOrUnFollowMessage = this.isUserAlreadyFollowed
                ? "Unfollow"
                : "Follow";
            this.$unfollowNotificationCounter = new Date().valueOf();
            this.$unfollowNotificationHasAlertedOnce = true;
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
    },
    computed: {
        myStyle() {
            return {
                "--custom-padding": this.lastScrollY + "px",
            };
        },
    },
    watch: {
        isUserInitiallyFollowed(newValue) {
            this.isUserAlreadyFollowed = newValue;
            this.FollowOrUnFollowMessage = newValue ? "Unfollow" : "Follow";
        },
        "user.email"(newValue) {
            this.getGravatarLink();
        },
    },
};
</script>

<style>
.c-img-style {
    width: 35vh;
    height: 35vh;
    border-width: 8px;
}
@media screen and (max-width: 400px) {
    .c-img-style {
        width: 75vw;
        height: 75vw;
        border-width: 6px;
    }
}
.c-icons-color {
    fill: #ffae00;
}
.c-translate-left {
    padding-right: var(--custom-padding);
}
.c-translate-right {
    padding-left: var(--custom-padding);
}
.c-max-width {
    max-width: 90vw;
    white-space: break-spaces;
    text-align: center;
}
</style>
