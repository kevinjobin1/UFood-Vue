<template>
    <div>
        <div
            class="flex flex-col items-center gap-2 pt-10 text-4xl bg-white shadow-2xl pop-in-container dark:bg-gray7 rounded-3xl dark:text-white"
        >
            <div class="p-5 text-xl">
                {{ message }}
            </div>
            <div class="flex flex-row flex-wrap gap-4">
                <button
                    class="px-6 py-3 mb-1 mr-3 text-sm font-bold text-white uppercase shadow outline-none whitespace-nowrap bg-red background-transition active:bg-gray-700 rounded-2xl hover:shadow-2xl focus:outline-none"
                    type="button"
                    @click="cancel()"
                >
                    Cancel
                </button>
                <button
                    class="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase shadow outline-none whitespace-nowrap bg-yellow background-transition active:bg-gray-700 rounded-2xl hover:shadow-2xl focus:outline-none"
                    type="button"
                    @click="confirm()"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ConfirmationPopIn",
    props: { message: String },
    components: {},
    data: () => {
        return {};
    },
    methods: {
        cancel() {
            this.$emit("cancel");
        },
        confirm() {
            this.$emit("confirm");
        },
    },
};
</script>

<style scoped>
.pop-in-container {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    height: fit-content;
    padding: 2rem 0;
    position: fixed;
    z-index: 9999;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
}

@media screen and (max-width: 768px) {
    .pop-in-container {
        width: 100vw;
        height: 100vh;
        padding: 2rem 0;

        border-radius: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
