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
            <input-field type="number" v-model="customCropSize.width"></input-field>
          </div>
          <div class="col">
            <label>Height</label>
            <input-field type="number" v-model="customCropSize.height"></input-field>
          </div>
        </div>
        <!-- <div class="row" v-else>
          <div class="col">
            <label>Width</label>
            <div class="static-field">{{cropSize.width}}px</div>
          </div>
          <div class="col">
            <label>Height</label>
            <div class="static-field">{{cropSize.height}}px</div>
          </div>
        </div> -->
      </div>

      <div class="section" v-if="customMode">
        <div class="row">
          <label class="title">Aspect Ratio</label>
        </div>
        <div class="row">
          <div class="col">
            <label>Width</label>
            <input-field type="number" :min="1" v-model="aspectRatio.width"></input-field>
          </div>
          <div class="col">
            <label>Height</label>
            <input-field type="number" :min="1" v-model="aspectRatio.height"></input-field>
          </div>
          <div class="col">
            <label class="invisible">xxx</label>
            <icon-button noShadow icon="icofont icofont-unlocked" @click="resetAspectRatio"></icon-button>
          </div>
        </div>
      </div>
      <div class="section" v-else>
        <div class="row">
          <label class="title">{{platformName}} {{settings.name}} Requirements</label>
        </div>
        <div class="row">
          <div class="col" v-if="settings.cropperSettings.minCroppedWidth">
            <label>Min Width</label>
            <div class="static-field">{{settings.cropperSettings.minCroppedWidth}}px</div>
          </div>
          <div class="col" v-if="settings.cropperSettings.minCroppedWidth">
            <label>Min Height</label>
            <div class="static-field">{{settings.cropperSettings.minCroppedHeight}}px</div>
          </div>
        </div>
        <div v-if="settings.cropperSettings.aspectRatioDisplay">
          <label>Aspect Ratio</label>
          <div class="static-field">{{settings.cropperSettings.aspectRatioDisplay}}</div>
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
import { mapState } from "vuex";
export default {
  name: "photo-editor-sidebar",
  props: {
    settings: Object,
    originalImageWidth: Number,
    originalImageHeight: Number,
    cropSize: Object
  },
  data: () => {
    return {
      aspectRatio: {
        width: null,
        height: null
      },
      customCropSize: {
        width: null,
        height: null
      }
    };
  },
  methods: {
    resetAspectRatio: function() {
      this.aspectRatio.width = null;
      this.aspectRatio.height = null;
      this.$eventBus.$emit("resetAspectRatio");
    }
  },
  computed: {
    ...mapState({
      platforms: state => state.platforms
    }),
    platformName: function() {
      if (!this.platforms || !this.settings) return "";

      return this.platforms.find(
        platform => platform.id === this.settings.platformId
      ).name;
    },
    customMode: function() {
      return this.settings.platformId === 1;
    }
  },
  watch: {
    aspectRatio: {
      handler: function(newValue) {
        if (newValue.width && newValue.height)
          this.$eventBus.$emit("changeAspectRatio", this.aspectRatio);
      },
      deep: true
    },
    customCropSize: {
      handler: function(newValue) {
        this.$eventBus.$emit("changeCropSize", this.customCropSize);
      },
      deep: true
    }
  },
  mounted() {
    this.$eventBus.$on("cropSizeChange", ({ width, height }) => {
      this.customCropSize.width = width;
      this.customCropSize.height = height;
    });
  },
  beforeDestroy() {
    this.$eventBus.$off("cropSizeChange");
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