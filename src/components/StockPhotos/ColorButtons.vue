<template>
  <div class="color-buttons">
    <template v-for="color in colors">
      <color-button
        @click="setColor"
        :key="color.value"
        :active="active === color.value"
        :color="color.color"
        :value="color.value"
        :bnw="color.bnw"
        :none="color.none"
      ></color-button>
    </template>
  </div>
</template>

<script>
import ColorButton from "@/components/StockPhotos/ColorButton.vue";

export default {
  name: "color-buttons",
  components: {
    "color-button": ColorButton
  },
  props: {
    active: String
  },
  data: () => ({
    colors: [
      {
        color: null,
        value: "none",
        none: true
      },
      {
        color: null,
        value: "black-and-white",
        bnw: true
      },
      {
        color: "black",
        value: "black"
      },
      {
        color: "white",
        value: "white"
      },
      {
        color: "yellow",
        value: "yellow"
      },
      {
        color: "orange",
        value: "orange"
      },
      {
        color: "red",
        value: "red"
      },
      {
        color: "purple",
        value: "purple"
      },
      {
        color: "magenta",
        value: "magenta"
      },
      {
        color: "green",
        value: "green"
      },
      {
        color: "teal",
        value: "teal"
      },
      {
        color: "blue",
        value: "blue"
      }
    ]
  }),
  methods: {
    setColor: function(value) {
      this.$emit("change", value);
    }
  }
};
</script>

<style>
</style>