<template>
  <div class="shadow-toolbar-picker">
    <div class="toolbar-button" @click="toggleDropdown">
      <div class="shadows-icon"></div>
    </div>
    <div class="shadows-dropdown" v-if="open">
      <div class="section">
        <div class="row">
          <label>Set Shadow</label>
        </div>
      </div>
      <div class="section">
        <div class="row">
          <label>Color</label>
        </div>
        <div class="row">
          <div
            :class="[{ active: showColorPicker }, 'color-indicator']"
            @click="toggleColorPicker"
            :style="cssColor"
          ></div>
          <custom-button
            v-show="showColorPicker"
            @click="toggleColorPicker"
            type="primary"
            >OK</custom-button
          >
          <div class="clear-shadow-button" v-if="hasShadow">
            <icon-button
              noShadow
              icon="icofont-trash"
              @click="removeShadow"
            ></icon-button>
          </div>
        </div>
      </div>
      <!-- PICKER SECTION -->
      <div class="section color-picker-container" v-if="showColorPicker">
        <color-picker
          :color="color"
          :onStartChange="setColor"
          :onChange="setColor"
          :onEndChange="setColor"
        ></color-picker>
      </div>
      <!-- END PICKER SECTION -->
      <div class="section">
        <div class="row">
          <div class="col">
            <label>Offset X</label>
            <input-field
              type="number"
              v-model="offsetX"
              @input="setShadow"
            ></input-field>
          </div>
          <div class="col">
            <label>Offset Y</label>
            <input-field
              type="number"
              v-model="offsetY"
              @input="setShadow"
            ></input-field>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Blur</label>
            <input-field
              type="number"
              min="0"
              v-model="blur"
              @input="setShadow"
            ></input-field>
          </div>
          <div class="col"></div>
        </div>
      </div>
      <div class="section">
        <div class="row">
          <custom-checkbox v-model="affectStroke" @input="setShadow"
            >Affect Stroke</custom-checkbox
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import u from '@/util/utils';

export default {
  name: "ShadowsToolbarButton",
  props: {
    canvas: Object,
  },
  data: () => ({
    open: false,
    showColorPicker: false,
    affectStroke: true,
    color: {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },
    blur: 0,
    offsetX: 0,
    offsetY: 0,
    hasShadow: false,
  }),

  methods: {
    toggleDropdown: function () {
      this.open = !this.open;
      if (this.open) this.$emit("dropdownOpen");
    },
    setColor: function (color) {
      this.color = { ...color };
      this.setShadow();
    },
    toggleColorPicker: function () {
      this.showColorPicker = !this.showColorPicker;
    },
    setShadow: function () {
      this.currentSelection.setShadow({
        color: `rgba(${this.color.red}, ${this.color.green}, ${
          this.color.blue
        }, ${this.color.alpha * 100})`,

        blur: Number.parseInt(this.blur),
        offsetX: Number.parseInt(this.offsetX),
        offsetY: Number.parseInt(this.offsetY),
        affectStroke: this.affectStroke,
      });

      this.hasShadow = true;
      this.canvas.requestRenderAll();
    },
    removeShadow: function () {
      this.currentSelection.setShadow(null);
      this.hasShadow = false;
      this.offsetY = this.offsetX = this.blur = 0;
      this.canvas.requestRenderAll();
    },
  },
  computed: {
    currentSelection: function () {
      return this.canvas.getActiveObject();
    },
    cssColor: function () {
      return `background: rgba(${this.color.red}, ${this.color.green}, ${
        this.color.blue
      }, ${this.color.alpha * 100});`;
    },
  },
  mounted() {
    
    if (this.currentSelection.shadow) {
      this.hasShadow = true;
      const {
        color,
        blur,
        offsetX,
        offsetY,
        affectStroke,
      } = this.currentSelection.shadow;
      this.color = u.rgbToObject(color);
      this.blur = blur;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.affectStroke = affectStroke;
    }
  },
};
</script>

<style scoped>
.section {
  margin-bottom: 10px;
}

.row {
  margin-bottom: 10px;
}

.shadow-toolbar-picker {
  position: relative;
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

.shadows-icon {
  width: 10px;
  height: 10px;
  background: var(--text-primary);
  transform: skew(-30deg, 0deg) translateY(-2px);
  box-shadow: 3px 5px 0px 0px var(--primary);
}

.shadows-dropdown {
  position: absolute;
  background: var(--background-secondary);
  top: calc(100% + 5px);
  left: 5px;
  max-height: 390px;
  width: 270px;
  border-radius: 0 0 var(--round-xs) var(--round-xs);
  box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.15);
  z-index: 0;
  overflow: hidden auto;

  padding: 10px;
}

.color-picker-container {
  padding-right: 10px;
}

.color-indicator {
  width: 30px;
  height: 30px;
  border-radius: var(--round-xs);
  cursor: pointer;
  margin-right: 10px;
  box-shadow: 0px 5px 4px 2px rgba(0, 0, 0, 0.2);
}

.color-indicator.active {
  box-shadow: none;
}

.clear-shadow-button {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}
</style>