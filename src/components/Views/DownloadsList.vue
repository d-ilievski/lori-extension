<template>
  <div id="downloads-list">
    <div class="navigation">
      <div class="back clickable" @click="back">
        <i class="gg-arrow-left"></i>
      </div>
      <div class="title">
        Recent Downloads
      </div>
    </div>
    <div class="downloads">
      <list-item
        v-for="(image, index) in latestImages"
        :key="index"
        :image="image"
        @choose="chooseDownload"
      ></list-item>
    </div>
    <!-- <div class="history" :class="{'open' : historyOpen}" @click="toggleHistory">
      <div class="header">
        <h3>History</h3>
      </div>
      <div class="content"></div>
    </div>-->
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
    back: function() {
      this.$router.push({ name: "MainMenu" });
    },
    ...mapActions(["setCurrentImage", "fetchDownloads"])
  },
  computed: {
    ...mapGetters(["latestImages"])
  },
  mounted: function() {
    // document.documentElement.style.width = "450px";
    // document.documentElement.style.height = "450px";

    // setTimeout(() => {
    this.fetchDownloads();
    // }, 200);
  }
};
</script>

<style scoped>
.downloads {
  padding: 20px 10px 0 10px;
  overflow: hidden auto;
  max-height: 338px;
}

.navigation {
  --ggs: 0.7;
  padding-left: 10px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
}

.navigation .clickable:hover {
  cursor: pointer;
  color: var(--primary);
}

.navigation .title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-primary);
  font-size: 1.1em;
}

</style>