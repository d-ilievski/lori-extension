<template>
  <div class="text-sidebar">
    <div class="section">
      <div class="row">
        <label class="title">Add Text</label>
      </div>
      <div class>
        <custom-button class="primary" block @click="addText">Text</custom-button>
        <br />
        <custom-button class="primary" block @click="addTextbox">Textbox</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric-browseronly";

export default {
  name: "text-sidebar",
  props: {
    canvas: Object
  },
  data: () => ({}),
  methods: {
    addText: function() {
      let text = new fabric.IText("Your Text", {
        left: 100,
        top: 100,
        fontFamily: 'Baloo 2'
      });
      this.canvas.add(text);
    },
    addTextbox: function() {
      let text = new fabric.IText("Your\ntextbox", {
        left: 100,
        top: 100,
        fontFamily: 'Baloo 2',
        fontSize: 12
      });
      this.canvas.add(text);
    }
  }
};
</script>

<style scoped>
.text-sidebar {
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

.control {
  width: 100%;
}
</style>