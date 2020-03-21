<template>
  <div id="export-management">
    <div class="navigation">
      <div class="back" @click="back">
        <i class="gg-arrow-left"></i>
      </div>
    </div>
    <export-header :image="image"></export-header>
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
      <transition-group :delay="500" appear name="fade" class="options-wrapper" tag="div">
        <platform-option v-for="item in currentPlatformOptions" :key="item.id" :item="item"></platform-option>
      </transition-group>
    </div>
  </div>
</template>

<script>
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
        },

      ],
      platformOptions: [
        {
          platformId: 1,
          items: [
            {
              id: 1,
              title: "Post",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 2,
              title: "Story",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 3,
              title: "Horizontal Post Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 4,
              title: "Square Post Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 5,
              title: "Vertical Post Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 6,
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
              id: 1,
              title: "Cover Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 2,
              title: "Shared Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 3,
              title: "Shared Link",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 4,
              title: "Highlight Image",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 5,
              title: "Event Image",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 6,
              title: "Feed Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 7,
              title: "Carousel Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 8,
              title: "Right Column Ad",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 9,
              title: "Instant Article",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 10,
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
              id: 1,
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
              id: 1,
              title: "Profile Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 2,
              title: "Header Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 3,
              title: "In-Stream Photo",
              icon: "gg-square",
              locked: false,
              active: false
            },
          ]
        },
        {
          platformId: 5,
          items: [
            {
              id: 1,
              title: "Personal Profile Image",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 2,
              title: "Personal Background Image",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 3,
              title: "Company Logo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 4,
              title: "Square Logo",
              icon: "gg-square",
              locked: false,
              active: false
            },
            {
              id: 5,
              title: "Company Cover Image",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 6,
              title: "Banner Image for Company Pages",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 7,
              title: "Hero Image",
              icon: "gg-square",
              locked: true,
              active: false
            },
            {
              id: 8,
              title: "Shared Image or Link",
              icon: "gg-square",
              locked: true,
              active: false
            },
          ]
        },
        {
          platformId: 6,
          items: [
            {
              id: 1,
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
  },
  beforeDestroy: function() {
    // reset size
    document.documentElement.style.width = "450px";
    document.documentElement.style.height = "450px";
  }
};
</script>

<style scoped>
/* animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s;
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