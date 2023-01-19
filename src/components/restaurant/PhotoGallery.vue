<template>
    <div class="h-64 my-2">
        <div
            class="customImage-container flex gap-3 pb-3 overflow-x-auto h-full w-full"
        >
            <img
                v-for="image in restaurant.pictures.slice(1, -1)"
                :key="image"
                :src="image"
                alt="restaurant image"
                class="w-auto h-full rounded-lg"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "PhotoGallery",
    props: ["restaurant"],
    components: {},
};
</script>

<style scoped>
.customImage-container::-webkit-scrollbar {
    width: 7px;
    height: 8px;
}
.customImage-container::-webkit-scrollbar-thumb {
    background-color: rgba(86, 86, 86, 0.7);
    border-radius: 10px;
}

.customImage-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(86, 86, 86, 1);
}
</style>
