<template>
  <div id="photo-tools">
    <export-header :image="currentImage" @back="back"></export-header>
    <div class="cropper-wrapper">
      <div class="cropper-toolbar"></div>
      <div>
        <vue-cropper
          class="cropper"
          :crop="limitCropper"
          :zoom="onZoom"
          ref="cropper"
          :src="`file://${currentImage.filename}`"
          v-bind="settings.cropperOptions"
        ></vue-cropper>
      </div>
    </div>
    <button @click="upload">Upload</button>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import ImagesRepository from "../../api/ImagesRepository";
import u from "../../util/utils";

import ExportManagementHeaderVue from "../ExportManagementHeader.vue";
import { mapState } from "vuex";

export default {
  name: "photo-tools",
  components: {
    VueCropper,
    "export-header": ExportManagementHeaderVue
  },
  data: function() {
    return {
      cropperLimitReached: false
    };
  },
  methods: {
    limitCropper: function(event) {
      let width = event.detail.width;
      let height = event.detail.height;

      if (
        width < this.settings.cropperOptions.minCroppedWidth ||
        height < this.settings.cropperOptions.minCroppedHeight
      ) {
        width = this.settings.cropperOptions.minCroppedWidth;
        height = this.settings.cropperOptions.minCroppedHeight;

        this.$refs.cropper.setData({
          width,
          height
        });
      }
    },
    onZoom: function(event) {
      // the whole canvas element
      let containerData = this.$refs.cropper.getContainerData();
      // the crop box element as it appears on the screen
      let cropBoxData = this.$refs.cropper.getCropBoxData();
      // cropped image
      let croppedCanvas = this.$refs.cropper.getCroppedCanvas();

      // we should prevent zooming in when the lower limit of crop size is reached.
      // prevent zoom in if cropbox size is almost as big as the whole canvas element AND the cropped image is at limit
      // we use 20 pixels as offset
      if (
        (cropBoxData.width + 20 >= containerData.width ||
          cropBoxData.height + 20 >= containerData.height) &&
        (croppedCanvas.width -20 <= this.settings.cropperOptions.minCroppedWidth ||
          croppedCanvas.height -20 <= this.settings.cropperOptions.minCroppedHeight)
      ) {
        // to see if it's a zoom in we should compare ratios of the current zoom ratio and the previous zoom ratio
        if (event.detail.ratio > event.detail.oldRatio) {
          // it's zoom in
          event.preventDefault();
        }
      }
    },
    upload: function() {
      let croppedCanvas = this.$refs.cropper.getCroppedCanvas();

      croppedCanvas.toBlob(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onloadend = function() {
          const base64data = reader.result;

          ImagesRepository.uploadPhoto(
            u.blobToFile(base64data),
            u.pathToFilename(this.$route.params.item.filename)
          );
        }.bind(this);
      });

      //   let item = this.$route.params.item;

      //   const xhttp = new XMLHttpRequest();

      //   xhttp.onreadystatechange = function() {
      //     if (this.readyState == 4) {
      //       if (xhttp.response) {
      //         const reader = new FileReader();

      //         reader.readAsDataURL(xhttp.response);
      //         reader.onloadend = function() {
      //           const base64data = reader.result;

      //           ImagesRepository.uploadPhoto(
      //             u.blobToFile(base64data),
      //             u.pathToFilename(item.filename)
      //           );
      //         };
      //       }
      //     }
      //   };
      //   xhttp.open("GET", "file://" + item.filename, true);
      //   xhttp.responseType = "blob";
      //   xhttp.send();
    },
    back: function() {
      this.$router.push({
        name: "ExportManagement"
      });
    }
  },
  computed: {
    ...mapState({
      currentImage: state => state.currentImage,
      settings: state => state.currentPlatformOptionSettings
    })
  },
  mounted: function() {
    // make the window wider
    document.documentElement.style.width = "800px";
    document.documentElement.style.height = "600px";

    window.debg = this;
  }
};
</script>

<style scoped>
.cropper-wrapper {
  display: flex;
  align-items: flex-start;
}
.cropper {
  max-height: 350px;
}
.cropper-toolbar {
  min-width: 20%;
  background: var(--primary);
}
</style>