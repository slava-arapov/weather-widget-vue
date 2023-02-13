<template>
  <div class="weather-widget">
    <settings-button
      :in-settings-mode="inSettingsMode"
      @close="closeSettings"
      @open="openSettings"
    />
    <weather-settings
      :locations="locations"
      v-show="inSettingsMode"
      @remove="(location: WeatherInfo) => remove(location)"
      @add="(city: CityInfo) => handleAdd(city)"
    />
    <weather-location
      v-for="location of locations"
      v-show="!inSettingsMode"
      :weather-info="location"
      :key="location.name"
    />
    <no-locations-tip
      v-if="locations.length === 0 && !inSettingsMode"
      @open="openSettings"
    />
    <loading-spinner v-if="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SettingsButton from "@/components/SettingsButton.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NoLocationsTip from "@/components/NoLocationsTip.vue";
import WeatherLocation from "@/components/WeatherLocation.vue";
import WeatherSettings from "@/components/WeatherSettings.vue";
import {
  loadLocations as loadLocationsFromLocalStorage,
  saveLocations as saveLocationsToLocalStorage,
} from "@/services/LocalStorageService";
import {
  getDefaultLocationsWeatherInfo,
  getWeatherInfo,
} from "@/services/WeatherService";
import { WeatherInfo } from "@/interfaces/WeatherInfo";
import { CityInfo } from "@/interfaces/CityInfo";

export default defineComponent({
  name: "WeatherWidget",
  components: {
    SettingsButton,
    LoadingSpinner,
    NoLocationsTip,
    WeatherLocation,
    WeatherSettings,
  },
  data() {
    return {
      locations: [] as WeatherInfo[],
      inSettingsMode: false,
      loading: true,
    };
  },
  async mounted() {
    this.locations = loadLocationsFromLocalStorage();

    if (this.locations.length > 0) {
      this.refresh();
      this.loading = false;
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          this.locations.push(await getWeatherInfo(longitude, latitude));
          this.loading = false;
        },
        async () => {
          await this.loadDefaultLocations();
          this.loading = false;
        }
      );
    }
  },
  watch: {
    locations: {
      handler() {
        saveLocationsToLocalStorage(this.locations);
      },
      deep: true,
    },
  },
  methods: {
    openSettings() {
      this.inSettingsMode = true;
    },
    closeSettings() {
      this.inSettingsMode = false;
    },
    remove(location: WeatherInfo) {
      this.locations = this.locations.filter((item) => item !== location);
    },
    async handleAdd(city: CityInfo) {
      const alreadyAdded =
        this.locations.filter((location) => location.name === city.name)
          .length > 0;

      if (alreadyAdded) return;

      this.loading = true;

      this.locations.push(await getWeatherInfo(city.lon, city.lat));

      this.loading = false;
    },
    async loadDefaultLocations() {
      this.locations = await getDefaultLocationsWeatherInfo();
    },
    async refresh() {
      const newInfo = await Promise.all(
        this.locations.map((location) =>
          getWeatherInfo(location.lon, location.lat)
        )
      );
      this.locations = newInfo;
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/fonts.scss";
@import "@/assets/styles/styles.scss";
</style>
