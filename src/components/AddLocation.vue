<template>
  <div class="add-location-form">
    <input
      type="search"
      class="add-location-form__input"
      v-model="locationName"
      @input="getTipsDebounced"
    />
    <ul class="add-location-form__suggestions">
      <li
        class="add-location-form__suggestion"
        v-for="(locationTip, index) in locationSuggestions"
        :key="index"
        @click="addLocation(locationTip)"
      >
        <div class="add-location-form__suggestion-name">
          {{ locationTip.name }}
        </div>
        <img
          src="@fortawesome/fontawesome-free/svgs/solid/plus.svg"
          class="icon icon_small icon_transparent"
          alt="Add"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ComponentOptions, defineComponent } from "vue";
import { getCitiesInfoByLocationName } from "@/services/GeocodingService";
import { debounce } from "@/helpers/helpers";
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
    };
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selected(city: CityInfo) {
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(e: string) {
      return true;
    },
  },
  methods: {
    async getTips() {
      if (this.locationName.length === 0) {
        this.locationSuggestions = [];
        return;
      }

      try {
        this.locationSuggestions = await getCitiesInfoByLocationName(
          this.locationName
        );
      } catch (e) {
        this.$emit("error", "Failed to fetch locations");
      }
    },
    addLocation(selectedCity: CityInfo) {
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
};

export default defineComponent(component);
</script>
