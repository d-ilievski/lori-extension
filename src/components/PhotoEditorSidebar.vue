<template>
  <div class="photo-editor-sidebar">
    <div class="section">
      <div class="row">
        <label class="title">Original Image Size</label>
      </div>
      <div class="row">
        <div class="col">
          <label>Width</label>
          <div class="static-field">{{originalImageWidth}}px</div>
        </div>
        <div class="col">
          <label>Height</label>
          <div class="static-field">{{originalImageHeight}}px</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <label class="title">Cropped Image Size</label>
      </div>
      <div class="row">
        <div class="col">
          <label>Width</label>
          <input-field
            type="number"
            :min="settings.cropperOptions.minCroppedWidth"
            v-model="cropSize.width"
          ></input-field>
        </div>
        <div class="col">
          <label>Height</label>
          <input-field
            type="number"
            :min="settings.cropperOptions.minCroppedHeight"
            v-model="cropSize.height"
          ></input-field>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="row">
        <label class="title">Instagram Story Requirements</label>
      </div>
      <div class="row">
        <div class="col">
          <label>Min Width</label>
          <div class="static-field">{{settings.cropperOptions.minCroppedWidth}}px</div>
        </div>
        <div class="col">
          <label>Min Height</label>
          <div class="static-field">{{settings.cropperOptions.minCroppedHeight}}px</div>
        </div>
      </div>
      <div>
        <label>Aspect Ratio</label>
        <div class="static-field">{{settings.cropperOptions.aspectRatioDisplay}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "photo-editor-sidebar",
  props: {
    settings: Object,
    originalImageWidth: Number,
    originalImageHeight: Number,
    cropSize: Object
  }
};
</script>

<style scoped>
.photo-editor-sidebar {
  min-width: 25%;
  height: 425px;
  background: var(--background-primary);
  padding: 10px;
}

.section {
  margin-bottom: 20px;
}

.static-field {
  font-size: 1.2em;
}

.title {
  font-size: 1.1em;
  font-weight: bold;
}

.row {
  margin-bottom: 5px;
}
</style>