<template>
  <colors-dropdown v-show="show">
    <div class="section">
      <div class="row">
        <label>Pick Color</label>
      </div>
      <div class="swatch-container">
        <div class="swatch color" @click="toggleFillPicker" :class="{'active':showFillPicker}"></div>
        <div
          class="swatch gradient"
          @click="toggleGradientPicker"
          :class="{'active':showGradientPicker}"
        ></div>
        <div class="swatch none" @click="setStroke(null)" :class="{'active':!value}"></div>
        <div class="stroke-width">
          <input-field min="0" type="number" :value="width" @input="setStrokeWidth"></input-field>
        </div>
        <switcher-buttons
          noShadow
          class="stroke-style"
          :buttons="[{icon: 'gg-display-flex', value: 'fill', title: 'Stroke Inside'},{icon: 'gg-display-spacing', value: 'stroke', title: 'Stroke Outside'}]"
          :value="direction"
          @input="setStrokeDirection"
        ></switcher-buttons>
      </div>
      <color-picker
        :color="activeColor"
        :onStartChange="setStroke"
        :onChange="setStroke"
        :onEndChange="setStroke"
        v-if="showFillPicker"
      ></color-picker>
      <color-picker
        v-if="showGradientPicker"
        :gradient="activeColor"
        :onStartChange="setStroke"
        :onChange="setStroke"
        :onEndChange="setStroke"
        isGradient
      ></color-picker>
    </div>
    <div class="section">
      <div class="row">
        <label>Color Suggestion</label>
      </div>
      <div class="row">
        <div class="swatch-container">
          <template v-for="(color, index) in suggestedColors">
            <div
              :key="index"
              :style="{background: color}"
              class="swatch"
              @click="setStroke(color)"
              :class="{'active':value === color}"
            ></div>
          </template>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <label>Palettes</label>
      </div>
      <div class="row">
        <div class="swatch-container palettes">
          <template v-for="(palette) in colorPalettes">
            <div :key="palette[0]+palette[1]+palette[2]" class="palette">
              <template v-for="(color, index) in palette">
                <div
                  :key="index+palette[0]+color"
                  :style="{background: color}"
                  class="swatch"
                  @click="setStroke(color)"
                  :class="{'active':value === color}"
                ></div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </colors-dropdown>
</template>

<script>
import ColorsDropdownVue from "./ColorsDropdown.vue";
import { mapState } from "vuex";
import u from "@/util/utils";

export default {
  name: "fill-toolbar-dropdown",
  components: {
    "colors-dropdown": ColorsDropdownVue
  },
  props: {
    show: Boolean,
    value: [String, Object],
    width: Number,
    direction: String,
    canvas: Object
  },
  data: () => ({
    showFillPicker: false,
    showGradientPicker: false,
    strokeStyle: null,
    strokeWidth: null,
    strokeDirection: null
  }),
  computed: {
    activeColor: {
      deep: true,
      get: function() {
        if (!this.value) return;

        if (typeof this.value.colorStops !== "undefined") {
          let transformed = {
            type: this.value.type,
            degree: 0,
            points: []
          };
          for (const index in this.value.colorStops) {
            const stop = this.value.colorStops[index];
            let { red, green, blue, alpha } = u.rgbToObject(
              stop.color ? stop.color : stop
            );

            transformed.points.push({
              left: stop.offset * 100,
              red,
              green,
              blue,
              alpha: stop.opacity ? stop.opacity : alpha
            });
          }
          return transformed;
        }

        if (this.value.charAt(0) === "#") {
          return u.hexToRgb(this.value);
        } else {
          return u.rgbToObject(this.value);
        }
      }
    },
    ...mapState("designer", {
      suggestedColors: state => state.suggestedColors,
      colorPalettes: state => state.colorPalettes
    })
  },
  methods: {
    toggleFillPicker: function() {
      this.showGradientPicker = false;
      this.showFillPicker = !this.showFillPicker;
    },
    toggleGradientPicker: function() {
      this.showFillPicker = false;
      this.showGradientPicker = !this.showGradientPicker;
    },
    setStroke: function(color) {
      // no stroke
      if (!color) {
        this.showFillPicker = false;
        this.strokeWidth = null;
        this.strokeStyle = null;
        this.$emit("setStroke", {
          stroke: this.strokeStyle,
          strokeWidth: this.strokeWidth,
          strokeDirection: this.strokeDirection
        });
        return;
      }

      // gradient
      if (color.type === "linear" || color.type === "radial") {
        let transformed = {
          type: color.type,
          x1: 0,
          x2: this.canvas.getActiveObject().width,
          y1: 0,
          y2: 0,
          colorStops: {}
        };
        color.points.map(point => {
          transformed.colorStops[
            (point.left / 100).toFixed(3)
          ] = `rgba(${point.red},${point.green},${point.blue},${point.alpha})`;
        });

        if (color.type === "radial") {
          transformed.r1 = this.canvas.getActiveObject().width;
          transformed.r2 = 2;
          transformed.x1 = this.canvas.getActiveObject().width / 2;
          transformed.x2 = this.canvas.getActiveObject().width / 2;
          transformed.y1 = this.canvas.getActiveObject().height;
          transformed.y2 = this.canvas.getActiveObject().height;
        }

        if (!this.strokeWidth) this.strokeWidth = 1;
        this.strokeStyle = transformed;

        this.$emit("setStroke", {
          stroke: this.strokeStyle,
          strokeWidth: this.strokeWidth,
          strokeDirection: this.strokeDirection
        });
        return;
      }

      // coming from picker
      if (color.style) {
        if (!this.strokeWidth) this.strokeWidth = 1;
        this.strokeStyle = color.style;

        this.$emit("setStroke", {
          stroke: this.strokeStyle,
          strokeWidth: this.strokeWidth,
          strokeDirection: this.strokeDirection
        });
        return;
      }

      // coming from swatch
      if (!this.strokeWidth) this.strokeWidth = 1;
      this.strokeStyle = color;
      this.$emit("setStroke", {
        stroke: this.strokeStyle,
        strokeWidth: this.strokeWidth,
        strokeDirection: this.strokeDirection
      });
    },
    setStrokeWidth: function(value) {
      this.strokeWidth = Number.parseFloat(value);
      this.$emit("setStroke", {
        stroke: this.strokeStyle,
        strokeWidth: this.strokeWidth,
        strokeDirection: this.strokeDirection
      });
    },
    setStrokeDirection: function(value) {
      this.strokeDirection = value;
      this.$emit("setStroke", {
        stroke: this.strokeStyle,
        strokeWidth: this.strokeWidth,
        strokeDirection: this.strokeDirection
      });
    }
  },
  watch: {
    value: function(newValue) {
      this.strokeStyle = newValue;
    },
    width: function(newWidth) {
      this.strokeWidth = newWidth;
    },
    direction: function(newDirection) {
      this.strokeDirection = newDirection;
    },
  },
  mounted() {
  }
};
</script>

<style scoped>
* {
  user-select: none;
}

.section {
  margin-bottom: 15px;
}

.swatch-container {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.swatch-container.palettes {
  display: block;
  width: 100%;
  padding: 10px 0;
}

.swatch-container.palettes .palette {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
}

.swatch-container.palettes .swatch {
  width: 40px;
  height: 40px;
}

.swatch-container .swatch {
  padding: 5px;
  width: 30px;
  height: 30px;
  border-radius: var(--round-xs);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.15);
}
.swatch-container .swatch.active {
  border: 2px solid var(--primary);
  box-shadow: none;
}
.swatch-container .swatch:hover {
  cursor: pointer;
}

.swatch-container .swatch:not(:first-child) {
  margin-left: 7px;
}

.swatch.none {
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

.swatch.color {
  background: linear-gradient(
    to right,
    hsl(0, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(240, 100%, 50%)
  );
}
.swatch.gradient {
  background: linear-gradient(to right, #001580, #00ffe1);
}

.stroke-width {
  width: 60px;
  margin-left: 15px;
}
.stroke-style {
  margin-left: 5px;
}
</style>