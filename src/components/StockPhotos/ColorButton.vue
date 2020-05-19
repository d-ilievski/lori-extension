<template>
  <div class="button" :class="{active, bnw, none}" :style="{background: color}" @click="click"></div>
</template>

<script>
export default {
  name: "color-button",
  props: {
    active: Boolean,
    value: String,
    color: String,
    bnw: Boolean,
    none: Boolean
  },
  methods: {
    click: function() {
      this.$emit("click", this.value);
    }
  }
};
</script>

<style scoped>
.button {
  box-sizing: border-box;
  border-radius: var(--round-xs);
  width: 25px;
  height: 25px;
  position: relative;
  margin: 5px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
}

.button:hover {
  cursor: pointer;
}

.button.active {
  box-shadow: inset 2px 2px 4px 0px rgba(0, 0, 0, 0.3);
  border: 2px solid var(--primary);
}

.button.bnw {
  background: linear-gradient(90deg, #000 50%, #fff 50%);
}
.button.none {
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 43%,
      #ff0000 45%,
      #ff0000 55%,
      rgba(0, 0, 0, 0) 57%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      135deg,
      #fff 0%,
      #fff 43%,
      #ff0000 45%,
      #ff0000 55%,
      #fff 57%,
      #fff 100%
    );
}
</style>