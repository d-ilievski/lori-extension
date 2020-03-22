<template>
  <div id="photo-tools">
    <export-header :image="image" @back="back"></export-header>
    <div class="cropper-wrapper">
      <vue-cropper
        class="cropper-wrapper"
        :cropmove="limitCropper"
        ref="cropper"
        :src="`file://${image.filename}`"
        v-bind="cropperOptions"
      ></vue-cropper>
      <button @click="upload">Upload</button>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import ImagesRepository from "../../api/ImagesRepository";
import u from "../../util/utils";

import ExportManagementHeaderVue from "../ExportManagementHeader.vue";

export default {
  name: "photo-tools",
  components: {
    VueCropper,
    "export-header": ExportManagementHeaderVue
  },
  data: function() {
    return {
      cropperOptions: {
        viewMode: 2,
        aspectRatio: 9 / 16,
        responsive: true
      }
    };
  },
  methods: {
    limitCropper: function(event) {
      const minCroppedWidth = 600;
      const minCroppedHeight = 1067;

      const data = this.$refs.cropper.getData();

      if (data.width < minCroppedWidth || data.height < minCroppedHeight) {
        data.width = minCroppedWidth;
        data.height = minCroppedHeight;

        this.$refs.cropper.setData(data);
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
        name: "ExportManagement",
        params: { item: this.image }
      });
    }
  },
  computed: {
    image: function() {
      return this.$route.params.item;
    },
    option: function() {
      return this.$route.params.option;
    }
  },
  mounted: function() {
    // make the window wider
    document.documentElement.style.width = "800px";
    document.documentElement.style.height = "600px";
  }
};
</script>

<style scoped>
.cropper-wrapper {
  max-height: 350px;
}
</style>