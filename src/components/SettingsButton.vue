<template>
  <button class="weather-widget__settings-button" @click="action">
    <img
      src="@fortawesome/fontawesome-free/svgs/solid/xmark.svg"
      class="icon"
      alt="Close Settings"
      v-if="inSettingsMode"
    />
    <img
      src="@fortawesome/fontawesome-free/svgs/solid/gear.svg"
      class="icon"
      alt="Open Settings"
      v-else
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettingsButton",
  props: {
    inSettingsMode: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    open: null,
    close: null,
  },
  computed: {
    action() {
      return this.inSettingsMode ? this.close : this.open;
    },
  },
  methods: {
    open() {
      this.$emit("open");
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>
