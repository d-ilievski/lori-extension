<template>
  <div class="platform-container" :class="{'active':active}" @click="click">
    <div class="platform-logo">
      <i :class="icon"></i>
      <div class="name">{{name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "platform",
  props: {
      name: String,
      active: Boolean,
      icon: String,
      id: Number
  },
  methods: {
    click: function() {
      this.$emit('click', this.id);
    }
  }
};
</script>

<style scoped>
.platform-container {
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: var(--round-md);
}

.platform-container.active {
  background: var(--background-gradient);
  color: white;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
.platform-container.active:hover {
  color: white;
}

.platform-container:hover {
  cursor: pointer;
  color: var(--primary);
}

.platform-logo {
  /* logo size */
  --ggs: 0.7;

  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>