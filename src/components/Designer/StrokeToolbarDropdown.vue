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
        <div class="swatch none" @click="setFillColor(null)" :class="{'active':!value}"></div>
      </div>
      <color-picker
        :color="activeColor"
        :onStartChange="setFillColor"
        :onChange="setFillColor"
        :onEndChange="setFillColor"
        v-if="showFillPicker"
      ></color-picker>
      <color-picker
        v-if="showGradientPicker"
        :gradient="activeColor"
        :onStartChange="setFillColor"
        :onChange="setFillColor"
        :onEndChange="setFillColor"
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
              @click="setFillColor(color)"
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
                  @click="setFillColor(color)"
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
    canvas: Object
  },
  data: () => ({
    showFillPicker: false,
    showGradientPicker: false
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
    setFillColor: function(color) {
      // no fill
      if (!color) {
        this.showFillPicker = false;
        this.$emit("setFillColor", null);
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

        this.$emit("setFillColor", transformed);
        return;
      }

      // coming from picker
      if (color.style) {
        this.$emit("setFillColor", color.style);
        return;
      }

      // coming from swatch
      this.$emit("setFillColor", color);
    }
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
</style>