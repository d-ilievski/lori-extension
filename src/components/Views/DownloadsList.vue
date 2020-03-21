<template>
  <div id="downloads-list">
    <div class="downloads">
      <list-item
        v-for="(image, index) in latestImages"
        :key="index"
        :image="image"
        @choose="chooseDownload"
      ></list-item>
    </div>
    <div class="history" :class="{'open' : historyOpen}" @click="toggleHistory">
      <div class="header">
        <h3>History</h3>
      </div>
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script>
import ListItemVue from "../ListItem.vue";

export default {
  name: "downloads-list",
  components: {
    "list-item": ListItemVue
  },
  data: () => {
    return {
      downloads: [],
      historyOpen: false
    };
  },
  methods: {
    chooseDownload: function(item) {
      this.$router.push({ name: "ExportManagement", params: { item } });
    },
    toggleHistory: function() {
      this.historyOpen = !this.historyOpen;
    }
  },
  computed: {
    latestImages: {
      cache: false,
      get: function() {
        if (!this.downloads) return null;

        let filtered = this.downloads.filter(download => {
          return download.mime.match(new RegExp(/image\/[a-z]+/g));
        });

        // console.log("Filtered: ", filtered);
        return filtered;
      }
    }
  },
  mounted: function() {
    let options = {
      orderBy: ["-startTime"],
      limit: 50,
      state: "complete",
      exists: true
    };
    chrome.downloads.search(options, result => {
      this.downloads = result;
    });
  }
};
</script>

<style scoped>
.downloads {
  padding: 20px 10px 0 10px;
  overflow: hidden auto;
  max-height: 345px;
}

.history {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: var(--background-secondary);
  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.15);
  transition: height .25s ease-in-out;
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