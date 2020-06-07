<template>
  <div id="main-menu">
    <div class="welcome-message">Hi! 👋 Where would you like to start?</div>
    <div class="wrapper">
      <main-menu-option
        icon="icofont-interface"
        @choose="$router.push({ name: 'DownloadsList' })"
      >Start Blank</main-menu-option>
      <main-menu-option
        icon="icofont-download"
        @choose="$router.push({ name: 'DownloadsList' })"
      >Recent Downloads</main-menu-option>
      <main-menu-option icon="icofont-ui-folder" @choose="toggleUploadDialog">
        Upload from PC
        <input
          ref="fileInput"
          type="file"
          name="name"
          style="display: none;"
          @input="onChooseFileFromPc"
        />
      </main-menu-option>
      <main-menu-option icon="icofont-link" @choose="toggleImportFromLink">Link</main-menu-option>
      <main-menu-option
        icon="icofont-ui-image"
        @choose="$router.push({ name: 'StockPhotos' })"
      >Stock Photos</main-menu-option>
      <main-menu-option icon="fab fa-google-drive" @choose="showDrivePicker">Choose from Drive</main-menu-option>
      <main-menu-option icon="fab fa-dropbox" @choose="showDropboxPicker">Choose from Dropbox</main-menu-option>
    </div>

    <div class="history" :class="{'open' : historyOpen}" @click="toggleHistory">
      <div class="header">
        <h3>History</h3>
      </div>
      <div class="content"></div>
    </div>

    <modal
      size="md"
      :title="'Import with link'"
      :show="importFromLinkOpen"
      @close="toggleImportFromLink"
    >
      <template slot="body">
        <div v-if="importingImage">
          <progress-bar processingMessage="Importing..." :progress="importingProgress"></progress-bar>
        </div>
        <div v-else>
          <label style="margin-bottom: 10px;">Paste your link here:</label>
          <input-field focused type="text" v-model="importLink" @submit="importFromLink"></input-field>
        </div>
      </template>
      <template slot="buttons">
        <custom-button
          :disabled="importingImage"
          style="margin-right: 10px"
          type="primary"
          @click="importFromLink"
        >Confirm</custom-button>
        <custom-button
          :disabled="importingImage"
          type="secondary"
          @click="toggleImportFromLink"
        >Cancel</custom-button>
      </template>
    </modal>
  </div>
</template>

<script>
import MainMenuOptionVue from "../MainMenuOption.vue";
import googlePicker from "@/util/googlePicker";
import ImagesRepository from "@/api/ImagesRepository";
import { mapState, mapGetters } from "vuex";
import ProgressBarVue from "@/components/ProgressBar.vue";

export default {
  name: "main-menu",
  components: {
    "main-menu-option": MainMenuOptionVue,
    "progress-bar": ProgressBarVue
  },
  data: () => {
    return {
      historyOpen: false,
      importFromLinkOpen: false,
      importLink: null
    };
  },
  methods: {
    toggleHistory: function() {
      this.historyOpen = !this.historyOpen;
    },
    toggleUploadDialog: function() {
      this.$refs.fileInput.click();
    },
    onChooseFileFromPc: function(event) {
      this.$store
        .dispatch("chooseFileFromPc", event.target.files[0])
        .then(() => {
          this.$router.push({ name: "ExportManagement" });
        });
    },
    toggleImportFromLink: function() {
      if (this.importFromLinkOpen == true) {
        this.importLink = null;
      }
      this.importFromLinkOpen = !this.importFromLinkOpen;
    },
    importFromLink: function(link = this.importLink) {
      this.$store.dispatch("importFromLink", link).then(() => {
        this.$router.push({ name: "ExportManagement" });
      });
    },
    showDrivePicker: function() {
      googlePicker();
    },
    showDropboxPicker() {
      const options = {
        success: files => {
          this.importFromLink(files[0].link);
        },
        linkType: "direct", // or "direct"
        multiselect: false, // or true
        extensions: [".png", ".jpg", ".jpeg"]

        // Optional. A limit on the size of each file that may be selected, in bytes.
        // If specified, the user will only be able to select files with size
        // less than or equal to this limit.
        // For the purposes of this option, folders have size zero.
        // sizeLimit: 1024 // or any positive number
      };

      // eslint-disable-next-line
      Dropbox.choose(options);
    }
  },
  computed: {
    ...mapState({
      importingImage: state => state.importingImage
    }),
    ...mapGetters(["importingProgress"])
  },
  mounted: function() {
    if (this.$route.query.link) {
      this.importFromLink(decodeURIComponent(this.$route.query.link));
    } else {
      chrome.storage.local.get("store", state => {
        if (!state.store) return;

        this.$store.dispatch("initState", state.store).then(() => {
          this.$store.dispatch("setCurrentImage", state.store.currentImage);
          this.$router.push("export");
        });
      });
    }

    this.$eventBus.$on("goolgeDrivePicked", ({ id, token }) => {
      ImagesRepository.getGoogleImage(id, token).then(image => {
        const reader = new FileReader();
        // TODO: IMPLEMENT
      });
    });
  },
  beforeDestroy: function() {
    this.$eventBus.$off("goolgeDrivePicked");
  }
};
</script>

<style scoped>
.welcome-message {
  font-family: var(--font-primary);
  font-size: 2em;
  text-align: center;
  color: var(--text-secondary);
  padding: 30px 0 0 0;
}

.wrapper {
  padding: 20px 10px 0 10px;
  overflow: hidden auto;
  max-height: calc(100% - 104px);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
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
}

.history .header:hover {
  cursor: pointer;
  color: var(--primary);
}

.history h3 {
  text-align: center;
}
</style>