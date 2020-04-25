<template>
  <transition name="show">
    <div class="modal" v-if="show" @click.self="close">
      <div class="modal-dialog" :style="{width: modalSize}">
        <icon-button noShadow class="icofont icofont-close close" @click="close"></icon-button>
        <div class="modal-header">
          <div class="modal-title">{{ title }}</div>
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
    title: String,
    size: {
      validator: function(value) {
        // The value must match one of these strings
        return ["s", "l"].indexOf(value) !== -1;
      }
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  computed: {
    modalSize: function() {
      if (this.size === "s") return "50%";
      return "95%";
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
  border-radius: var(--round-sm);
  padding: 25px;
  background: var(--background-primary);
  box-shadow: 10px 15px 15px 0px rgba(0, 0, 0, 0.2);

  position: relative;
}

.modal-body {
  width: 100%;
  overflow: hidden;
}

.modal-header {
  width: 100%;
  margin-bottom: 25px;
}

.modal-title {
  font-family: var(--font-primary);
  font-size: 1.4em;
  color: var(--text-primary);
}

.show-enter-active,
.show-leave-active {
  transition: all 0.2s;
}

.show-enter,
.show-leave-to {
  opacity: 0;
}

.modal-footer {
  display: flex;
  align-items: center;
  margin-top: 25px;
}

.close {
  position: absolute;
  top: -15px;
  right: 0;
}
</style>