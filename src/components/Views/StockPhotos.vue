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
        <div class="search">
          <input-field
            class="search-field"
            type
            v-model="query"
            placeholder="Search Photos... 🔍"
            focused
            @submit="search({query})"
          ></input-field>
          <custom-button class="search-btn" block type="primary" @click="search({query})">Search</custom-button>
        </div>
      </div>
      <div class="content">
        <div class="search-images-banner" v-if="!results.length">
          Select one of Lori's friends and
          <br />search for FREE stock photos! 😎
        </div>
        <masonry :cols="3" :gutter="10">
          <div class="masonry-item" v-for="result in results" :key="result.id">
            <div class="attribution"></div>
            <img :src="result.urls.thumb" />
            <div class="choose-btn" @click="choose(result)">
              Choose
              <i class="gg-math-plus"></i>
            </div>
          </div>
        </masonry>
        <div class="load-more" v-if="shouldShowLoadMore">
          <custom-button type="primary" @click="nextPage">Load More...</custom-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "stock-photos",
  components: {},
  data: () => {
    return {
      query: null
    };
  },
  methods: {
    back: function() {
      this.$router.push({ name: "MainMenu" });
    },
    choose: function(image) {
        
      this.$store.dispatch("importFromLink", image.urls.full).then(() => {
        this.$router.push({ name: "ExportManagement" });
      });
    },
    ...mapActions("stockPhotos", ["search", "nextPage"])
  },
  computed: {
    ...mapState("stockPhotos", {
      results: state => state.results
    }),
    ...mapGetters("stockPhotos", ["shouldShowLoadMore"])
  }
};
</script>

<style scoped>
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
  bottom: 15px;
  opacity: 1;
}

.masonry-item {
  position: relative;
}
.masonry-item:hover {
  cursor: pointer;
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
  width: 300px;
}

.content {
  flex: 1;
  max-height: 100%;
  overflow: hidden auto;
  padding-right: 10px;
}

.search {
  padding: 0 30px;
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