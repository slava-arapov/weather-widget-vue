<template>
  <article class="card">
    <h2 class="card__title">Settings</h2>
    <draggable
      v-model="draggableLocations"
      @start="onDragStart"
      @end="onDragEnd"
      item-key="name"
      class="locations"
      handle=".draggable-handle"
    >
      <template #item="{ element }">
        <div class="locations__location">
          <font-awesome-icon
            :icon="faBars"
            class="icon icon_small draggable-handle"
          />
          <div class="locations__name">{{ element.name }}</div>

          <button class="locations__remove-button" @click="remove(element)">
            <font-awesome-icon :icon="faTrashCan" class="icon icon_small" />
          </button>
        </div>
      </template>
    </draggable>

    <p v-if="locations.length === 0">
      No locations added. Please enter the city name in the field below.
    </p>
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
import draggable from "vuedraggable";

export default defineComponent({
  name: "WeatherSettings",
  props: {
    locations: {
      type: Object as PropType<Array<WeatherInfo>>,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
    remove(payload: WeatherInfo) {
      return true;
    },
    // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
    add(city: CityInfo) {
      return true;
    },
    // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
    reorder(locations: Array<WeatherInfo>) {
      return true;
    },
  },
  data() {
    return {
      draggableLocations: [] as Array<WeatherInfo>,
      drag: false,
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
    onDragStart() {
      this.drag = true;
    },
    onDragEnd() {
      this.drag = false;
      this.$emit("reorder", this.draggableLocations);
    },
  },
  watch: {
    locations: {
      handler() {
        this.draggableLocations = [...this.locations];
      },
      deep: true,
    },
  },
  components: {
    draggable,
    FontAwesomeIcon,
    AddLocation,
  },
});
</script>
