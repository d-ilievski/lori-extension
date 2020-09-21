<template>
  <div class="elements-sidebar">
    <div class="section">
      <div class="row">
        <label class="title">Add Shapes</label>
      </div>
      <div class="shape-wrapper">
        <div class="shape-row">
          <div class="shape" @click="addSquare">
            <i class="gg-shape-square"></i>
          </div>
          <div class="shape" @click="addCircle">
            <i class="gg-shape-circle"></i>
          </div>
          <div class="shape" @click="addTriangle">
            <i class="gg-shape-triangle"></i>
          </div>
          <div class="shape" @click="addLine">
            <i class="gg-border-style-solid"></i>
          </div>
          <div class="shape" @click="addPolygon">
            <i class="gg-shape-hexagon"></i>
          </div>
        </div>
        <div class="shape-row"></div>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <custom-button @click.capture="chooseFromPc" block type="primary" icon="icofont-upload">
          <input
            ref="filePicker"
            type="file"
            multiple
            @change="processImagesFromPc"
            accept=".jpg, .png, .jpeg, .svg, .gif"
            v-show="false"
          />
          Upload from PC
        </custom-button>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <label class="title">Recent</label>
      </div>
      <div class="row"></div>
    </div>
    <div class="section">
      <div class="row">
        <input-field
          class="search-field"
          type
          v-model="elementsQuery"
          placeholder="Search Elements... 🔍"
          focused
          @submit="searchElements({query: elementsQuery})"
        ></input-field>
        <icon-button noShadow icon="icofont-search" @click="searchElements({query: elementsQuery})"></icon-button>
      </div>
      <div class="row">
        <div class="elements-container" v-if="true">
          <!-- <template v-for="element in elementsFreesvg">
            <div :key="element.id" class="element" @click="insertElement(`https://freesvg.org/api/v1/svg/${element.id}`)">
              <img :src="`https://freesvg.org/img/${element.thumb}`" />
            </div>
          </template>-->
          <template v-for="element in elementsUnDraw">
            <div :key="element.slug" class="element" @click="insertElement(element.image)">
              <img :src="element.image" />
            </div>
          </template>
          <template v-for="element in elementsFlaticon">
            <div :key="element.id" class="element" @click="insertElement(element.images.svg)">
              <img :src="element.images.svg" />
            </div>
          </template>
        </div>
      </div>
      <div class="row" v-if="elementsUnDraw.length">
        <div class="text-link">Expand</div>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric-browseronly";
import debounce from "lodash/debounce";
import { mapState, mapActions } from "vuex";

export default {
  name: "elements-sidebar",
  props: {
    canvas: Object,
  },
  data: () => ({
    elementsQuery: null,
  }),
  methods: {
    ...mapActions("elements", ["searchElements", "auth"]),
    addSquare: function () {
      const relativeSize = this.canvas.getWidth() * 0.15;

      let square = new fabric.Rect({
        width: relativeSize,
        height: relativeSize,
        left: relativeSize,
        top: relativeSize,
        fill: "#000",
      });

      this.canvas.add(square);
      this.canvas.setActiveObject(square);
    },
    addCircle: function () {
      const relativeSize = this.canvas.getWidth() * 0.15;

      let circle = new fabric.Circle({
        left: relativeSize,
        top: relativeSize,
        radius: relativeSize / 2,
        fill: "#000",
      });

      this.canvas.add(circle);
      this.canvas.setActiveObject(circle);
    },
    addTriangle: function () {
      const relativeSize = this.canvas.getWidth() * 0.15;

      let triangle = new fabric.Triangle({
        width: relativeSize,
        height: relativeSize,
        left: relativeSize,
        top: relativeSize,
        fill: "#000",
      });

      this.canvas.add(triangle);
      this.canvas.setActiveObject(triangle);
    },
    addLine: function () {
      const relativeSize = this.canvas.getWidth() * 0.15;

      let square = new fabric.Rect({
        width: relativeSize,
        height: relativeSize,
        left: relativeSize,
        top: relativeSize,
        fill: "#000",
      });

      this.canvas.add(square);
    },
    addPolygon: function () {
      const relativeSize = this.canvas.getWidth() * 0.15;

      let square = new fabric.Rect({
        width: relativeSize,
        height: relativeSize,
        left: relativeSize,
        top: relativeSize,
        fill: "#000",
      });

      this.canvas.add(square);
    },
    insertElement: function (url) {
      fabric.loadSVGFromURL(url, (objects, options) => {
        var obj = fabric.util.groupSVGElements(objects, options);
        this.canvas.add(obj);
        this.canvas.setActiveObject(obj);
        this.canvas.requestRenderAll();
      });
    },

    chooseFromPc: function () {
      this.$refs.filePicker.click();
    },
    processImagesFromPc: function (event) {
      this.$emit('processImages', event.currentTarget.files)
    },
  },
  computed: {
    ...mapState("elements", {
      elementsUnDraw: (state) => state.elementsUnDraw,
      elementsFlaticon: (state) => state.elementsFlaticon,
      // elementsFreesvg: (state) => state.elementsFreesvg,
    }),
  },
  created() {
    this.auth();
  },
};
</script>

<style scoped>
.elements-sidebar {
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

.shape-wrapper {
  max-height: 150px;
  overflow: hidden auto;
  margin-top: 10px;
  padding-right: 5px;
}

.shape-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.shape {
  content: "";
  margin: 5px 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: var(--font-primary);
  font-size: 0.9em;
  font-weight: bold;
  color: var(--text-primary);
  border-radius: var(--round-sm);
  /* box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2); */
  user-select: none;
  border: 1px solid transparent;
}

.shape:active,
.shape:active:hover {
  background-color: var(--primary);
  color: #fff;
}

.shape:hover {
  cursor: pointer;
  border-color: var(--primary);
  color: var(--primary);
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

.search-field {
  margin-right: 10px;
}

.elements-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-flow: wrap;
  max-height: 200px;
  overflow: hidden auto;
  padding: 10px 0;
  padding-right: 5px;
  margin: 10px 0;
}

.elements-container .element {
  width: 85px;
  height: 85px;
  border-radius: var(--round-xs);
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.elements-container .element:hover {
  cursor: pointer;
  border-color: var(--primary);
}

.elements-container .element > img {
  width: 100%;
  height: 100%;
}
</style>