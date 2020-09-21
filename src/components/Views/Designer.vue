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
      <elements-sidebar
        v-if="activeTool == 'elements'"
        :canvas="canvas"
        @processImages="converFilesForDrop"
      ></elements-sidebar>
    </div>
    <div class="canvas-container" ref="canvasContainer">
      <div class="toolbar" v-show="showToolbar" :class="{'sidebar-collapsed': !sidebarOpen}">
        <text-toolbar v-if="toolbarTypeSelected == 'text'" :canvas="canvas"></text-toolbar>
        <elements-toolbar v-if="toolbarTypeSelected == 'elements'" :canvas="canvas"></elements-toolbar>
      </div>

      <file-upload
        ref="dropElements"
        extensions="jpg,png,jpeg,svg,gif"
        :drop="true"
        @input="onDropElementFromPc"
      ></file-upload>

      <div
        class="canvas-wrapper"
        tabindex="0"
        @keydown.space="setPanning(true)"
        @keyup.space="setPanning(false)"
      >
        <canvas ref="c"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric-browseronly";
import { mapState } from "vuex";

import FontFaceObserver from "fontfaceobserver";
import * as Vibrant from "node-vibrant";

import BackgroundSidebarVue from "@/components/Designer/BackgroundSidebar.vue";
import TextSidebarVue from "@/components/Designer/TextSidebar.vue";
import TextToolbarVue from "@/components/Designer/TextToolbar.vue";
import ElementsSidebarVue from "@/components/Designer/Sidebars/ElementsSidebar.vue";
import ElementsToolbarVue from "../Designer/ElementsToolbar.vue";

fabric.Object.prototype.set({
  transparentCorners: false,
  borderColor: "cyan",
  cornerColor: "#ff9100",
  cornerSize: 10,
});

export default {
  name: "Designer",
  components: {
    "background-sidebar": BackgroundSidebarVue,
    "text-sidebar": TextSidebarVue,
    "text-toolbar": TextToolbarVue,
    "elements-toolbar": ElementsToolbarVue,
    "elements-sidebar": ElementsSidebarVue,
  },
  data: () => ({
    canvas: null,
    artboard: null,
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
      "saturation",
    ],
    rScaleFactor: null,
    zScaleFactor: null,
    toolbarTypeSelected: null,

    localRecentColors: [],
    isPanning: false,
  }),
  methods: {
    /**
     * DRY Event handler
     */
    updateSelection: function (e) {
      if (this.isPanning) {
        this.canvas.discardActiveObject();
        return;
      }
      const objType = e.target.get("type");
      const elementTypes = ["circle", "triangle", "line", "rect"];

      if (objType === "i-text" || objType === "textbox") {
        this.toolbarTypeSelected = "text";
      }

      if (elementTypes.includes(objType)) {
        this.toolbarTypeSelected = "elements";
      }
      this.$eventBus.$emit("updateSelection");
    },
    initCanvasEvents: function () {
      this.canvas.on("mouse:wheel", (opt) => {
        var delta = opt.e.deltaY * -1;
        var pointer = this.canvas.getPointer(opt.e);
        var zoom = this.canvas.getZoom();
        zoom = zoom + delta / 1000;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.05) zoom = 0.05;
        this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      const that = this;
      this.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (that.isPanning) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
          evt.stopPropagation();
        }
      });
      this.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          this.viewportTransform[4] += e.clientX - this.lastPosX;
          this.viewportTransform[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
      this.canvas.on("mouse:up", function (opt) {
        this.isDragging = false;
        this.selection = true;
        this.getObjects().map((object) => {
          object.setCoords();
          this.renderAll();
        });
      });
      this.canvas.on("selection:created", (e) => {
        this.updateSelection(e);
      });
      this.canvas.on("selection:updated", (e) => {
        this.updateSelection(e);
      });
      this.canvas.on("selection:cleared", (e) => {
        this.toolbarTypeSelected = null;
        // selected obj type namesto posebni booleans
        // if logika vo computed
      });
      this.canvas.on("object:modified", (e) => {
        if (e.target) {
          let obj = e.target;
          let objType = obj.get("type");

          if (objType === "i-text") {
            obj.fontSize *= obj.scaleX;
            obj.fontSize = obj.fontSize.toFixed(0);
            obj.scaleX = 1;
            obj.scaleY = 1;
            obj._clearCache();
          }

          this.$eventBus.$emit("updateSelection");
        }
      });
      this.canvas.on("object:scaled", (e) => {
        if (e.target) {
          let obj = e.target;

          // update gradient size on resize
          if (obj.type === 'i-text' && typeof obj.fill.coords !== "undefined") {
            obj.fill.coords.x1 = obj.fill.coords.x1 * obj.scaleX;
            obj.fill.coords.y1 = obj.fill.coords.y1 * obj.scaleY;
            obj.fill.coords.x2 = obj.fill.coords.x2 * obj.scaleX;
            obj.fill.coords.y2 = obj.fill.coords.y2 * obj.scaleY;
          }

          // obj.setCoords();
          // this.canvas.requestRenderAll();
        }
      });
    },
    initCanvas: function () {
      this.rScaleFactor = this.actualWidth / this.prefWidth;

      // ZOOM fit to screen
      if (
        this.cavnasContainerWidth <= this.prefWidth ||
        this.cavnasContainerHeight <= this.prefHeight
      ) {
        if (this.prefWidth > this.prefHeight) {
          this.zScaleFactor = this.cavnasContainerWidth / this.prefWidth;
        } else {
          this.zScaleFactor = this.cavnasContainerHeight / this.prefHeight;
        }
      } else {
        this.zScaleFactor = 1;
      }

      fabric.disableStyleCopyPaste = true;

      this.canvas = new fabric.Canvas(this.$refs.c, {
        width: 1600,
        height: 1600,
        preserveObjectStacking: true,
        controlsAboveOverlay: true,
        backgroundColor: "#fff",
      });

      this.initCanvasEvents();

      this.artboard = new fabric.Rect({
        top: 0,
        left: 0,
        width: this.prefWidth,
        height: this.prefHeight,
      });

      this.canvas.clipPath = this.artboard;

      this.canvas.setZoom(this.zScaleFactor);

      this.canvas.absolutePan(
        new fabric.Point(
          -((this.$refs.canvasContainer.offsetWidth + 250) / 2) +
            (this.artboard.width * this.zScaleFactor) / 2,
          -(this.$refs.canvasContainer.offsetHeight / 2) +
            (this.artboard.height * this.zScaleFactor) / 2
        )
      );

      let bgUrl = "";
      if (this.currentImage)
        bgUrl = this.currentImage.filePath
          ? this.currentImage.filePath
          : "file://" + this.currentImage.filename;

      fabric.Image.fromURL(
        bgUrl,
        (oImg) => {
          if (!this.currentSettings) return;

          let imageTextureSize =
            oImg.width > oImg.height ? oImg.width : oImg.height;

          if (imageTextureSize > fabric.textureSize) {
            fabric.textureSize = imageTextureSize;
          }

          fabric.Object.prototype.centeredRotation = false;
          oImg.rotate(this.currentSettings.cropData.rotate);
          oImg.setCoords();
          fabric.Object.prototype.centeredRotation = true;

          oImg
            .scale(1 / this.rScaleFactor)
            .set(
              "left",
              (this.currentSettings.cropData.x / this.rScaleFactor) * -1
            )
            .set(
              "top",
              (this.currentSettings.cropData.y / this.rScaleFactor) * -1
            );

          oImg.setCoords();

          oImg.selectable = false;

          this.canvas.add(oImg);
          this.background = oImg;
          this.generateSuggestedColors(bgUrl);

          // load some sample text
          const sampleJSON =
            '[{"type":"i-text","version":"3.5.0","originX":"left","originY":"top","left":317.35,"top":323.91,"width":437.5,"height":144.64,"fill":"rgba(255,255,255,1)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Doubt is","fontSize":"128","fontWeight":"normal","fontFamily":"Unica One","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}},{"type":"i-text","version":"3.5.0","originX":"left","originY":"top","left":496.35,"top":445.86,"width":99.64,"height":51.98,"fill":"rgba(255,255,255,1)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"the","fontSize":"46","fontWeight":"normal","fontFamily":"Krona One","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}},{"type":"i-text","version":"3.5.0","originX":"left","originY":"top","left":322.29,"top":463.94,"width":424.51,"height":188.71,"fill":"rgba(255,255,255,1)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Father","fontSize":"167","fontWeight":"normal","fontFamily":"Parisienne","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}},{"type":"i-text","version":"3.5.0","originX":"left","originY":"top","left":326.49,"top":628.47,"width":432.9,"height":59.89,"fill":"rgba(255,255,255,1)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"of invention.","fontSize":"53","fontWeight":"normal","fontFamily":"Krona One","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}},{"type":"i-text","version":"3.5.0","originX":"left","originY":"top","left":462.8,"top":729.13,"width":285.01,"height":28.25,"fill":"rgba(255,255,255,1)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"-AmbroseBierce","fontSize":"25","fontWeight":"normal","fontFamily":"Krona One","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}}]';
          const objects = JSON.parse(sampleJSON);
          fabric.util.enlivenObjects(objects, (objects) => {
            var origRenderOnAddRemove = this.canvas.renderOnAddRemove;
            this.canvas.renderOnAddRemove = false;

            objects.forEach((o) => {
              this.canvas.add(o);
            });

            this.canvas.renderOnAddRemove = origRenderOnAddRemove;
            this.canvas.renderAll();
          });
        },
        {
          crossOrigin: "Anonymous",
        }
      );
    },
    toggleSidebar: function () {
      this.sidebarOpen = !this.sidebarOpen;
    },
    exportToPc: function () {
      let originalTransform = this.canvas.viewportTransform;
      this.canvas.viewportTransform = fabric.iMatrix.slice(0);
      const dataUrl = this.canvas.toDataURL({
        top: 0,
        left: 0,
        width: this.prefWidth,
        height: this.prefHeight,
        format: "jpeg",
        quality: 0.8,
      });
      this.canvas.viewportTransform = originalTransform;
      // eslint-ignore-next-line
      chrome.downloads.download({ url: dataUrl });
    },
    generateSuggestedColors: function (path) {
      let img = new Image();
      if (path) {
        img.src = path;
      } else {
        img.src = this.canvas.toDataURL({
          top: 0,
          left: 0,
          width: this.prefWidth,
          height: this.prefHeight,
          format: "jpeg",
          quality: 0.3,
        });
      }
      Vibrant.from(img).getPalette((err, palette) => {
        this.$store.dispatch("designer/saveSuggestedColors", palette);
      });
    },
    setPanning: function (isPanning) {
      if (this.isPanning && isPanning) return;

      this.isPanning = isPanning;
      if (!this.isPanning) this.canvas.trigger("mouse:up");
    },
    onDropElementFromPc: function (drop) {
      if (!drop.length || !drop[0].file) {
        return;
      }

      for (let i = 0; i < drop.length; i++) {
        let type = drop[i].file.type;
        let url = URL.createObjectURL(drop[i].file);

        if (type == "image/svg+xml") {
          fabric.loadSVGFromURL(url, (objects, options) => {
            var obj = fabric.util.groupSVGElements(objects, options);
            if (obj.width > this.canvas.clipPath.width) {
              let ratio = this.canvas.clipPath.width / obj.width;
              obj.scale(ratio);
            }
            this.canvas.add(obj);
            this.canvas.setActiveObject(obj);
          });
        } else {
          fabric.Image.fromURL(url, (img) => {
            if (img.width > this.canvas.clipPath.width) {
              let ratio = this.canvas.clipPath.width / img.width;
              img.scale(ratio);
            }
            this.canvas.add(img);
            this.canvas.setActiveObject(img);
          });
        }

        this.canvas.requestRenderAll();
      }
    },
    converFilesForDrop: function (imageFiles) {
      imageFiles = [...imageFiles];
      let drop = [];
      imageFiles.map((file) => {
        drop.push({ file });
      });
      this.onDropElementFromPc(drop);
    },
  },
  computed: {
    cavnasContainerWidth: function () {
      return this.$refs.canvasContainer.clientWidth - 20;
    },
    cavnasContainerHeight: function () {
      return this.$refs.canvasContainer.clientHeight - 30;
    },
    currentSettings: {
      get: function () {
        return this.$store.state.exportData.platformOptions.find((opt) => {
          return this.$store.state.currentPlatformOptionSettings.id === opt.id;
        });
      },
      cache: false,
    },
    actualWidth: function () {
      if (this.currentSettings && this.currentSettings.cropData) {
        return this.currentSettings.cropData.width;
      }

      return 0;
    },
    actualHeight: function () {
      if (this.currentSettings && this.currentSettings.cropData) {
        return this.currentSettings.cropData.height;
      }
      return 0;
    },
    prefWidth: function () {
      if (this.currentSettings.cropperSettings.prefCroppedWidth) {
        return this.actualWidth >
          this.currentSettings.cropperSettings.prefCroppedWidth
          ? this.currentSettings.cropperSettings.prefCroppedWidth
          : this.actualWidth;
      }
      return this.actualWidth;
    },
    prefHeight: function () {
      if (this.currentSettings.cropperSettings.prefCroppedHeight) {
        return this.actualHeight >
          this.currentSettings.cropperSettings.prefCroppedHeight
          ? this.currentSettings.cropperSettings.prefCroppedHeight
          : this.actualHeight;
      }
      return this.actualHeight;
    },

    showToolbar: function () {
      return !!this.toolbarTypeSelected;
    },
    displayToolbarTypeSelected: function () {
      switch (this.toolbarTypeSelected) {
        case "text":
          return "Text Tool";
        case "elements":
          return "Elements";
        default:
          return "";
      }
    },
    ...mapState({
      currentImage: (state) => state.currentImage,
    }),
    ...mapState("designer", {
      activeTool: (state) => state.activeTool,
      fonts: (state) => state.fonts,
    }),
  },
  mounted() {
    let observers = [];
    this.fonts.map((font) => {
      let obs = new FontFaceObserver(font);
      observers.push(obs.load());
    });

    Promise.all(observers)
      .then(() => {
        this.initCanvas();
      })
      .catch(function (err) {
        // console.warn("Some critical font are not available:", err);
      });

    this.$eventBus.$on("exportToPc", this.exportToPc);
    this.$eventBus.$on("generateSuggestedColors", this.generateSuggestedColors);
    this.$eventBus.$on("openSidebar", () => (this.sidebarOpen = true));

    this.$store.dispatch("designer/loadPalettes");

    window.dbg = this;
  },
  beforeDestroy() {
    this.$eventBus.$off("exportToPc");
    this.$eventBus.$off("generateSuggestedColors");
  },
};
</script>

<style scoped>
.designer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: calc(100vh - 56px);
  transition: margin-left 0.2s ease-in-out;
  margin-left: 0;
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

  z-index: 2;
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
  /* padding: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  position: relative;
}

.canvas-wrapper {
  background: #bebebe;
  /* border: 1px solid black; */
  /* box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2); */
  overflow: hidden;
  height: 100%;
  outline: none;
}

.toolbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background: var(--background-secondary);
  z-index: 0;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  padding-left: 250px;
  transition: padding 0.2s ease-in-out;
  z-index: 1;
}

.toolbar.sidebar-collapsed {
  padding-left: 0;
}

.drag-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: var(--font-primary);
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>