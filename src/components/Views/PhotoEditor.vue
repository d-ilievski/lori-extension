<template>
  <div id="photo-editor">
    <export-header :image="currentImage" @back="back" ref="exportHeader"></export-header>
    <div class="editor-wrapper">
      <photo-editor-sidebar
        :settings="settings"
        :cropSize="cropSize"
        :originalImageWidth="originalImageWidth"
        :originalImageHeight="originalImageHeight"
        @confirm="confirm"
        @cancel="back"
      ></photo-editor-sidebar>
      <div class="cropper-wrapper">
        <div class="cropper-toolbar">
          <switcher-buttons
            :buttons="[{icon: 'gg-crop', value: 'crop', title: 'Crop Mode'},{icon: 'gg-controller', value: 'move', title: 'Move Mode'}]"
            v-model="dragMode"
          ></switcher-buttons>
          <div class="rotate-buttons">
            <icon-button icon="gg-undo" @click="rotateLeft"></icon-button>
            <icon-button icon="gg-redo" @click="rotateRight"></icon-button>
            <input-field
              floating
              type="number"
              min="-360"
              max="360"
              width="55px"
              v-model="rotation"
            ></input-field>
          </div>
          <div class="reflect-buttons">
            <icon-button icon="gg-swap" @click="reflectHorizontal"></icon-button>
            <icon-button icon="gg-swap-vertical" @click="reflectVertical"></icon-button>
          </div>

          <icon-button icon="gg-sync" @click="resetCropper"></icon-button>
          <!-- <icon-button icon="gg-download" @click="resetCropper"></icon-button> -->
        </div>
        <div class="cropper-zoombar">
          <icon-button icon="gg-zoom-in" @click="zoomIn"></icon-button>
          <icon-button icon="gg-zoom-out" @click="zoomOut"></icon-button>
        </div>
        <vue-cropper
          class="cropper"
          :crop="limitCropper"
          :zoom="onZoom"
          ref="cropper"
          :src="imagePath"
          :toggleDragModeOnDblclick="false"
          :data="currentStoredData"
          v-bind="settings.cropperSettings"
        ></vue-cropper>
      </div>
    </div>
    <!-- <button @click="upload">Upload</button> -->
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import ImagesRepository from "../../api/ImagesRepository";
// import u from "../../util/utils";
import ExportManagementHeaderVue from "../ExportManagementHeader.vue";

import { mapState, mapGetters } from "vuex";
import PhotoEditorSidebarVue from "../PhotoEditorSidebar.vue";

export default {
  name: "photo-editor",
  components: {
    VueCropper,
    "export-header": ExportManagementHeaderVue,
    "photo-editor-sidebar": PhotoEditorSidebarVue
  },
  data: function() {
    return {
      cropperLimitReached: false,
      dragMode: "crop",
      rotation: 0,
      reflectionH: 1,
      reflectionV: 1,
      originalImageWidth: null,
      originalImageHeight: null,
      cropSize: {
        width: null,
        height: null,
        x: null,
        y: null
      }
    };
  },
  methods: {
    limitCropper: function(event) {
      if (!this.$refs.cropper) return;

      let width = event.detail.width;
      let height = event.detail.height;

      if (
        this.settings.cropperSettings.minCroppedWidth &&
        this.settings.cropperSettings.minCroppedHeight
      ) {
        if (
          width < this.settings.cropperSettings.minCroppedWidth ||
          height < this.settings.cropperSettings.minCroppedHeight
        ) {
          width = this.settings.cropperSettings.minCroppedWidth;
          height = this.settings.cropperSettings.minCroppedHeight;

          this.$refs.cropper.setData({
            width,
            height
          });
        }
      }

      this.cropSize.width = Math.round(width);
      this.cropSize.height = Math.round(height);
      this.cropSize.x = Math.round(event.detail.x);
      this.cropSize.y = Math.round(event.detail.y);

      this.$eventBus.$emit("cropSizeChange", {
        width: this.cropSize.width,
        height: this.cropSize.height
      });
    },
    onZoom: function(event) {
      // no need to do anything if there are no limits :)
      if (
        !this.settings.cropperSettings.minCroppedWidth ||
        !this.settings.cropperSettings.minCroppedHeight
      )
        return;

      // the whole canvas element
      let containerData = this.$refs.cropper.getContainerData();
      // the crop box element as it appears on the screen
      let cropBoxData = this.$refs.cropper.getCropBoxData();
      // cropped image
      let croppedCanvas = this.$refs.cropper.getCroppedCanvas();

      // we should prevent zooming in when the lower limit of crop size is reached.
      // prevent zoom in if cropbox size is almost as big as the whole canvas element AND the cropped image is at limit
      // we use 20 pixels as offset
      if (
        (cropBoxData.width + 20 >= containerData.width ||
          cropBoxData.height + 20 >= containerData.height) &&
        (croppedCanvas.width - 20 <=
          this.settings.cropperSettings.minCroppedWidth ||
          croppedCanvas.height - 20 <=
            this.settings.cropperSettings.minCroppedHeight)
      ) {
        // to see if it's a zoom in we should compare ratios of the current zoom ratio and the previous zoom ratio
        if (event.detail.ratio > event.detail.oldRatio) {
          // it's zoom in
          event.preventDefault();
        }
      }
    },
    back: function() {
      this.$router.push({
        name: "ExportManagement"
      });
    },
    rotateLeft: function() {
      this.rotation -= 45;
    },
    rotateRight: function() {
      this.rotation += 45;
    },
    zoomIn: function() {
      this.$refs.cropper.relativeZoom(0.1);
    },
    zoomOut: function() {
      this.$refs.cropper.relativeZoom(-0.1);
    },
    reflectHorizontal: function() {
      this.$refs.cropper.scaleX((this.reflectionH *= -1));
    },
    reflectVertical: function() {
      this.$refs.cropper.scaleY((this.reflectionV *= -1));
    },
    resetCropper: function() {
      this.reflectionH = 1;
      this.reflectionV = 1;
      this.rotation = 0;
      this.$refs.cropper.reset();
    },
    confirm: function() {
      let data = this.$refs.cropper.getData(true);
      this.$store.dispatch("storePlatformOptionData", data);
      this.back();
    }
  },
  computed: {
    imagePath: function() {
      if (!this.currentImage) return;

      if (this.currentImage.filePath) return this.currentImage.filePath;

      return `file://${this.currentImage.filename}`;
    },
    ...mapState({
      currentImage: state => state.currentImage,
      settings: state => state.currentPlatformOptionSettings,
      exportData: state => state.exportData
    }),
    ...mapGetters(["currentStoredData"])
  },
  watch: {
    dragMode: function(value) {
      this.$refs.cropper.setDragMode(value);
    },
    rotation: function(value) {
      let normalized = Number.parseInt(value);
      if (value >= 360) {
        normalized = value - 360;
      } else if (value <= -360) {
        normalized = value + 360;
      }

      this.rotation = normalized;
      this.$refs.cropper.rotateTo(this.rotation);
    }
  },
  mounted: function() {
    // make the window wider
    document.documentElement.style.width = "800px";
    document.documentElement.style.height = "600px";

    const imageSize = this.$refs.exportHeader.getOriginalImageSize();
    this.originalImageWidth = imageSize.width;
    this.originalImageHeight = imageSize.height;

    // events
    this.$eventBus.$on("changeAspectRatio", ({ width, height }) => {
      this.$refs.cropper.setAspectRatio(width / height);
    });
    this.$eventBus.$on("resetAspectRatio", () => {
      this.$refs.cropper.setAspectRatio(null);
    });
    this.$eventBus.$on("changeCropSize", ({ width, height }) => {
      if (!width) width = 0;
      if (!height) height = 0;

      const data = this.$refs.cropper.getData();
      data.width = Number.parseInt(width);
      data.height = Number.parseInt(height);

      this.$refs.cropper.setData(data);
    });

    window.debg = this;
  },
  beforeDestroy: function() {
    this.$eventBus.$off("changeCropSize");
    this.$eventBus.$off("changeAspectRatio");
    this.$eventBus.$off("resetAspectRatio");
  }
};
</script>

<style scoped>
.editor-wrapper {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.cropper {
  height: 425px;
  max-height: 425px;
}

.cropper-wrapper {
  position: relative;
}
.cropper-toolbar {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.cropper-toolbar > *:not(:first-child) {
  margin-left: 30px;
}

.cropper-zoombar {
  position: absolute;
  bottom: 75px;
  right: 15px;
  z-index: 1;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.cropper-zoombar > *:not(:last-child) {
  margin-bottom: 3px;
}

.rotate-buttons,
.reflect-buttons {
  display: flex;
  align-items: center;
}

.rotate-buttons > *:not(:first-child),
.reflect-buttons > *:not(:first-child) {
  margin-left: 3px;
}
</style>