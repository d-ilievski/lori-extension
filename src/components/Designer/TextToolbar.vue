<template>
  <div class="text-toolbar">
    <div class="font-family">
      <v-select
        class="font-picker"
        :options="fonts"
        v-model="fontFamily"
        @input="updateFontFamily"
        autocomplete
        :clearable="false"
      >
        <template #option="{ label }">
          <h3 :style="{fontFamily: label}">{{label}}</h3>
        </template>
      </v-select>
    </div>
    <div class="font-size">
      <input-field
        v-model="fontSize"
        @input="updateFontSize"
        @submit="updateFontSize"
        type="number"
        width="50px"
      ></input-field>
    </div>
    <div class="font-style">
      <div class="toolbar-button" :class="{'active': isBold}" @click="toggleBold">
        <i class="icofont icofont-bold"></i>
      </div>
      <div class="toolbar-button" :class="{'active': isItalic}" @click="toggleItalic">
        <i class="icofont icofont-italic"></i>
      </div>
      <div class="toolbar-button" :class="{'active': isUnderline}" @click="toggleUnderline">
        <i class="icofont icofont-underline"></i>
      </div>
    </div>
    <div class="alignment">
      <div class="toolbar-button" title="Alignment" @click="toggleAlignment">
        <i class="icofont" :class="alignmentIconClass"></i>
      </div>
    </div>
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
    <div class="stroke-picker">
      <label>Stroke:</label>
      <div class="color-indicator"></div>
      <stroke-toolbar-dropdown
        :canvas="canvas"
        :show="showStrokeDropdown"
        @setStrokeColor="setStroke"
        :value="stroke"
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
import { mapState } from "vuex";

export default {
  name: "text-toolbar",
  components: {
    "fill-toolbar-dropdown": FillToolbarDropdownVue
  },
  props: {
    canvas: Object
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
    shadow: null,
    showFillDropdown: false,
    showStrokeDropdown: false
  }),
  computed: {
    currentSelection: {
      cache: false,
      get: function() {
        return this.canvas.getActiveObject();
      }
    },
    alignmentIconClass: function() {
      if (this.alignment === "left") return "icofont-align-left";
      if (this.alignment === "center") return "icofont-align-center";
      if (this.alignment === "right") return "icofont-align-right";
      if (this.alignment === "justify") return "icofont-justify-all";
      return "align-left";
    },
    ...mapState("designer", {
      fonts: state => state.fonts
    })
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
    },
    updateFontFamily: function() {
      this.currentSelection.fontFamily = this.fontFamily;
      this.currentSelection.setCoords();
      this.canvas.renderAll();
    },
    updateFontSize: function() {
      this.currentSelection.fontSize = this.fontSize;
      this.canvas.renderAll();
    },
    toggleBold: function() {
      this.isBold = !this.isBold;
      this.currentSelection.fontWeight = this.isBold ? "bold" : "normal";
      this.canvas.renderAll();
    },
    toggleItalic: function() {
      this.isItalic = !this.isItalic;
      this.currentSelection.fontStyle = this.isItalic ? "italic" : "";
      this.canvas.renderAll();
    },
    toggleUnderline: function() {
      this.isUnderline = !this.isUnderline;
      this.currentSelection.set("underline", this.isUnderline);
      this.canvas.requestRenderAll();
    },
    toggleAlignment: function() {
      if (this.alignment === "left") this.alignment = "center";
      else if (this.alignment === "center") this.alignment = "right";
      else if (this.alignment === "right") this.alignment = "justify";
      else if (this.alignment === "justify") this.alignment = "left";

      this.currentSelection.set("textAlign", this.alignment);
      this.canvas.requestRenderAll();
    },
    toggleFillDropdown: function() {
      this.showFillDropdown = !this.showFillDropdown;
    },
    toggleStrokeDropdown: function() {
      this.showStrokeDropdown = !this.showStrokeDropdown;
    },
    setFill: function(color) {
      this.fill = color;
      this.currentSelection.setGradient("fill", null);

      if (!color) {
        this.currentSelection.set("fill", this.fill);
        this.canvas.requestRenderAll();
        return;
      }

      if (typeof color.x1 !== "undefined") {
        this.currentSelection.setGradient("fill", color);
        this.canvas.requestRenderAll();
        return;
      }

      this.currentSelection.set("fill", this.fill);
      this.canvas.requestRenderAll();
    },
    toggleFillPicker: function() {
      this.showFillPicker = !this.showFillPicker;
    },
    setStroke: function() {

    }
  },
  mounted: function() {
    if (this.currentSelection) {
      this.mapSelectionProperties();
    }

    this.$eventBus.$on("updateSelection", this.mapSelectionProperties);
  },
  beforeDestroy: function() {
    this.$eventBus.$off("updateSelection");
  }
};
</script>

<style scoped>
.text-toolbar {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-left: 20px;
}
.text-toolbar > * {
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

.font-style {
  display: flex;
  align-items: center;
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
.font-family {
  width: 160px;
}
</style>

<style>
.font-picker .vs__dropdown-toggle {
  /* background: var(--background-primary); */
  color: var(--text-primary);
  border-color: var(--primary-light);
  border-width: .5px;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.font-picker .vs__dropdown-toggle {
  /* background: var(--background-primary); */
  color: var(--text-primary);
  border-color: var(--primary-light);
  border-width: .5px;
  border-radius: var(--round-xs);
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.font-picker .vs__dropdown-menu {
  width: 250px;
  top: calc(100% + 7px);
  color: var(--font-primary);
  background: var(--background-secondary);
  border: none;
  box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.15);
}

.font-picker .vs__option:hover {
  background: var(--primary);
}

.font-picker .vs__open-indicator {
  fill: var(--primary);
}
</style>