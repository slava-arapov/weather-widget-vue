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
      @remove="(location: WeatherInfo) => handleRemove(location)"
      @add="(city: CityInfo) => handleAdd(city)"
      @reorder="(locations: Array<WeatherInfo>) => handleReorder(locations)"
      @error="(e: string) => displayError(e)"
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

    <div class="weather-widget__error" v-if="error" @click="error = ''">
      {{ error }}
    </div>
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

const WEATHER_REFRESH_INTERVAL_DELAY = 10 * 60 * 1000;

export default defineComponent({
  name: "WeatherWidget",
  data() {
    return {
      locations: [] as WeatherInfo[],
      inSettingsMode: false,
      refreshTimerId: null as ReturnType<typeof setInterval> | null,
      loading: true,
      error: "",
    };
  },
  async mounted() {
    this.locations = loadLocationsFromLocalStorage();

    this.refreshTimerId = setInterval(
      this.refresh,
      WEATHER_REFRESH_INTERVAL_DELAY
    );

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
          this.displayError("Failed to get your current location");
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
    handleRemove(location: WeatherInfo) {
      this.locations = this.locations.filter((item) => item !== location);
    },
    async handleAdd(city: CityInfo) {
      const alreadyAdded =
        this.locations.filter((location) => location.name === city.name)
          .length > 0;

      if (alreadyAdded) {
        this.displayError("Already in list");
        return;
      }

      this.loading = true;

      try {
        this.locations.push(await getWeatherInfo(city.lon, city.lat));
      } catch (e) {
        this.displayError("Failed to get weather");
      }

      this.loading = false;
    },
    handleReorder(locations: Array<WeatherInfo>) {
      this.locations = locations;
    },
    async loadDefaultLocations() {
      try {
        this.locations = await getDefaultLocationsWeatherInfo();
      } catch (e) {
        this.displayError("Failed to get weather");
      }
    },
    async refresh() {
      try {
        const newInfo = await Promise.all(
          this.locations.map((location) =>
            getWeatherInfo(location.lon, location.lat)
          )
        );
        this.locations = newInfo;
      } catch (e) {
        this.displayError("Failed to get weather");
      }
    },
    displayError(error: string) {
      this.error = error;
      setTimeout(() => (this.error = ""), 5000);
    },
  },
  components: {
    SettingsButton,
    LoadingSpinner,
    NoLocationsTip,
    WeatherLocation,
    WeatherSettings,
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/fonts.scss";
@import "@/assets/styles/styles.scss";
</style>
