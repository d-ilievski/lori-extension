<template>
  <label class="wrapper">
    <input type="checkbox" @input="$emit('input', $event.target.checked)" :checked="value" />
    <span></span>
    <div class="text">
      <slot></slot>
    </div>
  </label>
</template>

<script>
export default {
  name: "custom-checbox",
  props: {
    value: Boolean,
  },
};
</script>

<style scoped>
input {
  display: none;
}
span {
  min-width: 15px;
  min-height: 15px;
  border: 1px solid var(--text-secondary);
  border-radius: var(--round-xs);
  background-color: var(--background-secondary);
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-right: 10px;
}
input:checked ~ span {
  border-color: var(--primary);
}
input ~ span::after {
  transition: width, height 0.15s ease;

  content: "";
  width: 0px;
  height: 0px;
  border: 4px solid transparent;
  border-top: transparent;
  border-left: transparent;
  position: absolute;
  transform: rotate(45deg);
  border-radius: 4px;
  left: 50%;
  bottom: 50%;
}
input:checked ~ span::after {
  border-color: var(--primary);
  width: 5px;
  height: 12px;
  left: 4px;
  bottom: 1px;
}
.wrapper {
  display: flex;
  align-items: flex-start;
  user-select: none;
}
.text {
  font-family: var(--font-primary);
  color: var(--text-primary);
  font-size: 1.1em;
}
</style>