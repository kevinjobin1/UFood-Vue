<template>
    <div class="flex h-full main-container">
        <div
            :class="[onLogin ? 'text-section' : 'red-gradient red-section']"
            class="relative w-1/2 flex justify-center items-center"
        >
            <div v-if="onLogin" class="flex items-center flex-col">
                <span
                    class="text-4xl text-black mb-10 font-bold text-center dark:text-white"
                    >Welcome back !</span
                >
                <input
                    placeholder="Email"
                    class="bg-gray0 rounded input"
                    type="text"
                    id="emailLogin"
                />
                <div class="relative">
                    <input
                        placeholder="Password"
                        class="bg-gray0 rounded input"
                        :type="passwordHidden ? 'password' : 'text'"
                        id="passwordLogin"
                    />
                    <unicon
                        :class="[passwordHidden ? '' : 'passwordIconDisplay']"
                        v-on:click="passwordHidden = !passwordHidden"
                        class="absolute passwordIcon bottom-1/3 right-6"
                        name="eye-slash"
                        width="26"
                        height="26"
                    />
                    <unicon
                        :class="[passwordHidden ? 'passwordIconDisplay' : '']"
                        v-on:click="passwordHidden = !passwordHidden"
                        class="absolute passwordIcon bottom-1/3 right-6"
                        name="eye"
                        width="26"
                        height="26"
                    />
                </div>
                <button
                    class="border-solid w-1/2 sign-in-button shadow-lg mt-6 mb-4 text-xl rounded-xl text-white bg-red"
                    v-on:click="signInEvent"
                >
                    Sign in
                </button>
                <div class="separator w-5/6"></div>
                <button
                    v-on:click="onLogin = !onLogin"
                    class="sign-in-button text-sm rounded-xl text-black dark:text-white"
                >
                    Create an account
                </button>
                <span
                    :class="[errorLoginDisplayed ? 'displayed' : '']"
                    class="opacity-0 transition-opacity pr-6 pl-6 text-center text-red text-xl"
                    >Email or password does not match.</span
                >
            </div>
            <div v-else class="flex flex-col">
                <span class="text-3xl w-80 text-gray0 mb-10"
                    >Find all the restaurants you need, in one place.</span
                >
            </div>
        </div>
        <div
            :class="[onLogin ? 'red-gradient red-section' : ' text-section']"
            class="w-1/2 flex justify-center items-center"
        >
            <div v-if="onLogin" class="flex flex-col items-center">
                <span class="text-3xl w-80 text-gray0 mb-10"
                    >To keep connected with us, please login with your personal
                    info</span
                >
            </div>
            <div v-else class="flex flex-col items-center">
                <span
                    class="text-4xl text-black mb-10 font-bold text-center dark:text-white"
                    >Create your account !</span
                >
                <input
                    placeholder="Name"
                    class="bg-gray0 rounded input"
                    type="text"
                    id="nameSignup"
                />

                <input
                    placeholder="Email"
                    class="bg-gray0 rounded input"
                    type="text"
                    id="emailSignup"
                />
                <div class="relative">
                    <input
                        placeholder="Password"
                        class="bg-gray0 rounded input"
                        :type="passwordHidden ? 'password' : 'text'"
                        id="passwordSignup"
                    />
                    <unicon
                        :class="[passwordHidden ? '' : 'passwordIconDisplay']"
                        v-on:click="passwordHidden = !passwordHidden"
                        class="absolute passwordIcon bottom-1/3 right-6"
                        name="eye-slash"
                        width="26"
                        height="26"
                    />
                    <unicon
                        :class="[passwordHidden ? 'passwordIconDisplay' : '']"
                        v-on:click="passwordHidden = !passwordHidden"
                        class="absolute passwordIcon bottom-1/3 right-6"
                        name="eye"
                        width="26"
                        height="26"
                    />
                </div>
                <button
                    v-on:click="signUpEvent"
                    class="border-solid w-1/2 sign-in-button text-white shadow-lg mt-6 mb-4 text-xl rounded-xl bg-red"
                >
                    Sign up
                </button>
                <div class="separator w-5/6"></div>
                <button
                    v-on:click="onLogin = !onLogin"
                    class="sign-in-button text-sm dark:text-white"
                >
                    Already have an account ?
                </button>
                <span
                    :class="[errorDisplayed ? 'displayed' : '']"
                    class="opacity-0 transition-opacity pr-6 pl-6 text-center text-red text-xl"
                    >Couldn't create an account with the credentials you
                    provided.</span
                >
            </div>
        </div>
    </div>
</template>

<script>
import { login, signup } from "../api/account/accountAPI";
import Cookies from "js-cookie";

export default {
    name: "Login",
    props: ["toLogin"],
    components: {},
    data: () => {
        return {
            errorLoginDisplayed: false,
            errorDisplayed: false,
            passwordHidden: true,
            onLogin: false,
        };
    },
    methods: {
        async signUpEvent() {
            let name = document.getElementById("nameSignup").value;
            let password = document.getElementById("passwordSignup").value;
            let email = document.getElementById("emailSignup").value;

            try {
                await signup(email, name, password);
                let loginRes = await login(email, password);
                Cookies.set("access_token", loginRes.token);
                this.$userId = loginRes.id;
                this.$isUserSignedIn = true;
                this.$loginHasAlertedOnce = true;
                this.$loginAlertCounter = new Date().valueOf();
                this.$headerKey = new Date().valueOf() * 2;
                this.$router.push("/");
            } catch {
                if (!this.errorDisplayed) {
                    setTimeout(() => {
                        this.errorDisplayed = false;
                    }, 3000);
                }
                this.errorDisplayed = true;
            }
        },
        async signInEvent() {
            let email = document.getElementById("emailLogin").value;
            let password = document.getElementById("passwordLogin").value;

            try {
                let res = await login(email, password);
                Cookies.set("access_token", res.token);
                this.$userId = res.id;
                this.$isUserSignedIn = true;
                this.$loginHasAlertedOnce = true;
                this.$loginAlertCounter = new Date().valueOf();
                this.$headerKey = new Date().valueOf() * 2;
                this.$router.push("/");
            } catch {
                if (!this.errorLoginDisplayed) {
                    setTimeout(() => {
                        this.errorLoginDisplayed = false;
                    }, 3000);
                }
                this.errorLoginDisplayed = true;
            }
        },
    },
    mounted() {
        document.documentElement.scrollTop = 0;
    },
    watch: {
        toLogin: {
            immediate: true,
            handler() {
                this.onLogin = this.toLogin;
            },
        },
    },
};
</script>

<style scoped>
.displayed {
    opacity: 1;
    transition: opacity 0.2s;
}
.main-container {
    min-height: 100vh;
}
.input {
    width: 320px;
    font-size: 19px;
    padding: 13px;
    margin: 10px;
    outline: none;
}
.sign-in-button {
    padding: 10px 15px;
    transition: 0.15s;
}
.sign-in-button:hover {
    transform: scale(1.05);
}
.img-login {
    z-index: 1;
    bottom: 0;
    left: 0;
    padding-bottom: 100px;
}
.red-gradient {
    background: linear-gradient(to right, #f74d36, #e53838);
}

.passwordIconDisplay {
    display: none;
}
.passwordIcon:hover {
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    .red-section {
        display: none;
    }
    .text-section {
        width: 100%;
    }
}
</style>
