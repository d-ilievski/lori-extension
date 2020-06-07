<template>
  <div class="designer" :class="{'sidebar-open':sidebarOpen}">
    <div class="sidebar" :class="{'open':sidebarOpen}">
      <div class="sidebar-toggle-btn" :class="{'open':sidebarOpen}" @click="toggleSidebar">
        <i class="icofont icofont-rounded-right"></i>
      </div>
      <background-sidebar
        v-if="activeTool == 'background'"
        :filters="filters"
        :canvas="canvas"
        :background="background"
      ></background-sidebar>
      <text-sidebar v-if="activeTool == 'text'" :canvas="canvas"></text-sidebar>
    </div>
    <div class="canvas-container" ref="canvasContainer">
      <div class="toolbar" v-if="false"></div>
      <div class="canvas-wrapper">
        <canvas ref="c"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric-browseronly";
import { mapState } from "vuex";
import BackgroundSidebarVue from "../Designer/BackgroundSidebar.vue";
import TextSidebarVue from "../Designer/TextSidebar.vue";

fabric.Object.prototype.set({
  transparentCorners: false,
  borderColor: "cyan",
  cornerColor: "#ff9100",
  cornerSize: 10
});

export default {
  name: "Designer",
  components: {
    "background-sidebar": BackgroundSidebarVue,
    "text-sidebar": TextSidebarVue
  },
  data: () => ({
    canvas: null,
    background: null,
    sidebarOpen: true,
    filters: [
      "grayscale",
      "blackwhite",
      "sepia",
      "vintage",
      "technicolor",
      "polaroid",
      "kodachrome",
      "brownie",
      "invert",
      "blur",
      "brightness",
      "contrast",
      "hue",
      "saturation"
    ],
    rScaleFactor: null,
    zScaleFactor: null
  }),
  methods: {
    initCanvas: function() {
      this.rScaleFactor = this.actualWidth / this.prefWidth;

      // ZOOM fit to screen
      if (
        this.cavnasContainerWidth <= this.prefWidth ||
        this.cavnasContainerHeight <= this.prefHeight
      ) {
        if (this.prefWidth > this.prefHeight) {
          this.zScaleFactor = this.prefWidth / this.cavnasContainerWidth;
        } else {
          this.zScaleFactor = this.prefHeight / this.cavnasContainerHeight;
        }
      } else {
        this.zScaleFactor = 1;
      }

      this.canvas = new fabric.Canvas(this.$refs.c, {
        width: this.prefWidth / this.zScaleFactor,
        height: this.prefHeight / this.zScaleFactor,
        preserveObjectStacking: true
      });

      let bgUrl = "";
      if (this.currentImage)
        bgUrl = this.currentImage.filePath
          ? this.currentImage.filePath
          : "file://" + this.currentImage.filename;

      fabric.Image.fromURL(bgUrl, oImg => {
        if (!this.currentSettings) return;

        let imageTextureSize =
          oImg.width > oImg.height ? oImg.width : oImg.height;

        if (imageTextureSize > fabric.textureSize) {
          fabric.textureSize = imageTextureSize;
        }

        oImg
          .rotate(this.currentSettings.cropData.rotate)
          .scale((1 / this.zScaleFactor) * (1 / this.rScaleFactor))
          .set(
            "left",
            (this.currentSettings.cropData.x / this.rScaleFactor) *
              (1 / this.zScaleFactor) *
              -1
          )
          .set(
            "top",
            (this.currentSettings.cropData.y / this.rScaleFactor) *
              (1 / this.zScaleFactor) *
              -1
          );

        oImg.setCoords();

        this.canvas.add(oImg);
        this.background = oImg;
      });
    },
    toggleSidebar: function() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  },
  computed: {
    cavnasContainerWidth: function() {
      return this.$refs.canvasContainer.clientWidth - 20;
    },
    cavnasContainerHeight: function() {
      return this.$refs.canvasContainer.clientHeight - 30;
    },
    currentSettings: {
      get: function() {
        return this.$store.state.exportData.platformOptions.find(opt => {
          return this.$store.state.currentPlatformOptionSettings.id === opt.id;
        });
      },
      cache: false
    },
    actualWidth: function() {
      if (this.currentSettings && this.currentSettings.cropData) {
        return this.currentSettings.cropData.width;
      }

      return 0;
    },
    actualHeight: function() {
      if (this.currentSettings && this.currentSettings.cropData) {
        return this.currentSettings.cropData.height;
      }
      return 0;
    },
    prefWidth: function() {
      if (this.currentSettings.cropperSettings.prefCroppedWidth) {
        return this.actualWidth >
          this.currentSettings.cropperSettings.prefCroppedWidth
          ? this.currentSettings.cropperSettings.prefCroppedWidth
          : this.actualWidth;
      }
      return this.actualWidth;
    },
    prefHeight: function() {
      if (this.currentSettings.cropperSettings.prefCroppedHeight) {
        return this.actualHeight >
          this.currentSettings.cropperSettings.prefCroppedHeight
          ? this.currentSettings.cropperSettings.prefCroppedHeight
          : this.actualHeight;
      }
      return this.actualHeight;
    },
    ...mapState({
      currentImage: state => state.currentImage
    }),
    ...mapState("designer", {
      activeTool: state => state.activeTool
    })
  },
  mounted() {
    this.initCanvas();

    window.dbg = this;
  }
};
</script>

<style scoped>
.designer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: calc(100vh - 56px);
  background: #bebebe;
  transition: margin-left 0.2s ease-in-out;
  margin-left: 0;
}
.designer.sidebar-open {
  margin-left: 250px;
}

.sidebar {
  height: 100%;
  position: absolute;
  top: 0;
  left: -194px;

  background: var(--background-primary);
  width: 250px;

  box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.1);
  transition: left 0.2s ease-in-out;

  z-index: 1;
}

.sidebar.open {
  left: 56px;
}

.sidebar-toggle-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -15px;
  width: 20px;
  height: 45px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--round-xs);
  font-family: var(--font-primary);
  font-weight: bold;
  transition: transform 0.2s ease;
}

.sidebar-toggle-btn.open i {
  transform: rotateY(180deg);
}

.sidebar-toggle-btn:hover {
  color: var(--primary);
  cursor: pointer;
}

.canvas-container {
  flex: 1;
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  position: relative;
}

.canvas-wrapper {
  background: #fff;
  /* border: 1px solid black; */
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);
}

.toolbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background: var(--background-secondary);
  z-index: 1;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}
</style>