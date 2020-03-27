<template>
  <input
    :min="min"
    :max="max"
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
    class="input-field"
    :class="{'floating':floating}"
    :style="{width}"
  />
</template>

<script>
export default {
  name: "input-field",
  props: {
    value: {
      default: null
    },
    width: {
      type: String,
      default: "100%"
    },
    type: {
      type: String,
      default: "text"
    },
    min: [String, Number],
    max: [String, Number],
    floating: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.input-field {
  height: 30px;
  background: var(--background-secondary);
  color: var(--text-primary);
  font-family: var(--font-primary);
  padding-left: 5px;
  border-radius: var(--round-xs);
  outline: none;
  border: 1px solid var(--primary-light);

  pointer-events: auto;
}
.input-field.floating {
  background: var(--background-primary);

  border: none;
  box-shadow: 0px 5px 4px 2px rgba(0, 0, 0, 0.2);
}
</style>