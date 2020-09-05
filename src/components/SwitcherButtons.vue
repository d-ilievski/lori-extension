<template>
  <div class="switcher-wrapper">
    <icon-button
      v-for="(button, index) in buttons"
      :key="index"
      :class="{'active':value == button.value}"
      :icon="button.icon"
      @click="activate(button.value)"
      :noShadow="noShadow"
    ></icon-button>
  </div>
</template>

<script>
import IconButtonVue from "./IconButton.vue";

export default {
  name: "switcher-buttons",
  components: {
    "icon-button": IconButtonVue
  },
  props: {
    buttons: Array,
    value: {},
    noShadow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    activate: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
.switcher-wrapper {
  display: flex;
}

.btn:not(:first-child) {
  margin-left: 3px;
}

.btn.active {
  color: white;
  background: var(--primary);
  box-shadow: 0px 5px 4px 2px rgba(0, 0, 0, 0.2);
}
.btn.no-shadow.active {
  box-shadow: none;
}
</style>