<template>
  <article class="weather-widget__card">
    <h2 class="weather-widget__title">Settings</h2>
    <div class="weather-widget__locations">
      <div
        v-for="location in locations"
        :key="location.name"
        class="weather-widget__location"
      >
        <font-awesome-icon
          :icon="faBars"
          class="weather-widget__location-icon"
        />
        <div class="weather-widget__location-name">{{ location.name }}</div>

        <button class="weather-widget__remove-location-button">
          <font-awesome-icon
            :icon="faTrashCan"
            class="weather-widget__remove-location-button-icon"
          />
        </button>
      </div>
    </div>
    <h2 class="weather-widget__title">Add Location:</h2>
    <div class="weather-widget__add-location-form">
      <input type="text" class="weather-widget__add-location-input" />
      <button class="weather-widget__add-location-button">
        <font-awesome-icon
          :icon="faPlus"
          class="weather-widget__add-location-button-icon"
        />
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WeatherInfo } from "@/interfaces/WeatherInfo";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faXmark,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  name: "WeatherSettings",
  props: {
    locations: {
      type: Object as PropType<Array<WeatherInfo>>,
      required: true,
    },
  },
  data() {
    return {
      faBars,
      faXmark,
      faTrashCan,
      faPlus,
    };
  },
  components: {
    FontAwesomeIcon,
  },
});
</script>
