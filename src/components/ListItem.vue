<template>
  <div class="list-item" @mouseenter="toggleImage" @mouseleave="toggleImage">
    <div class="thumbnail">
      <img v-if="showImage" :src="filepath" />
    </div>
    <div class="info" @click="choose">
      <div class="title">{{filename}}</div>
      <div class="description">
        <div class="size">{{fileSize}}</div>
        <div class="date">{{image.endTime | moment("DD MMM. YYYY")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import u from "../util/utils";
export default {
  name: "list-item",
  props: {
    image: Object
  },
  data: () => {
    return {
      showImage: false
    }
  },
  methods: {
    choose: function() {
      this.$emit("choose", this.image);
    },
    toggleImage: function() {
      this.showImage = !this.showImage;
    },
  },
  computed: {
    fileSize: function() {
      if (!this.image) return;

      if (this.image.fileSize > 1000000) {
        return `~${Math.round(this.image.fileSize / 1000000)} MB`;
      } else if (this.image.fileSize > 1000) {
        return `~${Math.round(this.image.fileSize / 1000)} kB`;
      } else {
        return `~${this.image.fileSize} B`;
      }
    },
    filename: function() {
      if (!this.image) return;
      return u.pathToFilename(this.image.filename);
    },
    filepath: function() {
      if (!this.image) return;

      return `file://${this.image.filename}`;
    }
  }
};
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 0px;
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
}

.thumbnail {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  border-radius: var(--round-small);

  background: var(--background-secondary);
}

.thumbnail img {
  object-fit: cover;
  max-height: 100%;
  min-width: 100%;
}

.info {
  margin-left: 10px;
  padding: 5px 0;
  flex: 1;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 337px;
}

.description {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
}

.list-item:hover {
  cursor: pointer;
}

.list-item:hover .title {
  font-weight: bold;
  color: var(--primary)
}
</style>