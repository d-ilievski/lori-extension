<template>
  <div class="background-sidebar">
    <div class="section">
      <div class="row">
        <label class="title">Background Filters</label>
      </div>
      <div class="filter-wrapper">
        <div class="filter-row">
          <!-- <div class="filter blur">Blur</div> -->
          <div
            :class="{'active':activeFilters.includes('grayscale')}"
            class="filter grayscale"
            @click="toggleFilter('grayscale')"
          >Grayscale</div>
          <div
            :class="{'active':activeFilters.includes('blackwhite')}"
            class="filter blackwhite"
            @click="toggleFilter('blackwhite')"
          >B&W</div>
          <div
            :class="{'active':activeFilters.includes('sepia')}"
            class="filter sepia"
            @click="toggleFilter('sepia')"
          >Sepia</div>
        </div>
        <div class="filter-row">
          <div
            :class="{'active':activeFilters.includes('vintage')}"
            class="filter vintage"
            @click="toggleFilter('vintage')"
          >Vintage</div>
          <div
            :class="{'active':activeFilters.includes('technicolor')}"
            class="filter technicolor"
            @click="toggleFilter('technicolor')"
          >Technicolor</div>
          <div
            :class="{'active':activeFilters.includes('polaroid')}"
            class="filter polaroid"
            @click="toggleFilter('polaroid')"
          >Polaroid</div>
        </div>
        <div class="filter-row">
          <div
            :class="{'active':activeFilters.includes('kodachrome')}"
            class="filter kodachrome"
            @click="toggleFilter('kodachrome')"
          >Kodachrome</div>
          <div
            :class="{'active':activeFilters.includes('brownie')}"
            class="filter brownie"
            @click="toggleFilter('brownie')"
          >Brownie</div>
          <div
            :class="{'active':activeFilters.includes('invert')}"
            class="filter invert"
            @click="toggleFilter('invert')"
          >Invert</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <label class="title">Blur Amount</label>
      </div>
      <div class="row">
        <div class="control">
          <input
            @input="setBlur"
            v-model="blurAmount"
            type="range"
            min="0"
            max="100"
            class="custom-slider"
          />
        </div>
        <div class="display">{{blurAmount}}%</div>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <label class="title">Brightness</label>
      </div>
      <div class="row">
        <div class="control">
          <input
            @input="setBrightness"
            v-model="brightnessAmount"
            type="range"
            min="-100"
            max="100"
            class="custom-slider"
          />
        </div>
        <div class="display">{{brightnessAmount}}%</div>
      </div>
      <div class="row">
        <label class="title">Contrast</label>
      </div>
      <div class="row">
        <div class="control">
          <input
            @input="setContrast"
            v-model="contrastAmount"
            type="range"
            min="-100"
            max="100"
            class="custom-slider"
          />
        </div>
        <div class="display">{{contrastAmount}}%</div>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <label class="title">Hue</label>
      </div>
      <div class="row">
        <div class="control">
          <input
            @input="setHue"
            v-model="hueAmount"
            type="range"
            min="-100"
            max="100"
            class="custom-slider hue"
          />
        </div>
        <div class="display">{{hueAmount}}</div>
      </div>
      <div class="row">
        <label class="title">Saturation</label>
      </div>
      <div class="row">
        <div class="control">
          <input
            @input="setSaturation"
            v-model="saturationAmount"
            type="range"
            min="-100"
            max="100"
            class="custom-slider"
          />
        </div>
        <div class="display">{{saturationAmount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric-browseronly";
import debounce from "lodash/debounce";

export default {
  name: "background-sidebar",
  props: {
    filters: Array,
    canvas: Object,
    background: Object
  },
  data: () => ({
    blurAmount: 0,
    brightnessAmount: 0,
    contrastAmount: 0,
    hueAmount: 0,
    saturationAmount: 0,
    activeFilters: []
  }),
  methods: {
    toggleFilter: function(filter) {
      if (this.activeFilters.includes(filter)) {
        this.applyFilter(this.filters.indexOf(filter), null);
        this.activeFilters.splice(this.activeFilters.indexOf(filter), 1);
        return;
      } else {
        this.activeFilters.push(filter);

        if (filter == "grayscale") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.Grayscale()
          );
          return;
        }
        if (filter == "blackwhite") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.BlackWhite()
          );
          return;
        }
        if (filter == "sepia") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.Sepia()
          );
          return;
        }
        if (filter == "vintage") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.Vintage()
          );
          return;
        }
        if (filter == "technicolor") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.Technicolor()
          );
          return;
        }
        if (filter == "polaroid") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.Polaroid()
          );
          return;
        }
        if (filter == "kodachrome") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.Kodachrome()
          );
          return;
        }
        if (filter == "brownie") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.Brownie()
          );
          return;
        }
        if (filter == "invert") {
          this.applyFilter(
            this.filters.indexOf(filter),
            new fabric.Image.filters.Invert()
          );
          return;
        }
      }

      this.$eventBus.$emit("generateSuggestedColors");
    },
    applyFilter: function(index, filter) {
      this.background.filters[index] = filter;

      this.background.applyFilters();
      this.canvas.renderAll();
      this.$eventBus.$emit("generateSuggestedColors");
    },
    setFilterAmount: function(filterIndex, prop, amount) {
      this.background.filters[filterIndex][prop] = amount;

      this.background.applyFilters();
      this.canvas.renderAll();
      this.$eventBus.$emit("generateSuggestedColors");
    },
    setBlur: debounce(function() {
      let amount = this.blurAmount / 100;
      let index = this.filters.indexOf("blur");

      if (this.activeFilters.includes("blur")) {
        this.setFilterAmount(index, "blur", amount);
      } else {
        this.applyFilter(
          index,
          new fabric.Image.filters.Blur({
            blur: amount
          })
        );
        this.activeFilters.push("blur");
      }
    }, 250),
    setBrightness: debounce(function() {
      let amount = this.brightnessAmount / 100;
      let index = this.filters.indexOf("brightness");

      if (this.activeFilters.includes("brightness")) {
        this.setFilterAmount(index, "brightness", amount);
      } else {
        this.applyFilter(
          index,
          new fabric.Image.filters.Brightness({
            brightness: amount
          })
        );
        this.activeFilters.push("brightness");
      }
    }, 250),
    setContrast: debounce(function() {
      let amount = this.contrastAmount / 100;
      let index = this.filters.indexOf("contrast");

      if (this.activeFilters.includes("contrast")) {
        this.setFilterAmount(index, "contrast", amount);
      } else {
        this.applyFilter(
          index,
          new fabric.Image.filters.Contrast({
            contrast: amount
          })
        );
        this.activeFilters.push("contrast");
      }
    }, 250),
    setHue: debounce(function() {
      let amount = this.hueAmount / 100;
      let index = this.filters.indexOf("hue");

      if (this.activeFilters.includes("hue")) {
        this.setFilterAmount(index, "rotation", amount);
      } else {
        this.applyFilter(
          index,
          new fabric.Image.filters.HueRotation({
            rotation: amount
          })
        );
        this.activeFilters.push("hue");
      }
    }, 250),
    setSaturation: debounce(function() {
      let amount = this.saturationAmount / 100;
      let index = this.filters.indexOf("saturation");

      if (this.activeFilters.includes("saturation")) {
        this.setFilterAmount(index, "saturation", amount);
      } else {
        this.applyFilter(
          index,
          new fabric.Image.filters.Saturation({
            saturation: amount
          })
        );
        this.activeFilters.push("saturation");
      }
    }, 250)
  }
};
</script>

<style scoped>
.background-sidebar {
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-top: var(--header-height);
}

.section {
  margin: 30px 0;
}

.title {
  font-size: 1.1em;
  font-weight: bold;
}

.filter-wrapper {
  max-height: 150px;
  overflow: hidden auto;
  margin-top: 10px;
  padding-right: 5px;
}

.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter {
  content: "";
  margin: 5px 0;
  background: grey;
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: var(--font-primary);
  font-size: 0.9em;
  font-weight: bold;
  color: #fff;
  border-radius: var(--round-sm);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  user-select: none;
}

.filter.active {
  box-shadow: none;
  border: 2px solid var(--primary);
}

.filter:hover {
  cursor: pointer;
}

.control {
  width: 100%;
}

.display {
  margin-left: 20px;
  width: 35px;
  font-family: var(--font-primary);
  color: var(--primary);
  font-weight: bold;
}

.custom-slider.hue {
  background: linear-gradient(
    to right,
    hsl(0, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(360, 100%, 50%)
  );
}
</style>