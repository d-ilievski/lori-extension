<template>
  <div id="photo-tools">
    <vue-cropper
      :cropmove="limitCropper"
      ref="cropper"
      :src="`file://${image.filename}`"
      v-bind="cropperOptions"
    ></vue-cropper>
    <button @click="upload">Upload</button>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import ImagesRepository from "../../api/ImagesRepository";
import u from "../../util/utils";

export default {
  name: "photo-tools",
  components: {
    VueCropper
  },
  data: function() {
    return {
      cropperOptions: {
        viewMode: 1,
        aspectRatio: 9 / 16
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
    }
  },
  computed: {
    image: function() {
      return this.$route.params.item;
    }
  }
};
</script>

<style>
</style>