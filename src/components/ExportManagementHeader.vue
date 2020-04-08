<template>
  <div class="export-management-header">
    <transition name="appear">
      <div class="navigation" v-show="!showPreview">
        <div class="back" @click="back">
          <i class="gg-arrow-left"></i>
        </div>
      </div>
    </transition>
    <div class="header">
      <div class="image-wrapper" @click="togglePreviewImage" :class="{'open' : showPreview}">
        <img :src="filepath" ref="image" />
      </div>
      <transition name="appear">
        <div class="info" v-show="!showPreview">
          <div class="title">{{filename}}</div>
          <div class="description">
            <div class="size">{{fileSize}}</div>
            <div class="date">{{date}}</div>
          </div>
        </div>
      </transition>
    </div>
    <!-- <modal title="Image Preview" :show="showPreview" @close="togglePreviewImage">
      <template slot="body">
        <img :src="filepath" style="width: 100%; height: auto;"/>
      </template>
    </modal>-->
  </div>
</template>

<script>
import u from "@/util/utils";

export default {
  name: "export-management-header",
  props: {
    image: Object
  },
  data: () => {
    return {
      showPreview: false
    };
  },
  methods: {
    back: function() {
      this.$emit("back");
    },

    togglePreviewImage: function() {
      this.showPreview = !this.showPreview;
    },

    getOriginalImageSize: function() {
      return {
        width: this.$refs.image.naturalWidth,
        height: this.$refs.image.naturalHeight
      };
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
    },
    date: function() {
      if (!this.image) return;

      return this.$moment(this.image.endTime).format("DD MMM. YYYY");
    }
  }
};
</script>

<style scoped>
.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.25s;
  opacity: 1;
}
.appear-enter,
.fade-leave-to {
  opacity: 0;
}

.appear-leave-active {
  transition-delay: 0s;
}

.appear-enter-active {
  transition-delay: 0.25s;
}

.export-management-header {
  min-height: 108px;
  border-bottom: 0.5px solid var(--background-secondary);
}

.header {
  padding: 10px;
  /* border-bottom: 0.5px solid var(--background-secondary); */
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

  border-radius: var(--round-sm);

  transition: all 0.2s ease-in-out;

  background-image: linear-gradient(45deg, #bebebe 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #bebebe 75%),
    linear-gradient(45deg, transparent 75%, #bebebe 75%),
    linear-gradient(45deg, #bebebe 25%, #fff 25%);
  background-size: 20px 20px;
  background-position: 0 0, 0 0, -50px -50px, 50px 50px;

  box-shadow: 1px 3px 8px 0px rgba(0, 0, 0, 0.2);
}

.image-wrapper.open {
  width: 96%;
  height: 480px;

  position: absolute;
  top: 103px;
  left: 18px;
  /* transform: translateX(-50%); */
  z-index: 2;
  max-height: 480px;
  overflow: auto;
  padding-right: 5px;
}

.image-wrapper.open img {
  width: 100%;
  height: auto;

  object-fit: unset;
  max-height: unset;
  min-width: unset;

  position: absolute;
  top: 0;
  left: 0;
}

.image-wrapper:hover {
  cursor: pointer;
}

.image-wrapper.open:hover::before {
  content: none;
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