<template>
  <div id="photo-editor" class="container">
    <div class="sidebar-navigation">
      <button
        class="sidebar-btn"
        :class="{'active': $route.name === 'Cropper'}"
        @click="$router.push({name: 'Cropper'})"
      >
        <i class="icofont icofont-crop"></i>
      </button>
      <button
        class="sidebar-btn"
        :class="{'active': $route.name === 'Designer' && activeTool === 'background'}"
        @click="chooseTool('background')"
      >
        <i class="icofont icofont-image"></i>
      </button>
      <button
        class="sidebar-btn"
        :class="{'active': $route.name === 'Designer' && activeTool === 'text'}"
        @click="chooseTool('text')"
      >
        <i class="icofont icofont-font"></i>
      </button>
      <button class="sidebar-btn" @click="$eventBus.$emit('exportToPc')">
        <i class="icofont icofont-download"></i>
      </button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "photo-editor",
  methods: {
    chooseTool: function(tool) {
      this.setActiveTool(tool);
      if (this.$route.name === "Cropper") {
        this.$eventBus.$emit("submitCrop");
        // this.$router.push({ name: "Designer" });
      }
    },
    ...mapActions("designer", ["setActiveTool"])
  },
  computed: {
    ...mapState("designer", {
      activeTool: state => state.activeTool
    })
  },
  mounted() {
    if (!this.$store.state.currentImage) {
      this.$router.push({ name: "MainMenu" });
    }
  }
};
</script>

<style scoped>
.container {
  margin-left: 56px;
}

.sidebar-navigation {
  position: fixed;
  top: 56px;
  bottom: 0;
  /* right: 0; */
  left: 0;
  width: 56px;
  background: var(--background-secondary);

  display: flex;
  align-items: center;
  flex-direction: column;

  z-index: 3;
}

.sidebar-btn {
  border: 0;
  outline: none;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background: none;

  color: var(--font-primary);
  font-size: 2.5em;
  padding: 20px 0;
}

.sidebar-btn:hover {
  color: var(--primary);
  cursor: pointer;
}

.sidebar-btn.active {
  color: var(--primary);
}
</style>