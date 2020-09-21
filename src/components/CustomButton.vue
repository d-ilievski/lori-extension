<template>
  <button
    class="btn"
    :class="[{'no-shadow':noShadow}, type, {'block':block}, {'disabled':disabled}, {'no-icon':!icon}, {'outline': outline}]"
    @click="click"
  >
    <span class="title" :class="[{'no-icon':!icon}, {'block':block}]">
      <slot></slot>
    </span>
    <i class="icofont" :class="[icon, 'icon']" v-if="icon"></i>
  </button>
</template>

<script>
export default {
  name: "custom-button",
  props: {
    icon: String,
    noShadow: Boolean,
    type: String,
    block: Boolean,
    disabled: Boolean,
    outline: Boolean,
  },
  methods: {
    click: function () {
      if (this.disabled) return;

      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.btn {
  min-width: 50px;
  height: 30px;
  background: white;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--round-xs);
  cursor: pointer;
  box-shadow: 0px 5px 4px 2px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  padding: 0 12px;
  border: none;
  outline: none;

  font-family: var(--font-primary);
  font-size: 1.1em;

  line-height: normal;
}

.btn.no-shadow {
  box-shadow: none;
}

.btn.no-icon {
  justify-content: center;
}

.btn:hover {
  color: white;
  background: var(--primary);
}

.btn:active {
  box-shadow: none;
}

.btn.block {
  width: 100%;
  justify-content: center;
}

.btn.primary {
  color: #fff;
  background: var(--background-gradient);
}

.btn.primary:hover {
  background: var(--primary);
}

.btn.secondary {
  color: var(--primary);
  background: none;
  box-shadow: none;
  border: 1px solid transparent;
}
.btn.secondary:hover {
  color: var(--primary);
  border: 1px solid var(--primary);
}
.btn.secondary:active {
  background: var(--primary);
  color: #fff;
}

.btn.disabled {
  filter: opacity(0.75);
  pointer-events: none;
}

.btn.outline {
  border: 1px solid var(--primary);
}

.btn .title {
  margin-right: 10px;

  overflow: hidden;
}
.btn .title.no-icon {
  margin: 0;
  text-align: center;
}
</style>