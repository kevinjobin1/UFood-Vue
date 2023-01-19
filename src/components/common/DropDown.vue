<template>
    <div class="container">
        <div class="text-container">
            <input
                type="text"
                placeholder="Find a user..."
                class="custom-input focus:border-red dark:focus:border-yellow mobile:text-sm"
                @keyup="getUsersWithSearchInput"
                @focusin="
                    getUsersWithSearchInput();
                    showOptions();
                "
                @focusout="hideOptions"
                v-model="searchUser"
            />
            <span class="close">
                <unicon
                    width="25"
                    height="25"
                    class="fill-current hover:text-red"
                    name="x"
                    @click="
                        eraseTextWhenXClicked();
                        hideOptions();
                    "
                />
            </span>
        </div>

        <div class="choices_container invisible bg-red dark:bg-yellow">
            <div class="choices">
                <div class="not-found hidden hover:bg-yellow">
                    Meme cannot be found :(
                </div>
                <div
                    v-for="user in this.users"
                    :key="user.id"
                    class="choice hover:bg-yellow dark:hover:bg-red text-ellipsis overflow-hidden"
                    @mousedown="redirect(user.id)"
                >
                    {{ user.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUsersWithString } from "../../api/user/userAPI.js";

export default {
    name: "DropDown",
    data() {
        return {
            users: [],
            searchUser: "",
        };
    },
    methods: {
        showOptions() {
            const choices_container =
                document.querySelector(".choices_container");
            choices_container.classList.remove("invisible");
        },
        hideOptions() {
            const choices_container =
                document.querySelector(".choices_container");
            choices_container.classList.add("invisible");
            this.users = [];
        },
        eraseTextWhenXClicked() {
            this.searchUser = "";
            getUsersWithString("");
        },
        async getUsersWithSearchInput() {
            this.users = (await getUsersWithString(this.searchUser)).items;
        },
        redirect(userId) {
            this.$router.push({
                name: "User",
                params: { userId: userId },
            });
            this.searchUser = "";
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;

    align-items: center;
}

/* TEXT INPUT */

.text-container {
    position: relative;
    display: flex;
    flex-direction: row;

    width: 100%;

    align-items: center;
}

.close {
    display: flex;
    align-items: center;
    position: absolute;

    right: 1rem;

    z-index: 41;

    transform: scale(1.4);
}

.close:hover {
    cursor: pointer;
}

.custom-input {
    font-size: 2rem;
    width: 100%;
    height: 3rem;

    padding-left: 1rem;
    padding-right: 2.5rem;

    border: 0.2rem solid rgba(0, 0, 0, 0.7);
    border-radius: 1rem;

    box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.6);

    z-index: 41;
}

.custom-input:focus {
    outline: none;
}

.choices_container {
    position: relative;
    margin-top: -1rem;
    width: 100%;
    height: fit-content;
    max-height: 20rem;

    overflow-y: auto;

    z-index: 40;

    border-radius: 0.5rem;
}

.choices {
    width: 100%;
    height: 100%;
    margin-top: 2rem;
}

.choice {
    width: 100%;
    height: 100%;

    font-size: 1.5rem;

    padding: 1rem;

    z-index: 42;
}

.choice:hover {
    cursor: pointer;

    pointer-events: all;
}

.not-found {
    font-size: 1.5rem;

    padding: 1rem;
}

.hidden {
    /* To make the choice boxes not stay in the pink container */
    position: absolute;
    top: 0%;
    opacity: 0;
    pointer-events: none;
}

.invisible {
    opacity: 0;
    pointer-events: none;
}
</style>
