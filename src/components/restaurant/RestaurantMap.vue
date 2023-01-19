<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-center rounded-lg mx-auto">
            <div class="text-2xl text-center pl-5 pr-2 font-medium">
                {{ restaurant.address }}
            </div>
            <a
                target="_blank"
                class="flex items-center -mt-2"
                :href="`https://www.google.com/maps/dir//${restaurant.address}}`"
            >
                <unicon
                    class="direction-icon-color"
                    height="50px"
                    width="50px"
                    name="directions"
                />
            </a>
        </div>
        <div class="flex justify-center">
            <GmapMap
                :center="{
                    lng: restaurant.location.coordinates[0],
                    lat: restaurant.location.coordinates[1],
                }"
                :zoom="15"
                class="c-google-map"
            >
                <GmapMarker
                    :position="{
                        lng: restaurant.location.coordinates[0],
                        lat: restaurant.location.coordinates[1],
                    }"
                />
            </GmapMap>
        </div>
    </div>
</template>

<script>
export default {
    name: "RestaurantMap",
    props: ["restaurant"],
    components: {},
};
</script>

<style>
.c-google-map {
    width: 100%;
    height: 20rem;
}

.direction-icon-color {
    fill: #e5383b;
}

@media (min-width: 1280px) {
    .c-google-map {
        height: 40rem;
    }
}
</style>
