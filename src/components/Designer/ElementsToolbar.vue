<template>
  <div class="elements-toolbar">
    <div class="toolbar-name">Element</div>
    <div class="fill-picker" :class="{'active': showFillDropdown}">
      <div class="button" @click="toggleFillDropdown">
        <label>Fill:</label>
        <div class="color-indicator" :style="{background: fill}"></div>
      </div>
      <fill-toolbar-dropdown
        :canvas="canvas"
        :show="showFillDropdown"
        @setFillColor="setFill"
        :value="fill"
      ></fill-toolbar-dropdown>
    </div>
    <div class="stroke-picker" :class="{'active': showStrokeDropdown}">
      <div class="button" @click="toggleStrokeDropdown">
        <label>Stroke:</label>
        <div class="color-indicator" :style="{background: stroke}"></div>
      </div>
      <stroke-toolbar-dropdown
        :canvas="canvas"
        :show="showStrokeDropdown"
        @setStroke="setStroke"
        :value="stroke"
        :width="strokeWidth"
        :direction="strokeDirection"
      ></stroke-toolbar-dropdown>
    </div>
    <div class="shadow-picker">
      <div class="toolbar-button">
        <div class="shadow-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import FillToolbarDropdownVue from "./FillToolbarDropdown.vue";
import StrokeToolbarDropdownVue from "./StrokeToolbarDropdown.vue";
import { mapState } from "vuex";
import debounce from "lodash/debounce";
import { setGradient } from "../../util/gradientUtils";

export default {
  name: "elements-toolbar",
  components: {
    "fill-toolbar-dropdown": FillToolbarDropdownVue,
    "stroke-toolbar-dropdown": StrokeToolbarDropdownVue,
  },
  props: {
    canvas: Object,
  },
  data: () => ({
    fontFamily: null,
    fontSize: null,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    alignment: null,
    fill: null,
    stroke: null,
    strokeWidth: null,
    strokeDirection: null,
    shadow: null,
    showFillDropdown: false,
    showStrokeDropdown: false,
  }),
  computed: {
    currentSelection: {
      cache: false,
      get: function () {
        return this.canvas.getActiveObject();
      },
    },
    alignmentIconClass: function () {
      if (this.alignment === "left") return "icofont-align-left";
      if (this.alignment === "center") return "icofont-align-center";
      if (this.alignment === "right") return "icofont-align-right";
      if (this.alignment === "justify") return "icofont-justify-all";
      return "align-left";
    },
    ...mapState("designer", {
      fonts: (state) => state.fonts,
    }),
  },
  methods: {
    mapSelectionProperties() {
      this.fontFamily = this.currentSelection.fontFamily;
      this.fontSize = this.currentSelection.fontSize;
      this.isBold = this.currentSelection.fontWeight === "bold";
      this.isItalic = this.currentSelection.fontStyle === "italic";
      this.isUnderline = this.currentSelection.get("underline");
      this.alignment = this.currentSelection.textAlign;
      this.fill = this.currentSelection.fill;
      this.stroke = this.currentSelection.stroke;
      this.strokeWidth = this.currentSelection.strokeWidth;
      this.strokeDirection = this.currentSelection.paintFirst;
    },
    updateFontFamily: function () {
      this.currentSelection.fontFamily = this.fontFamily;
      this.currentSelection.setCoords();
      this.canvas.renderAll();
    },
    updateFontSize: function () {
      this.currentSelection.fontSize = this.fontSize;
      this.canvas.renderAll();
    },
    toggleBold: function () {
      this.isBold = !this.isBold;
      this.currentSelection.fontWeight = this.isBold ? "bold" : "normal";
      this.canvas.renderAll();
    },
    toggleItalic: function () {
      this.isItalic = !this.isItalic;
      this.currentSelection.fontStyle = this.isItalic ? "italic" : "";
      this.canvas.renderAll();
    },
    toggleUnderline: function () {
      this.isUnderline = !this.isUnderline;
      this.currentSelection.set("underline", this.isUnderline);
      this.canvas.requestRenderAll();
    },
    toggleAlignment: function () {
      if (this.alignment === "left") this.alignment = "center";
      else if (this.alignment === "center") this.alignment = "right";
      else if (this.alignment === "right") this.alignment = "justify";
      else if (this.alignment === "justify") this.alignment = "left";

      this.currentSelection.set("textAlign", this.alignment);
      this.canvas.requestRenderAll();
    },
    toggleFillDropdown: function () {
      this.showFillDropdown = !this.showFillDropdown;
      if (this.showFillDropdown) this.showStrokeDropdown = false;
    },
    toggleStrokeDropdown: function () {
      this.showStrokeDropdown = !this.showStrokeDropdown;
      if (this.showStrokeDropdown) this.showFillDropdown = false;
    },
    setFill: function (color) {
      this.fill = color;
      this.currentSelection.setGradient("fill", null);

      if (!color) {
        this.currentSelection.set("fill", this.fill);
        this.canvas.requestRenderAll();
        return;
      }

      if (typeof color.x1 !== "undefined") {
        if (color.type === "linear") {
          setGradient(this.currentSelection, color.degree, color.colorStops);
        } else {
          this.currentSelection.setGradient("fill", color);
        }
        this.canvas.requestRenderAll();
        return;
      }

      this.currentSelection.set("fill", this.fill);
      this.canvas.requestRenderAll();
    },
    toggleFillPicker: function () {
      this.showFillPicker = !this.showFillPicker;
    },
    setStroke: debounce(function ({ stroke, strokeWidth, strokeDirection }) {
      this.stroke = stroke;
      this.strokeWidth = strokeWidth;
      this.currentSelection.setGradient("stroke", null);

      this.currentSelection.set("paintFirst", strokeDirection);
      this.strokeDirection = strokeDirection;

      if (!stroke) {
        this.currentSelection.set("stroke", this.stroke);
        this.currentSelection.set("strokeWidth", this.strokeWidth);
        this.canvas.requestRenderAll();
        return;
      }

      if (typeof stroke.x1 !== "undefined") {
        this.currentSelection.setGradient("stroke", stroke);
        this.currentSelection.set("strokeWidth", strokeWidth);
        this.canvas.requestRenderAll();
        return;
      }

      this.currentSelection.set("stroke", this.stroke);
      this.currentSelection.set("strokeWidth", this.strokeWidth);
      this.canvas.requestRenderAll();
    }, 250),
  },

  mounted: function () {
    if (this.currentSelection) {
      this.mapSelectionProperties();
    }

    this.$eventBus.$on("updateSelection", this.mapSelectionProperties);
  },
  beforeDestroy: function () {
    this.$eventBus.$off("updateSelection");
  },
};
</script>

<style scoped>
.elements-toolbar {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}
.elements-toolbar > * {
  padding: 0 5px;
}

.toolbar-button {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  border-radius: var(--round-xs);
  border: 1px solid transparent;
  margin: 0 1px;
}
.toolbar-button:hover,
.toolbar-button.active {
  border-color: var(--primary);
  color: var(--primary);
  cursor: pointer;
}

.stroke-picker,
.fill-picker {
  position: relative;
}

.stroke-picker,
.fill-picker .button {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.stroke-picker label,
.fill-picker label {
  color: var(--text-primary);
}
.stroke-picker:hover label,
.fill-picker:hover label,
.stroke-picker.active label,
.fill-picker.active label {
  color: var(--primary);
}

.color-indicator {
  margin-left: 10px;
  border-radius: 50%;
  border: 0.5px solid var(--text-secondary);
  width: 25px;
  height: 25px;
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 43%,
      #ff0000 45%,
      #ff0000 55%,
      rgba(0, 0, 0, 0) 57%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      135deg,
      #fff 0%,
      #fff 43%,
      #ff0000 45%,
      #ff0000 55%,
      #fff 57%,
      #fff 100%
    );
}
.shadow-icon {
  width: 10px;
  height: 10px;
  background: var(--text-primary);
  transform: skew(-30deg, 0deg) translateY(-2px);
  box-shadow: 3px 5px 0px 0px var(--primary);
}

.toolbar-name {
  max-width: 75px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  font-family: var(--font-primary);
  font-weight: bold;
  color: var(--primary);
}
</style>