<template>
  <div id="main-menu">
    <div class="wrapper">
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
        icon="fab fa-google-drive"
        @choose="$router.push({ name: 'DownloadsList' })"
      >Choose from Drive</main-menu-option>
      <main-menu-option
        icon="fab fa-dropbox"
        @choose="$router.push({ name: 'DownloadsList' })"
      >Choose from Dropbox</main-menu-option>
    </div>
    <div class="history" :class="{'open' : historyOpen}" @click="toggleHistory">
      <div class="header">
        <h3>History</h3>
      </div>
      <div class="content"></div>
    </div>

    <modal :title="'Import with link'" :show="importFromLinkOpen" @close="toggleImportFromLink">
      <template slot="body">
        <div>
          <label style="margin-bottom: 10px;">Paste your link here:</label>
          <input-field type="text" v-model="importLink"></input-field>
        </div>
      </template>
      <template slot="buttons">
        <custom-button style="margin-right: 10px" type="primary" @click="importFromLink">Confirm</custom-button>
        <custom-button type="secondary" @click="toggleImportFromLink">Cancel</custom-button>
      </template>
    </modal>
  </div>
</template>

<script>
import MainMenuOptionVue from "../MainMenuOption.vue";

export default {
  name: "main-menu",
  components: {
    "main-menu-option": MainMenuOptionVue
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
    }
  },
  computed: {},
  mounted: function() {
    document.documentElement.style.width = "450px";
    document.documentElement.style.height = "450px";

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
  }
};
</script>

<style scoped>
.wrapper {
  padding: 20px 10px 0 10px;
  overflow: hidden auto;
  max-height: 345px;
  display: flex;
  flex-flow: row wrap;
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