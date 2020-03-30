<template>
  <div class="photo-editor-sidebar">
    <div class="section-wrapper">
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
          <label class="title">Cropped Image</label>
        </div>
        <div class="row">
          <div class="col">
            <label>Width</label>
            <div class="static-field">{{cropSize.width}}px</div>
          </div>
          <div class="col">
            <label>Height</label>
            <div class="static-field">{{cropSize.height}}px</div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="row">
          <label class="title">Instagram Story Requirements</label>
        </div>
        <div class="row">
          <div class="col" v-if="settings.cropperOptions.minCroppedWidth">
            <label>Min Width</label>
            <div class="static-field">{{settings.cropperOptions.minCroppedWidth}}px</div>
          </div>
          <div class="col" v-if="settings.cropperOptions.minCroppedWidth">
            <label>Min Height</label>
            <div class="static-field">{{settings.cropperOptions.minCroppedHeight}}px</div>
          </div>
        </div>
        <div v-if="settings.cropperOptions.aspectRatioDisplay">
          <label>Aspect Ratio</label>
          <div class="static-field">{{settings.cropperOptions.aspectRatioDisplay}}</div>
        </div>
      </div>
    </div>
    <div class="buttons-wrapper">
      <button class="button primary block" @click="$emit('confirm')">Confirm</button>
      <button class="button secondary block" @click="$emit('cancel')">Cancel</button>
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

  display: flex;
  flex-direction: column;
}

.buttons-wrapper > *:not(:last-child) {
  margin-bottom: 10px;
}

.section-wrapper {
  flex: 1;
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