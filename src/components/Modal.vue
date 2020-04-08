<template>
  <transition name="show">
    <div class="modal" v-if="show" @click.self="close">
      <div class="modal-dialog modal-lg">
        <div class="modal-header">
          <div class="modal-title">{{ title }}</div>
          <icon-button class="icofont icofont-close" @click="close"></icon-button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    show: Boolean,
    title: String
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  watch: {
    show: value => {
      if (value) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "unset";
    }
  }
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.modal-dialog {
  width: 95%;
  margin: auto;
  margin-top: 72px;
  box-shadow: 10px 15px 15px 0px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-body {
  width: 100%;
  overflow: hidden;
  border-radius: var(--round-sm);
  padding: 25px;
  background: var(--background-primary);
}

.modal-header {
  position: absolute;
  top: -50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  padding: 10px;
  border-radius: var(--round-sm);
  font-family: var(--font-primary);
  font-size: 1.4em;
  box-shadow: 0px 5px 4px 2px rgba(0, 0, 0, 0.2);
  color: var(--primary);
  background: var(--background-primary);
}

.show-enter-active,
.show-leave-active {
  transition: all 0.2s;
}

.show-enter,
.show-leave-to {
  opacity: 0;
}
</style>