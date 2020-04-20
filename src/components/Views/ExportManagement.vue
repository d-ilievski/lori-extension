<template>
  <div id="export-management">
    <export-header :image="currentImage" @back="back"></export-header>
    <div class="wrapper">
      <div class="platforms-wrapper">
        <export-platform
          v-for="platform in platforms"
          @click="selectPlatform"
          v-bind="platform"
          :key="platform.id"
          :active="platform.id === currentPlatform"
        ></export-platform>
      </div>
      <transition-group appear name="fade" class="options-wrapper" tag="div">
        <platform-option
          v-for="item in currentPlatformOptions"
          :key="item.id"
          :item="item"
          @choose="chooseOption"
          @remove="deletePlatformOptionData"
        ></platform-option>
      </transition-group>
    </div>
    <div class="history" :class="{'open' : historyOpen}">
      <div class="header">
        <template v-if="!this.historyOpen">
          <template v-if="exportData.platformOptions.length">
            <span class="lori-message">
              Lori is happy you selected
              <b>{{exportData.platformOptions.length}}</b>
              option{{exportData.platformOptions.length > 1 ? 's' : ''}}.
            </span>
            <custom-button icon="icofont-upload-alt" type="primary" @click="upload">Finish & Upload</custom-button>
            <custom-button type="secondary" @click="back">Go Back</custom-button>
          </template>
          <template v-else>
            <span
              class="lori-message"
            >Lori is anxios because you haven't selected any option. Please select or</span>
            <custom-button type="secondary" @click="back">Go Back</custom-button>
          </template>
        </template>
        <template v-else>
          <template v-if="requestInProgress">
            <span class="lori-message">Lori is taking care of some important stuff...</span>
          </template>
        </template>
      </div>
      <div class="content">
        <progress-bar :progress="uploadProgress" v-if="requestInProgress"></progress-bar>
        <template v-else>
          <div class="row">
            <h2>Your files are here!</h2>
          </div>
          <div class="export-table">
            <div class="row export-row" v-for="(link, index) in downloadLinks" :key="index">
              <div class="filename">{{link}}</div>
              <div class="buttons">
                <custom-button icon="icofont-download" @click="download(link)">Download</custom-button>
                <div class="drive-button">
                  Drive
                  <i class="fab fa-google-drive"></i>
                  <div
                    :id="`g-savetodrive-${index}`"
                    style="position: absolute; opacity: 0; z-index: 0; cursor: pointer;"
                  ></div>
                </div>
                <div class="dropbox-button">
                  <custom-button icon="fab fa-dropbox" @click="saveToDropbox(link)" type="primary">Dropbox</custom-button>
                </div>
              </div>
            </div>
          </div>
          <div class="row zip-row">
            <h3>Get them all in zip:</h3>
            <div class="buttons">
              <custom-button icon="icofont-download" @click="download(downloadZipped)">Download Zip</custom-button>
              <div class="drive-button">
                Drive
                <i class="fab fa-google-drive"></i>
                <div
                  id="g-savetodrive-zip"
                  style="position: absolute; opacity: 0; z-index: 0; cursor: pointer;"
                ></div>
              </div>

              <div class="dropbox-button">
                <custom-button icon="fab fa-dropbox" @click="saveToDropbox(link)" type="primary">Dropbox</custom-button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import ExportManagementHeaderVue from "../ExportManagementHeader.vue";
import ExportManagementPlatformVue from "../ExportManagementPlatform.vue";
import ExportManagementPlatformOptionVue from "../ExportManagementPlatformOption.vue";

import ImagesRepository from "@/api/ImagesRepository";
import ProgressBarVue from "../ProgressBar.vue";

export default {
  name: "export-management",
  components: {
    "export-header": ExportManagementHeaderVue,
    "export-platform": ExportManagementPlatformVue,
    "platform-option": ExportManagementPlatformOptionVue,
    "progress-bar": ProgressBarVue
  },
  data: () => ({
    historyOpen: false,
    downloadLinks: [],
    downloadZipped: null,
    requestInProgress: false
  }),
  methods: {
    back: function() {
      this.$router.push({ name: "MainMenu" });
      this.$store.dispatch("clearState");
    },
    chooseOption: function(option) {
      this.setOption(option);
      this.$router.push({
        name: "Editor"
      });
    },
    toggleHistory: function() {
      this.historyOpen = !this.historyOpen;
    },
    upload: function() {
      const { imageFile, filename, platformOptions } = this.exportData;

      this.requestInProgress = true;
      this.toggleHistory();

      ImagesRepository.uploadImage(
        imageFile,
        filename,
        JSON.stringify(platformOptions)
      ).then(response => {
        this.requestInProgress = false;

        this.downloadLinks = response.data.fileUrls;
        this.downloadZipped = response.data.zipped;

        this.$nextTick(() => {
          this.downloadLinks.forEach((link, index) => {
            // eslint-disable-next-line
            gapi.savetodrive.render("g-savetodrive-" + index, {
              src: "http://127.0.0.1:8080/files/" + link,
              filename: link,
              sitename: "Lori"
            });
          });

          // eslint-disable-next-line
          gapi.savetodrive.render("g-savetodrive-zip", {
            src: "http://127.0.0.1:8080/files/" + this.downloadZipped,
            filename: this.downloadZipped,
            sitename: "Lori"
          });
        });
      });
    },
    download: function(filename) {
      chrome.downloads.download({
        url: "http://127.0.0.1:8080/files/" + filename
      });
    },
    saveToDropbox: function(path) {
      // eslint-disable-next-line
      Dropbox.save("http://127.0.0.1:8080/files/" + path, path, {
        error: errorMsg => console.log(errorMsg)
      });
    },
    ...mapActions(["selectPlatform", "deletePlatformOptionData"]),
    ...mapActions({ setOption: "setCurrentPlatformOptionSettings" })
  },
  computed: {
    currentPlatformOptions: function() {
      let found = this.platformOptions.find(
        option => option.platformId === this.currentPlatform
      );

      if (!found) return [];

      return found.items;
    },
    ...mapState({
      platforms: state => state.platforms,
      platformOptions: state => state.platformOptions,
      currentImage: state => state.currentImage,
      currentPlatform: state => state.currentPlatform,
      exportData: state => state.exportData,
      uploadProgress: state => state.uploadProgress
    })
  },
  mounted: function() {
    // make the window wider
    document.documentElement.style.width = "800px";
    document.documentElement.style.height = "600px";
  }
};
</script>

<style scoped>
/* animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  height: 388px;
  padding: 10px 10px 0 10px;
}

.platforms-wrapper {
  max-height: 100%;
  overflow: hidden auto;
  width: 250px;
  background-color: var(--background-primary);
  padding-right: 5px;
}

.options-wrapper {
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;
  overflow: hidden auto;
  flex: 1;
  max-height: 100%;
  padding-bottom: 20px;
}

.history {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: var(--background-secondary);
  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.15);
  transition: height 0.25s ease-in-out;
}
.history.open {
  height: calc(100% - var(--header-height));
}
.history .header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;

  display: flex;
  align-items: center;
  padding: 0 17px;
}
.history .content {
  margin-top: 48px;
  padding: 17px;
}

.history h3 {
  text-align: center;
}

.lori-message {
  font-family: var(--font-primary);
  font-size: 1.2em;
}

.history .header > *:not(:last-child),
.export-table .buttons > *:not(:last-child),
.zip-row .buttons > *:not(:last-child) {
  margin-right: 10px;
}

.export-table {
  width: 100%;
  max-height: 200px;
  overflow: hidden auto;
  padding: 15px 25px;
  background: var(--background-primary);
  border: 1px solid var(--primary);
  border-radius: var(--round-md);
}

.export-table .export-row {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.export-table .filename {
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.export-table .buttons {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.zip-row {
  align-items: center;
  padding: 15px 25px;
  color: var(--primary);
}
.zip-row .buttons {
  display: flex;
  justify-content: flex-end;
}
.zip-row .buttons {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.drive-button {
  /* width: 58px; */
  padding: 0 12px;
  height: 30px;
  color: white;
  background: var(--background-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--round-xs);
  cursor: pointer;
  z-index: 1;
  pointer-events: visible;

  box-shadow: 0px 5px 4px 2px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.drive-button i {
  margin-left: 10px;
}

.drive-button:hover {
  color: white;
  background: var(--primary);
}

.drive-button:active {
  box-shadow: none;
}
</style>