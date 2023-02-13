<template>
  <div class="weather-widget__add-location-form">
    <input
      type="search"
      class="weather-widget__add-location-input"
      v-model="locationName"
      @input="getTipsDebounced"
    />
    <ul class="weather-widget__suggestions">
      <li
        class="weather-widget__suggestion"
        v-for="(locationTip, index) in locationSuggestions"
        :key="index"
        @click="addLocation(locationTip)"
      >
        {{ locationTip.name }}
        <font-awesome-icon
          :icon="faPlus"
          class="weather-widget__suggestion-icon"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ComponentOptions, defineComponent } from "vue";
import { getCitiesInfoByLocationName } from "@/services/GeocodingService";
import { debounce } from "@/helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CityInfo } from "@/interfaces/CityInfo";

interface ExtendedComponentOptions extends ComponentOptions {
  getTipsDebounced?: () => void;
}

const component: ExtendedComponentOptions = {
  name: "AddLocation",
  data() {
    return {
      locationName: "" as string,
      locationSuggestions: [] as Array<CityInfo>,
      faPlus,
    };
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selected(city: CityInfo) {
      return true;
    },
  },
  methods: {
    async getTips() {
      if (this.locationName.length === 0) {
        this.locationSuggestions = [];
        return;
      }

      this.locationSuggestions = await getCitiesInfoByLocationName(
        this.locationName
      );
    },
    addLocation(selectedCity: CityInfo) {
      console.log("selectedCity", selectedCity);
      this.$emit("selected", selectedCity);
      this.locationName = "";
      this.locationSuggestions = [];
    },
  },
  created() {
    this.getTipsDebounced = debounce(this.getTips, 500);
  },
  beforeUnmount() {
    delete this.getTipsDebounced;
  },

  components: {
    FontAwesomeIcon,
  },
};

export default defineComponent(component);
</script>
