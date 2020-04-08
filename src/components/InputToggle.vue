<template>
  <label class="switch">
    <input type="checkbox" @change="$emit('input', $event.target.checked)" />
    <span class="slider round"></span>
  </label>
</template>

<script>
export default {
  name: "input-toggle",
  props: {
      value: Boolean
  }
};
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background-secondary);
  transition: 0.4s;
  border: 1px solid var(--primary-light)
}

.slider:before {
  position: absolute;
  content: "";
  height: 11px;
  width: 11px;
  left: 2px;
  bottom: 2px;
  background-color: var(--primary);
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary);
}

input:checked + .slider:before {
  transform: translateX(12px);
  background-color: #fff;
}

/* Rounded sliders */
.slider.round {
  border-radius: var(--round-sm);
}

.slider.round:before {
  border-radius: 50%;
}
</style>