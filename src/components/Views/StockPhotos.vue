<template>
  <div id="stock-photos">
    <div class="navigation">
      <div class="back clickable" @click="back">
        <i class="gg-arrow-left"></i>
      </div>
      <div class="title">Free Stock Photos</div>
    </div>
    <div class="wrapper">
      <div class="sidebar">
        <provider-picker></provider-picker>
        <div class="search">
          <input-field
            class="search-field"
            type
            v-model="query"
            placeholder="Search Photos... 🔍"
            focused
            @submit="search({query, color})"
          ></input-field>
          <div v-if="activeProviderId !== 3">
            <label>Search by Color</label>
            <color-buttons @change="setColor" :active="color"></color-buttons>
          </div>
          <custom-button
            :disabled="shouldDisableSearch"
            class="search-btn"
            block
            type="primary"
            @click="search({query, color})"
          >Search</custom-button>
        </div>
      </div>
      <div class="content">
        <div class="search-images-banner" v-if="shouldShowSearchMessage">
          Select one of Lori's friends and
          <br />search for FREE stock photos! 😎
        </div>
        <div class="search-images-banner" v-if="noResults">
          No Results! 😞
          <br />Try other provider?
        </div>

        <masonry :cols="3" :gutter="10">
          <template v-for="result in results">
            <div class="masonry-item" :key="result.id">
              <div class="attribution">
                <span v-html="attribution(result)"></span>
              </div>
              <img :src="result.image.thumb" />
              <div class="choose-btn" @click="choose(result.image.full)">
                Choose
                <i class="gg-math-plus"></i>
              </div>
            </div>
          </template>
        </masonry>
        <loader class="loader" v-if="searching"></loader>
        <div class="load-more" v-if="shouldShowLoadMore">
          <custom-button :disabled="searching" type="primary" @click="nextPage">Load More...</custom-button>
        </div>
      </div>
    </div>
    <modal size="sm" title="Importing image" :show="importingImage" forced>
      <template slot="body">
        <progress-bar processingMessage="Importing..." :progress="importingProgress"></progress-bar>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ColorButtons from "@/components/StockPhotos/ColorButtons.vue";
import ProviderPicker from "@/components/StockPhotos/ProviderPicker.vue";
import ProgressBarVue from "@/components/ProgressBar.vue";

export default {
  name: "stock-photos",
  components: {
    "color-buttons": ColorButtons,
    "provider-picker": ProviderPicker,
    "progress-bar": ProgressBarVue
  },
  data: () => {
    return {
      query: null,
      color: null
    };
  },
  methods: {
    back: function() {
      this.$router.push({ name: "MainMenu" });
    },
    choose: function(link) {
      this.$store.dispatch("importFromLink", link).then(() => {
        this.$router.push({ name: "ExportManagement" });
      });
    },
    attribution: function(result) {
      return `By <a class="text-link" href="${result.user.profile}" target="_blank">${result.user.username}</a> on <a class="text-link" href="${result.user.platformLink}" target="_blank">${result.user.platform}</a>`;
    },
    setColor: function(value) {
      if (value === "none") {
        this.color = null;
        return;
      }

      this.color = value;
    },
    ...mapActions("stockPhotos", ["search", "nextPage"])
  },
  computed: {
    ...mapState("stockPhotos", {
      results: state => state.results,
      searching: state => state.searching,
      activeProviderId: state => state.activeProviderId,
      noResults: state => state.noResults
    }),
    ...mapGetters("stockPhotos", ["shouldShowLoadMore"]),
    
    ...mapState({
      importingImage: state => state.importingImage
    }),
    ...mapGetters(["importingProgress"]),

    shouldDisableSearch: function() {
      return (
        this.searching ||
        ([1, 3].includes(this.activeProviderId) && !this.query)
      );
    },
    shouldShowSearchMessage: function() {
      return !this.results.length && !this.searching && !this.noResults;
    }
  }
};
</script>

<style scoped>
.color-buttons {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  margin-bottom: 30px;
  justify-content: space-between;
}

.color-buttons > *:not(:last-child) {
  margin-right: 15px;
}

.attribution {
  position: absolute;
  top: 0;
  left: 50%;
  height: fit-content;
  max-width: 90%;

  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.15s ease-out;

  background: var(--background-primary);
  border-radius: var(--round-sm);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 5px;

  z-index: 2;
}

.choose-btn {
  --ggs: 0.6;

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  opacity: 0;
  transition: all 0.15s ease-out;

  background: var(--background-gradient);
  color: #fff;
  border-radius: var(--round-sm);
  font-family: var(--font-primary);

  height: 25px;
  width: 80px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);

  z-index: 2;
}

.choose-btn:hover {
  cursor: pointer;
}

.masonry-item::before {
  content: "";
  transition: opacity 0.15s linear;
  opacity: 0;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
}
.masonry-item:hover::before {
  opacity: 1;
}

.masonry-item:hover .choose-btn {
  bottom: 15px;
  opacity: 1;
}

.masonry-item:hover .attribution {
  top: 15px;
  opacity: 1;
}

.masonry-item:hover .attribution {
  bottom: 15px;
  opacity: 1;
}

.masonry-item {
  position: relative;
}

.masonry-item img {
  width: 100%;
  height: auto;
}

.wrapper {
  display: flex;
  height: calc(100vh - 115px);
}

.sidebar {
  height: 100%;
  width: 270px;
  padding: 0 20px;
}

.content {
  flex: 1;
  max-height: 100%;
  overflow: hidden auto;
  padding-right: 10px;
  padding-bottom: 20px;
}

.search-field {
  margin-bottom: 10px;
}

.search-images-banner {
  font-family: var(--font-primary);
  font-size: 2em;
  line-height: normal;
  text-align: center;
  color: var(--text-secondary);
  margin-top: 60px;
}

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
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