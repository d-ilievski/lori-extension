<template>
  <div id="export-management">
    <export-header :image="image" @back="back"></export-header>
    <div class="wrapper">
      <div class="platforms-wrapper">
        <export-platform
          v-for="platform in platforms"
          @click="choosePlatform"
          v-bind="platform"
          :key="platform.id"
          :active="platform.id === currentPlatform"
        ></export-platform>
      </div>
      <transition-group appear name="fade" class="options-wrapper" tag="div">
        <platform-option
          v-for="item in currentPlatformOptions"
          :key="item.id"
          :item="item"
          @choose="chooseOption"
        ></platform-option>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import ExportManagementHeaderVue from "../ExportManagementHeader.vue";
import ExportManagementPlatformVue from "../ExportManagementPlatform.vue";
import ExportManagementPlatformOptionVue from "../ExportManagementPlatformOption.vue";

export default {
  name: "export-management",
  components: {
    "export-header": ExportManagementHeaderVue,
    "export-platform": ExportManagementPlatformVue,
    "platform-option": ExportManagementPlatformOptionVue
  },
  data: () => {
    return {
      currentPlatform: 1,
      platforms: [
        {
          id: 1,
          name: "Instagram",
          icon: "gg-instagram"
        },
        {
          id: 2,
          name: "Facebook",
          icon: "gg-profile"
        },
        {
          id: 3,
          name: "Web",
          icon: "gg-browser"
        },
        {
          id: 4,
          name: "Twitter",
          icon: "icofont-twitter"
        },
        {
          id: 5,
          name: "LinkedIn",
          icon: "icofont-linkedin"
        },
        {
          id: 6,
          name: "Pinterest",
          icon: "icofont-pinterest"
        },
        {
          id: 7,
          name: "Youtube",
          icon: "icofont-youtube-play"
        },
        {
          id: 8,
          name: "Tumblr",
          icon: "icofont-tumblr"
        }
      ],
      platformOptions: [
        {
          platformId: 1,
          items: [
            {
              id: 1,
              platformId: 1,
              title: "Post",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 2,
              platformId: 1,
              title: "Story",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 3,
              platformId: 1,
              title: "Horizontal Post Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 4,
              platformId: 1,
              title: "Square Post Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 5,
              platformId: 1,
              title: "Vertical Post Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 6,
              platformId: 1,
              title: "Story Ad",
              icon: "gg-square",
              locked: true,
              active: false
            }
          ]
        },
        {
          platformId: 2,
          items: [
            {
              id: 7,
              platformId: 2,
              title: "Cover Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 8,
              platformId: 2,
              title: "Shared Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 9,
              platformId: 2,
              title: "Shared Link",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 10,
              platformId: 2,
              title: "Highlight Image",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 11,
              platformId: 2,
              title: "Event Image",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 12,
              platformId: 2,
              title: "Feed Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 13,
              platformId: 2,
              title: "Carousel Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 14,
              platformId: 2,
              title: "Right Column Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 15,
              platformId: 2,
              title: "Instant Article",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 16,
              platformId: 2,
              title: "Marketplace Ad",
              icon: "gg-square",
              locked: true,
              active: false
            }
          ]
        },
        {
          platformId: 3,
          items: [
            {
              id: 17,
              platformId: 3,
              title: "PLACEHOLDER",
              icon: "gg-square",
              locked: false,
              active: false
            }
          ]
        },
        {
          platformId: 4,
          items: [
            {
              id: 18,
              platformId: 4,
              title: "Profile Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 19,
              platformId: 4,
              title: "Header Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 20,
              platformId: 4,
              title: "In-Stream Photo",
              icon: "gg-square",
              locked: false,
              active: false
            }
          ]
        },
        {
          platformId: 5,
          items: [
            {
              id: 21,
              platformId: 5,
              title: "Personal Profile Image",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 22,
              platformId: 5,
              title: "Personal Background Image",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 23,
              platformId: 5,
              title: "Company Logo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 24,
              platformId: 5,
              title: "Square Logo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 25,
              platformId: 5,
              title: "Company Cover Image",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 26,
              platformId: 5,
              title: "Banner Image for Company Pages",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 27,
              platformId: 5,
              title: "Hero Image",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 28,
              platformId: 5,
              title: "Shared Image or Link",
              icon: "gg-square",
              locked: true,
              active: false
            }
          ]
        },
        {
          platformId: 6,
          items: [
            {
              id: 29,
              platformId: 6,
              title: "Profile Picture",
              icon: "gg-square",
              locked: false,
              active: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    back: function() {
      this.$router.push({ name: "DownloadsList" });
    },
    choosePlatform: function(id) {
      this.currentPlatform = id;
    },
    chooseOption: function(option) {
      this.$router.push({
        name: "Tools",
        params: { item: this.$route.params.item, option }
      });
    }
  },
  computed: {
    image: function() {
      return this.$route.params.item;
    },
    currentPlatformOptions: function() {
      let found = this.platformOptions.find(
        option => option.platformId === this.currentPlatform
      );

      if (!found) return [];

      return found.items;
    }
  },
  mounted: function() {
    // make the window wider
    document.documentElement.style.width = "800px";
    document.documentElement.style.height = "600px";
  }
};
</script>

<style scoped>
/* animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  height: 400px;
  padding: 10px;
}

.platforms-wrapper {
  max-height: 100%;
  overflow: hidden auto;
  width: 250px;
  background-color: var(--background-primary);
}

.options-wrapper {
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;
  overflow: hidden auto;
  flex: 1;
  max-height: 100%;
}
</style>