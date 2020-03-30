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
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
import ListItemVue from "../ListItem.vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "downloads-list",
  components: {
    "list-item": ListItemVue
  },
  data: () => {
    return {
      historyOpen: false
    };
  },
  methods: {
    chooseDownload: function(item) {
      this.setCurrentImage(item);
      this.$router.push({ name: "ExportManagement" });
    },
    toggleHistory: function() {
      this.historyOpen = !this.historyOpen;
    },
    ...mapActions(["setCurrentImage", "fetchDownloads"])
  },
  computed: {
    ...mapGetters(["latestImages"])
  },
  mounted: function() {
    document.documentElement.style.width = "450px";
    document.documentElement.style.height = "450px";

    setTimeout(() => {
      this.fetchDownloads();
    }, 200);
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