<template>
  <div>
    <div class="navigation">
      <div class="back" @click="back">
        <i class="gg-arrow-left"></i>
      </div>
    </div>
    <div class="header">
      <div class="image-wrapper">
        <img :src="filepath" />
      </div>
      <div class="info">
        <div class="title">{{filename}}</div>
        <div class="description">
          <div class="size">{{fileSize}}</div>
          <div class="date">{{image.endTime | moment("DD MMM. YYYY")}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import u from "@/util/utils";

export default {
  name: "export-management-header",
  props: {
    image: Object
  },
  methods: {
    back: function() {
      this.$emit('back');
    }
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
.header {
  padding: 10px;
  border-bottom: 0.5px solid var(--background-secondary);
  display: flex;
  align-items: center;
}

.image-wrapper {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  border-radius: var(--round-small);
}

.image-wrapper:hover {
  cursor: pointer;
}

.image-wrapper:hover::before {
  content: "\ec82";
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 100%;
  height: 100%;

  font-family: IcoFont;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper img {
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
  margin-bottom: 5px;
}

.description {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
}

.navigation {
  --ggs: 0.7;
  padding-top: 15px;
  padding-left: 10px;
  color: var(--text-secondary);
  display: flex;
}

.navigation div:hover {
  cursor: pointer;
  color: var(--primary);
}
</style>