<template>
  <div class="colors-dropdown">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "colors-dropdown"
};
</script>

<style scoped>
.colors-dropdown {
  position: absolute;
  background: var(--background-secondary);
  top: calc(100% + 5px);
  left: 0;
  max-height: 450px;
  height: 500px;
  width: 270px;
  border-radius: 0 0 var(--round-xs) var(--round-xs);
  box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.15);
  z-index: 0;
  overflow: hidden auto;
}

.container {
    margin: 0;
    padding: 10px;
}
</style>