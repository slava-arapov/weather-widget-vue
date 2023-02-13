<template>
  <article class="card">
    <h2 class="card__title">Settings</h2>
    <div class="locations">
      <div
        v-for="location in locations"
        :key="location.name"
        class="locations__location"
      >
        <font-awesome-icon :icon="faBars" class="icon icon_small" />
        <div class="locations__name">{{ location.name }}</div>

        <button class="locations__remove-button" @click="remove(location)">
          <font-awesome-icon :icon="faTrashCan" class="icon icon_small" />
        </button>
      </div>
    </div>
    <h2 class="card__title">Add Location:</h2>
    <add-location @selected="(city: CityInfo) => add(city)" />
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WeatherInfo } from "@/interfaces/WeatherInfo";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import AddLocation from "@/components/AddLocation.vue";
import { CityInfo } from "@/interfaces/CityInfo";

export default defineComponent({
  name: "WeatherSettings",
  props: {
    locations: {
      type: Object as PropType<Array<WeatherInfo>>,
      required: true,
    },
  },
  emits: {
    remove(payload: WeatherInfo) {
      if (payload) return true;

      return false;
    },
    // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
    add(city: CityInfo) {
      return true;
    },
  },
  data() {
    return {
      faBars,
      faXmark,
      faTrashCan,
    };
  },
  methods: {
    remove(location: WeatherInfo) {
      this.$emit("remove", location);
    },
    add(city: CityInfo) {
      this.$emit("add", city);
    },
  },

  components: {
    FontAwesomeIcon,
    AddLocation,
  },
});
</script>
