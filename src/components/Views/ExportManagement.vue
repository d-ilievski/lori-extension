<template>
  <div id="export-management">
    <export-header :image="currentImage" @back="back"></export-header>
    <div class="wrapper">
      <div class="platforms-wrapper">
        <export-platform
          v-for="platform in platforms"
          @click="choosePlatform"
          v-bind="platform"
          :key="platform.id"
          :active="platform.id === currentPlatform"
        ></export-platform>
      </div>
      <transition-group appear name="fade" class="options-wrapper" tag="div">
        <platform-option
          v-for="item in currentPlatformOptions"
          :key="item.id"
          :item="item"
          @choose="chooseOption"
        ></platform-option>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import ExportManagementHeaderVue from "../ExportManagementHeader.vue";
import ExportManagementPlatformVue from "../ExportManagementPlatform.vue";
import ExportManagementPlatformOptionVue from "../ExportManagementPlatformOption.vue";

export default {
  name: "export-management",
  components: {
    "export-header": ExportManagementHeaderVue,
    "export-platform": ExportManagementPlatformVue,
    "platform-option": ExportManagementPlatformOptionVue
  },
  methods: {
    back: function() {
      this.$router.push({ name: "DownloadsList" });
    },
    chooseOption: function(option) {
      this.setOption(option);
      this.$router.push({
        name: "Tools"
      });
    },
    ...mapActions(["choosePlatform"]),
    ...mapActions({ setOption: "setCurrentPlatformOptionSettings" })
  },
  computed: {
    currentPlatformOptions: function() {
      let found = this.platformOptions.find(
        option => option.platformId === this.currentPlatform
      );

      if (!found) return [];

      return found.items;
    },
    ...mapState({
      platforms: state => state.platforms,
      platformOptions: state => state.platformOptions,
      currentImage: state => state.currentImage,
      currentPlatform: state => state.currentPlatform
    })
  },
  mounted: function() {
    // make the window wider
    document.documentElement.style.width = "800px";
    document.documentElement.style.height = "600px";
  }
};
</script>

<style scoped>
/* animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  height: 400px;
  padding: 10px;
}

.platforms-wrapper {
  max-height: 100%;
  overflow: hidden auto;
  width: 250px;
  background-color: var(--background-primary);
}

.options-wrapper {
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;
  overflow: hidden auto;
  flex: 1;
  max-height: 100%;
}
</style>