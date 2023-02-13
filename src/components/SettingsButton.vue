<template>
  <button class="weather-widget__settings-button" @click="action">
    <font-awesome-icon :icon="icon" class="icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faGear,
  faXmark,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

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
    icon(): IconDefinition {
      return this.inSettingsMode ? faXmark : faGear;
    },
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
  components: {
    FontAwesomeIcon,
  },
});
</script>
