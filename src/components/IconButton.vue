<template>
  <div class="button" @click="click">
    <i class="icofont" :class="icon"></i>
  </div>
</template>

<script>
export default {
  name: "icon-button",
  props: {
    icon: String
  },
  methods: {
    click: function() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.button {
  width: 30px;
  height: 30px;
  background: white;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--round-xs);
  cursor: pointer;
  box-shadow: 0px 5px 4px 2px rgba(0, 0, 0, 0.2);
  pointer-events: auto;

  --ggs: 0.75;
}

.button:hover {
  color: white;
  background: var(--primary);
}

.button:active {
  box-shadow: none;
}
</style>