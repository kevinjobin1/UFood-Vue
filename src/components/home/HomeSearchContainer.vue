<template>
    <div class="flex justify-center pt-44">
        <div
            v-bind:class="{ visible: filterShown }"
            class="fixed flex flex-col p-5 bg-white opacity-0 filterer w-80"
        >
            <div
                class="absolute cursor-pointer top-2 right-3"
                v-on:click="toggleFilterVisibility"
            >
                <unicon width="25" height="25" class="" name="x" />
            </div>
            <span class="pt-0 pb-1 text-center sub-filter">Genre</span>
            <div class="flex pt-1 pb-4">
                <div
                    class="w-full h-32 p-2 overflow-x-hidden overflow-y-scroll genres-container"
                >
                    <div v-for="genre in allGenres" :key="genre">
                        <label
                            class="flex items-center gap-x-2"
                            id="checkbox-filter"
                        >
                            <input
                                :checked="chosenGenres.indexOf(genre) != -1"
                                type="checkbox"
                                class="checkbox"
                                @change="updateGenres(genre)"
                            />
                            <span class="check-box-label">{{ genre }}</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center">
                <span class="pb-2 sub-filter">Price range</span>
                <div class="w-4/5 pb-5 vue-slider">
                    <vue-slider
                        :process-style="{ backgroundColor: '#E5383B' }"
                        :tooltip-style="{
                            backgroundColor: '#E5383B',
                            borderColor: '#E5383B',
                        }"
                        @change="updatePrice()"
                        :data="priceData"
                        :data-value="'id'"
                        :data-label="'name'"
                        :hide-label="true"
                        v-model="priceValue"
                        :tooltip-placement="['bottom', 'bottom']"
                        :tooltip="'always'"
                    >
                        <template v-slot:dot="{ focus }">
                            <div
                                :class="['custom-dot', { focus }]"
                            ></div> </template
                    ></vue-slider>
                </div>
            </div>
        </div>

        <div class="restaurant-search-container">
            <div class="flex items-center text-center">
                <div class="rounded w-full h-0.5 bg-yellow dark:bg-red"></div>
                <p
                    class="pl-5 pr-5 mb-2 text-2xl font-semibold whitespace-nowrap background-transition text-gray7 dark:text-white font-general-semibold sm:text-5xl"
                >
                    {{ containerHeaderText }}
                </p>
                <div class="rounded w-full h-0.5 bg-yellow dark:bg-red"></div>
            </div>
            <div class="flex justify-between place-items-end">
                <div
                    class="mt-3 bg-white rounded-lg address-search-container background-transition"
                >
                    <div
                        class="mt-1 ml-3 mr-2 address-search-icon"
                        @click="
                            getLocation();
                            addressSearchBarExpand();
                        "
                        @blur="addressSearchBarShrink()"
                    >
                        <clip-loader
                            v-if="awaitingPosition"
                            :loading="true"
                            :color="'#E5383B'"
                            :size="'20px'"
                        >
                        </clip-loader>
                        <unicon
                            v-else
                            class="map-marker"
                            width="20"
                            height="20"
                            name="map-marker"
                        />
                    </div>
                    <div class="ml-1 bg-white address-search-input">
                        <input
                            @focus="addressSearchBarExpand"
                            @blur="addressSearchBarShrink"
                            v-model="addressSearchValue"
                            type="text"
                            :placeholder="addressPlaceholder"
                        />
                        <!--   <gmap-autocomplete
                            :placeholder="addressPlaceholder"
                            @focus="addressSearchBarExpand"
                            @blur="addressSearchBarShrink"
                            @place_changed="updatePlace"
                        >
                        </gmap-autocomplete> -->
                    </div>
                    <div class="ml-2 search-clear background-transition">
                        <unicon
                            v-on:click="
                                clearAddressSearchInput();
                                addressSearchBarShrink();
                            "
                            width="15"
                            height="15"
                            class="p-2 multiply-icon"
                            name="multiply"
                        />
                    </div>
                </div>
                <div
                    class="h-8 pl-3 pr-3 bg-white rounded-lg cursor-pointer filter-flex background-transition"
                >
                    <div
                        class="flex items-center justify-around h-full gap-x-2"
                        @click="toggleMapVisibility"
                    >
                        <span class="relative hidden h-full md:flex filter-text"
                            >Map</span
                        >
                        <unicon
                            width="15"
                            height="15"
                            class="transform rotate-90 background-transition filter-icon"
                            name="map"
                        />
                    </div>
                </div>
            </div>
            <div class="flex justify-between place-items-end">
                <div class="relative">
                    <div
                        class="mt-3 bg-white rounded-lg search-container background-transition"
                    >
                        <div class="mt-1 ml-3 mr-2 search-icon">
                            <clip-loader
                                v-if="awaitingSearch"
                                :loading="true"
                                :color="'#E5383B'"
                                :size="'20px'"
                            >
                            </clip-loader>
                            <unicon
                                v-else
                                class="search"
                                width="20"
                                height="20"
                                name="search"
                            />
                        </div>

                        <div class="ml-1 bg-white search-input">
                            <input
                                autocomplete="off"
                                @focus="
                                    searchBarExpand();
                                    showSearchSuggestions = true;
                                "
                                @blur="
                                    searchBarShrink();
                                    showSearchSuggestions = false;
                                "
                                v-model="searchValue"
                                type="text"
                                placeholder="Search"
                                id="search"
                            />
                        </div>

                        <div class="ml-2 search-clear background-transition">
                            <unicon
                                v-on:click="
                                    clearSearchInput();
                                    searchBarShrink();
                                "
                                width="15"
                                height="15"
                                class="p-2 multiply-icon"
                                name="multiply"
                            />
                        </div>
                    </div>
                    <div
                        class="absolute z-50 bg-white rounded-lg cursor-pointer top-12"
                        v-show="searchValue && showSearchSuggestions"
                    >
                        <div
                            v-for="restaurant in searchRestaurants(searchValue)"
                            :key="restaurant.name"
                            @mousedown="
                                searchValue = restaurant.name;
                                showSearchSuggestions = false;
                            "
                            class="p-2 border-b-2 rounded-lg hover:bg-gray-100 search-container-expand"
                        >
                            {{ restaurant.name }}
                        </div>
                    </div>
                </div>
                <div
                    v-on:click="toggleFilterVisibility"
                    class="h-8 pl-3 pr-3 bg-white rounded-lg cursor-pointer filter-flex background-transition"
                >
                    <div
                        class="flex items-center justify-around h-full gap-x-2"
                    >
                        <span class="relative hidden h-full md:flex filter-text"
                            >Filter</span
                        >
                        <unicon
                            width="15"
                            height="15"
                            class="transform rotate-90 background-transition filter-icon"
                            name="sliders-v-alt"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-col mt-3">
                <span class="text-gray3 dark:text-white"
                    >{{ numberOfDisplayed }} results found
                </span>
            </div>
            <div
                class="flex flex-wrap items-start justify-start mt-5 align-center"
            >
                <div v-for="genre in chosenGenres" :key="genre" class="m-1">
                    <label
                        class="pt-1 pb-1 pl-2 pr-2 text-xs text-black uppercase bg-yellow dark:bg-red dark:text-white rounded-xl light-shadow"
                    >
                        {{ genre }}
                        <button class="" v-on:click="updateGenres(genre)">
                            X
                        </button>
                    </label>
                </div>
            </div>
            <div class="pt-2 mb-20 restaurants-card-container pb-28 sm:pt-2">
                <div
                    v-if="numberOfDisplayed === 0"
                    class="flex flex-col items-center pt-10"
                >
                    <span
                        class="text-center oops-message text-gray7 dark:text-white"
                        >I couldn't find restaurants matching your search.</span
                    >
                    <div class="w-3/5">
                        <img
                            src="@/assets/images/eating-red.svg"
                            alt="No recently visited restaurants"
                        />
                    </div>
                    <span
                        class="mt-10 tips-message text-gray6 dark:text-gray-400"
                        >Tip: filter options with the button on the right!</span
                    >
                </div>
                <div v-show="mapShown">
                    <GmapMap
                        :center="{
                            lat: this.position.latitude,
                            lng: this.position.longitude,
                        }"
                        :zoom="this.position.zoom"
                        style="width: 100%; height: 400px"
                        :key="this.position.latitude + this.position.longitude"
                    >
                        <gmap-info-window
                            :options="infoOptions"
                            :position="infoWindowPos"
                            :opened="infoWinOpen"
                            @closeclick="infoWinOpen = false"
                        >
                        </gmap-info-window>
                        <GmapMarker
                            :key="restaurant.id"
                            v-for="(restaurant, index) in restaurants"
                            :position="
                                convertCoords(restaurant.location.coordinates)
                            "
                            :clickable="true"
                            @click="toggleInfoWindow(restaurant, index)"
                        />
                    </GmapMap>
                </div>
                <div
                    v-if="areCardsWithRouterLink"
                    class="relative grid mt-6 grid-dis"
                >
                    <RestaurantCard
                        :userId="userId"
                        v-for="(restaurant, index) in restaurants"
                        :index="index"
                        :key="restaurant.id"
                        :restaurant="restaurant"
                    />
                </div>
                <div v-else class="relative grid mt-6 grid-dis">
                    <RestaurantCardNoLink
                        v-for="(restaurant, index) in restaurants"
                        :index="index"
                        :key="restaurant.id"
                        :restaurant="restaurant"
                        @restoSelected="notifyRestoSelected"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RestaurantCard from "./RestaurantCard.vue";
import RestaurantCardNoLink from "./RestaurantCardNoLink.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
const Cookies = require("js-cookie");

import {
    getAddressFromCoordinates,
    getPositionFromAddress,
} from "../../api/home/homeAPI.js";
import { getUserWithToken } from '../../api/account/accountAPI';

export default {
    name: "HomeSearchContainer",
    components: { RestaurantCard, RestaurantCardNoLink, VueSlider, ClipLoader },
    props: {
        areCardsWithRouterLink: Boolean,
        containerHeaderText: String,
    },
    async mounted() {
        try {
            if (Cookies.get("access_token")) {
                const user = await getUserWithToken(
                    Cookies.get("access_token")
                );
                this.$isUserSignedIn = true;
                this.$userId = user.id;
                this.userId = user.id;
            }
        } catch {
            this.$isUserSignedIn = false;
        }
    },
    methods: {
        searchRestaurants(searchValue) {
            return this.restaurants
                .filter((restaurant) => {
                    return restaurant.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                })
                .slice(0, 4);
        },
        toggleInfoWindow: function (restaurant, index) {
            this.infoWindowPos = this.convertCoords(
                restaurant.location.coordinates
            );

            let restaurantLink = "";
            if (this.$isUserSignedIn) {
                restaurantLink = `#/restaurant?id=${restaurant.id}`;
            } else {
                restaurantLink = "#/login";
            }
            this.infoOptions.content = `
                <div>
                    <a href="${restaurantLink}">
                  <div>
                    <img style="object-fit: cover; width:100%; height:100px; overflow:hidden;" src="${restaurant.pictures[0]}">
                  </div>
                  <div>
                    <span style="font-size:16px; color:red;">${restaurant.name}</span>
                  </div>
                   <div>
                    <span>${restaurant.tel}</span>
                  </div>
                   <div>
                    <span>${restaurant.address}</span>
                  </div>
                  </a>
                </div>`;

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == index) {
                this.infoWinOpen = !this.infoWinOpen;
            }

            //if different marker set infowindow to open and reset current marker index
            else {
                this.infoWinOpen = true;
                this.currentMidx = index;
            }
        },
        getLocation() {
            this.awaitingPosition = true;

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.updatePosition(
                            position.coords.latitude,
                            position.coords.longitude
                        );

                        this.awaitingPosition = false;
                    },
                    (error) => {
                        this.$locationErrorHasAlertedOnce = true;
                        this.$locationErrorAlertCounter = new Date().valueOf();
                        this.$locationErrorMessage = `ERROR(${error.code}): ${error.message}`;
                        this.awaitingPosition = false;
                    }
                );
            } else {
                this.$locationErrorHasAlertedOnce = true;
                this.$locationErrorAlertCounter = new Date().valueOf();
                this.$locationErrorMessage =
                    "UFood is unable to find your location.";
                this.awaitingPosition = false;
            }
        },
        convertCoords(coords) {
            return {
                lat: coords[1],
                lng: coords[0],
            };
        },
        notifyRestoSelected(restoId) {
            this.$emit("restoSelected", restoId);
        },
        toggleFilterVisibility,
        getDistance,
        toggleMapVisibility() {
            this.mapShown = !this.mapShown;
        },

        clearSearchInput() {
            this.searchValue = "";
            this.updateSearch();
        },
        clearAddressSearchInput() {
            this.addressSearchValue = "";
            this.updateAddress();
        },
        searchBarExpand: function (event) {
            document
                .querySelector(".search-container")
                .classList.add("search-container-expand");
        },
        searchBarShrink() {
            if (this.searchValue === "") {
                document
                    .querySelector(".search-container")
                    .classList.remove("search-container-expand");
            }
        },
        addressSearchBarExpand: function (event) {
            document
                .querySelector(".address-search-container")
                .classList.add("address-search-container-expand");
        },
        addressSearchBarShrink() {
            if (this.addressSearchValue === "") {
                document
                    .querySelector(".address-search-container")
                    .classList.remove("address-search-container-expand");
            }
        },
        updateGenres(genre) {
            if (this.chosenGenres.indexOf(genre) === -1) {
                this.chosenGenres.push(genre);
            } else {
                this.chosenGenres = this.chosenGenres.filter((gr) => {
                    return gr != genre;
                });
            }

            this.filterRestaurants();
        },
        updateSearch() {
            this.filterRestaurants();
        },
        updatePrice() {
            this.filterRestaurants();
        },
        async updateAddress() {
            if (this.addressSearchValue != "") {
                const result = await getPositionFromAddress(
                    this.addressSearchValue
                );
                if (result) {
                    this.setLocation(result);
                }
            } else {
                this.position.latitude = 46.83160436132073;
                this.position.longitude = -71.21125933994448;
                this.position.zoom = 7;
                this.address = "";
            }
            this.filterRestaurants();
        },
        async updatePosition(lat, lng) {
            if (lat & lng) {
                const result = await getAddressFromCoordinates(lat, lng);
                if (result) {
                    this.setLocation(result);
                }
            }
            this.filterRestaurants();
        },
        setLocation(result) {
            this.position.latitude = result.geometry.location.lat;
            this.position.longitude = result.geometry.location.lng;
            this.position.zoom = 11;
            this.address = result.formatted_address;
            this.addressSearchValue = this.address;
        },
        filterRestaurants() {
            let genreQuery = "";
            if (this.chosenGenres.length != 0) {
                genreQuery += "&genres=";
                this.chosenGenres.map((genre) => {
                    genreQuery += genre;
                    genreQuery += ",";
                });
            }

            let priceQuery = "&price_range=";
            let minPrice = this.priceValue[0];
            let maxPrice = this.priceValue[1];
            for (let i = maxPrice; i >= minPrice; i--) {
                priceQuery += i;
                if (minPrice != i) {
                    priceQuery += ",";
                }
            }

            let searchQuery = "";
            if (this.searchValue != "") {
                searchQuery = "&q=" + this.searchValue;
            }

            let positionQuery = "";
            if (this.address != "") {
                positionQuery =
                    "&lat=" +
                    this.position.latitude +
                    "&lon=" +
                    this.position.longitude;
            }

            fetch(
                `https://ufoodapi.herokuapp.com/unsecure/restaurants?limit=130${genreQuery}${priceQuery}${searchQuery}${positionQuery}`
            )
                .then((r) => r.json())
                .then((data) => {
                    let sortedRestaurants = data.items;

                    for (let i = 0; i < sortedRestaurants.length; i++) {
                        let distance = this.getDistance(
                            this.position.latitude,
                            this.position.longitude,
                            sortedRestaurants[i].location.coordinates[1],
                            sortedRestaurants[i].location.coordinates[0]
                        );
                        sortedRestaurants[i].distance = distance;
                    }

                    sortedRestaurants.sort(function (a, b) {
                        return a.distance - b.distance;
                    });

                    this.restaurants = sortedRestaurants;
                    this.numberOfDisplayed = data.total;
                });
        },
        // fetch data here
        fetchRestaurants() {
            fetch(
                "https://ufoodapi.herokuapp.com/unsecure/restaurants?limit=130"
            )
                .then((r) => r.json())
                .then((data) => {
                    this.restaurants = data.items;
                    this.numberOfDisplayed = data.total;
                    return data;
                })
                .then((data) => {
                    // get restaurants
                    const restaurants = data.items;
                    let genresArray = [];

                    // loop through genres
                    for (let i = 0; i < restaurants.length; i++) {
                        for (let j = 0; j < restaurants[i].genres.length; j++) {
                            genresArray.push(restaurants[i].genres[j]);
                        }
                    }

                    // filter out undefined values
                    genresArray = genresArray.filter((genre) => {
                        return genre !== undefined;
                    });

                    // filter out duplicates
                    genresArray = Array.from(new Set(genresArray));

                    // order elements (alphabet)
                    genresArray.sort((a, b) => {
                        let nameA = a.toUpperCase();
                        let nameB = b.toUpperCase();
                        if (nameA < nameB) {
                            return -1; //nameA comes first
                        }
                        if (nameA > nameB) {
                            return 1; // nameB comes first
                        }
                        return 0; // names must be equal
                    });

                    this.allGenres = genresArray;
                    this.genresHaveLoaded = true;
                });
        },
        updateNumberOfDisplayed() {},
        // returns false if card is hidden
        getCardVisibility(restaurant) {},
    },
    data() {
        return {
            userId: this.$userId,
            filterHidder: false,
            numberOfDisplayed: 0,
            awaitingSearch: false,
            awaitingAddress: false,
            awaitingPosition: false,

            check: true,
            formatter: (value) => priceFormatter(value),
            searchValue: "",
            addressSearchValue: "",
            addressPlaceholder: "Enter your address",

            // gmap info window
            infoWindowPos: null,
            infoWinOpen: false,
            currentMidx: null,

            infoOptions: {
                content: "",
                //optional: offset infowindow so it visually sits nicely on top of our marker
                pixelOffset: {
                    width: 0,
                    height: -35,
                },
            },

            // data regarding restaurants
            restaurants: [],

            // data regarding slider component (price range)
            priceValue: [1, 5],
            priceData: [
                {
                    id: 1,
                    name: "$",
                },
                {
                    id: 2,
                    name: "$$",
                },
                {
                    id: 3,
                    name: "$$$",
                },
                {
                    id: 4,
                    name: "$$$$",
                },
                {
                    id: 5,
                    name: "$$$$$",
                },
            ],
            filterShown: false,
            mapShown: false,
            showSearchSuggestions: false,

            // data regarding genres
            // genresHaveLoaded turns true once data is loaded
            // (avoids any error)
            genresHaveLoaded: false,
            allGenres: [],
            chosenGenres: [],
            address: "",
            position: {
                zoom: 7,
                latitude: 46.83160436132073,
                longitude: -71.21125933994448,
            },
        };
    },
    created() {
        this.fetchRestaurants();
    },
    watch: {
        priceValue(newVal) {
            this.priceValue = newVal;
        },
        searchValue: function (val) {
            if (!this.awaitingSearch) {
                setTimeout(() => {
                    this.updateSearch();
                    this.awaitingSearch = false;
                }, 2000);
            }
            this.awaitingSearch = true;
        },
        addressSearchValue: function (val) {
            if (!this.awaitingAddress) {
                setTimeout(() => {
                    this.updateAddress();
                    this.awaitingPosition = false;
                    this.awaitingAddress = false;
                }, 2000);
            }
            this.awaitingPosition = true;
            this.awaitingAddress = true;
        },
    },
};

function toggleFilterVisibility() {
    this.filterShown = !this.filterShown;
}

function priceFormatter(price) {
    if (price === 1) return "Low";
    else if (price === 2) return "Reasonable";
    else if (price === 3) return "Expensive";
    return "Very expensive";
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // diamètre de la Terre (en km)
    const dLat = degTorad(lat2 - lat1);
    const dLon = degTorad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degTorad(lat1)) *
            Math.cos(degTorad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance (en km)
    return d;
}
function degTorad(deg) {
    return deg * (Math.PI / 180);
}
</script>

<style scoped>
input {
    background: rgb(243, 242, 242);
}

.oops-message {
    font-size: 25px;
}
.filter-hidder {
    transition: bottom 100ms;
    bottom: -100%;
    background-color: rgb(255, 255, 255);
    mask-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(rgba(0, 0, 0, 1)),
        to(rgba(0, 0, 0, 0.7))
    );
    -webkit-mask-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(rgba(0, 0, 0, 1)),
        to(rgba(0, 0, 0, 0.7))
    );
}
.hidderVisible {
    bottom: 0;
}
.show-all-flex {
    margin-bottom: 5px;
    border-bottom: 1px solid rgb(182, 181, 181);
}
.show-all {
    font-size: 18px;
}
.check-box-label {
    font-size: 14px;
}
.genres-container::-webkit-scrollbar {
    width: 7px;
    height: 15px;
    background-color: rgb(0, 0, 0);
}
.genres-container::-webkit-scrollbar-track {
    background-color: rgb(121, 121, 121);
}
.genres-container::-webkit-scrollbar-thumb {
    background-color: rgb(31, 29, 29);
}
.genres-container {
    border: 1px solid gray;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.grid-dis {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    display: grid;
    grid-gap: 15px 1rem;
}
.line-sep {
    width: 2px;
}
.sub-filter {
    font-size: 16px;
}
.filterer-text {
    font-size: 19px;
}
.filterer {
    box-shadow: 0 10px 15px 20px rgb(0 0 0 / 0.4),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    z-index: -1;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    opacity: 0;
    transform: translateY(300px);
    bottom: 0;
    transition: all 300ms;
}
.width-min {
    width: min-content;
}
.visible {
    z-index: 40;
    opacity: 1;
    transform: translateY(0);
}

.search-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 45px;
    height: 30px;
    box-shadow: 0 10px 15px 10px rgb(0 0 0 / 0.17),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    transition: 700ms;
    overflow: hidden;
}

.search-container:hover {
    width: 300px;
}

.search-container-expand {
    width: 300px;
}

.search-container-fit {
    width: fit-content;
}

.search-container .search-icon {
    flex-grow: 0.1;
}

.search-icon:hover {
    transform: scale(1.05);
}

.search-container .search-icon .search {
    cursor: pointer;
    fill: #565656;
}

.search-container .search-input {
    flex-grow: 100;
    height: 30px;
    width: 100%;
}

.search-container .search-input input {
    outline: none;
    top: 0;
    height: 100%;
    width: 100%;
}

.search-container .search-clear .multiply-icon {
    flex-grow: 0.1;
    fill: #565656;
    cursor: pointer;
}

.address-search-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 45px;
    height: 30px;
    box-shadow: 0 10px 15px 10px rgb(0 0 0 / 0.17),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    transition: 700ms;
    overflow: hidden;
}
.address-search-container:hover {
    width: 300px;
}

.address-search-container-expand {
    width: 300px;
}

.address-search-container-fit {
    width: fit-content;
}

.address-search-container .address-search-icon {
    flex-grow: 0.1;
}

.address-search-icon:hover {
    transform: scale(1.05);
}

.address-search-container .address-search-icon .search {
    cursor: pointer;
    fill: #565656;
}

.address-search-container .address-search-input {
    flex-grow: 100;
    height: 30px;
    width: 100%;
}

.address-search-container .address-search-input input {
    outline: none;
    top: 0;
    height: 100%;
    width: 100%;
}

.multiply-icon:hover {
    transform: scale(1.05);
}

.restaurant-search-container {
    width: 75vw;
}

.filter-flex {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.4),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    transition: transform 100ms;
    box-shadow: 1;
}
.filter-flex:hover {
    transform: scale(1.05);
}
.filter-text {
    top: 5px;
    color: #565656;
}
.filter-icon {
    fill: #565656;
}
.custom-dot {
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: rgb(233, 66, 60);
    transition: all 0.3s;
}
.custom-dot:hover {
    transform: rotateZ(45deg);
}
.custom-dot.focus {
    border-radius: 50%;
}
.load-more {
    height: 100px;
}
.load-more-button {
    font-variant: small-caps;
}

@media screen and (max-width: 400px) {
    .restaurant-search-container {
        width: 95vw;
    }
}

@media screen and (max-width: 450px) {
    .search-container:hover {
        width: 160px;
    }

    .search-container-expand {
        width: 160px;
    }

    .address-search-container:hover {
        width: 160px;
    }

    .address-search-container-expand {
        width: 160px;
    }
}

@media (min-width: 850px) {
    .grid-dis {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (min-width: 1600px) {
    .grid-dis {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>
