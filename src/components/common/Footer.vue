<template>
    <div
        class="mx-auto background-transition w-screen h-full bg-white dark:bg-gray7"
    >
        <div
            class="pt-10 sm:pt-30 pb-8 border-t-2 border-gray1 dark:border-gray1"
        >
            <div
                class="flex flex-col justify-center items-center mb-12 sm:mb-20"
            >
                <p
                    class="text-3xl sm:text-4xl font-semibold text-gray7 dark:text-white mb-5"
                >
                    GLO-3102
                </p>
                <ul class="flex gap-4 sm:gap-8">
                    <a
                        v-for="item in github"
                        :key="item.id"
                        :href="item.url"
                        target="__blank"
                        class="text-gray4 hover:text-gray6 dark:hover:text-gray1 cursor-pointer rounded-lg bg-yellow dark:bg-red hover:bg-gray3 dark:hover:bg-gray3 shadow-lg p-4 duration-500"
                    >
                        <unicon name="github" fill="white"></unicon>
                    </a>
                </ul>
            </div>
            <div class="flex justify-center items-center text-center">
                <div class="text-lg text-gray7 dark:text-white">
                    &copy; {{ projectName }} {{ copyrightDate }} by {{ author }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script>
export default {
    components: {},
    data() {
        return {
            github: [
                {
                    id: 1,
                    name: "GitHub",
                    icon: "github",
                    url: "https://github.com/GLO3102",
                },
            ],
            copyrightDate: new Date().getFullYear(),
            projectName: "UFood",
            author: "Team 03",
        };
    },
    mounted() {},
    updated() {},
};
</script>
