import Vue from 'vue'
import Vuex from 'vuex'
import u from '@/util/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentImage: null,
    currentPlatformOptionSettings: null,
    downloads: null,
    currentPlatform: 1,
    exportData: {
      imageFile: null,
      filename: null,
      platformOptions: []
    },
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
        icon: "icofont icofont-twitter"
      },
      {
        id: 5,
        name: "LinkedIn",
        icon: "icofont icofont-linkedin"
      },
      {
        id: 6,
        name: "Pinterest",
        icon: "icofont icofont-pinterest"
      },
      {
        id: 7,
        name: "Youtube",
        icon: "icofont icofont-youtube-play"
      },
      {
        id: 8,
        name: "Tumblr",
        icon: "icofont icofont-tumblr"
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
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 2,
            platformId: 1,
            title: "Story",
            icon: "gg-square",
            locked: false,
            active: false,
            cropperOptions: {
              viewMode: 1,
              aspectRatio: 9 / 16,
              aspectRatioDisplay: '9 : 16',
              // responsive: true,
              minCroppedWidth: 600,
              minCroppedHeight: 1067,
            }
          },
          {
            id: 3,
            platformId: 1,
            title: "Horizontal Post Ad",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 4,
            platformId: 1,
            title: "Square Post Ad",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 5,
            platformId: 1,
            title: "Vertical Post Ad",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 6,
            platformId: 1,
            title: "Story Ad",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
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
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 8,
            platformId: 2,
            title: "Shared Photo",
            icon: "gg-square",
            locked: false,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 9,
            platformId: 2,
            title: "Shared Link",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 10,
            platformId: 2,
            title: "Highlight Image",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 11,
            platformId: 2,
            title: "Event Image",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 12,
            platformId: 2,
            title: "Feed Ad",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 13,
            platformId: 2,
            title: "Carousel Ad",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 14,
            platformId: 2,
            title: "Right Column Ad",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 15,
            platformId: 2,
            title: "Instant Article",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 16,
            platformId: 2,
            title: "Marketplace Ad",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
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
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
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
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 19,
            platformId: 4,
            title: "Header Photo",
            icon: "gg-square",
            locked: false,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 20,
            platformId: 4,
            title: "In-Stream Photo",
            icon: "gg-square",
            locked: false,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
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
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 22,
            platformId: 5,
            title: "Personal Background Image",
            icon: "gg-square",
            locked: false,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 23,
            platformId: 5,
            title: "Company Logo",
            icon: "gg-square",
            locked: false,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 24,
            platformId: 5,
            title: "Square Logo",
            icon: "gg-square",
            locked: false,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 25,
            platformId: 5,
            title: "Company Cover Image",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 26,
            platformId: 5,
            title: "Banner Image for Company Pages",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 27,
            platformId: 5,
            title: "Hero Image",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          },
          {
            id: 28,
            platformId: 5,
            title: "Shared Image or Link",
            icon: "gg-square",
            locked: true,
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
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
            active: false,
            cropperOptions: {
              viewMode: 1,
            }
          }
        ]
      }
    ],
  },
  actions: {
    setCurrentImage: function ({ commit }, item) {

      // create a blob ready to upload from the download item;
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (xhttp.response) {
            const reader = new FileReader();

            reader.readAsDataURL(xhttp.response);
            reader.onloadend = function () {

              const base64data = reader.result;

              let imageFile = u.blobToFile(base64data);
              let filename = u.pathToFilename(item.filename);

              commit('setCurrentImage', { item, imageFile, filename });
            };
          }
        }
      };
      xhttp.open("GET", "file://" + item.filename, true);
      xhttp.responseType = "blob";
      xhttp.send();

    },
    setCurrentPlatformOptionSettings: function ({ commit }, option) {
      commit('setCurrentPlatformOptionSettings', { option })
    },
    fetchDownloads: function ({ commit }) {

      let options = {
        orderBy: ["-startTime"],
        limit: 50,
        state: "complete",
        exists: true
      };

      chrome.downloads.search(options, result => {
        commit('setDownloads', { result });
      });
    },
    storePlatformOptionData: function ({ commit }, cropData) {
      commit('storePlatformOptionData', { cropData });
    },
    choosePlatform: function ({ commit }, id) {
      commit('choosePlatform', { id });
    }
  },
  mutations: {
    setCurrentImage: function (state, { item, imageFile, filename }) {
      state.currentImage = item;
      state.exportData.imageFile = imageFile;
      state.exportData.filename = filename;
    },
    setCurrentPlatformOptionSettings: function (state, { option }) {
      state.currentPlatformOptionSettings = option;
    },
    setDownloads: function (state, downloads) {
      state.downloads = downloads;
    },
    storePlatformOptionData: function (state, { cropData }) {

      // if exists, update
      // else create new

      const opt = state.exportData.platformOptions.find(option => option.id === state.currentPlatformOptionSettings.id)

      if (opt) {
        opt.cropData = { ...cropData };
      } else {
        state.exportData.platformOptions.push({
          ...(({ platformId, id }) => ({ platformId, id }))(state.currentPlatformOptionSettings),
          cropData: { ...cropData }
        });
      }


      console.log(state);
    },
    choosePlatform: function (state, { id }) {
      state.currentPlatform = id;
    }
  },
  getters: {
    latestImages: state => {

      if (!state.downloads) return [];

      let filtered = state.downloads.result.filter(download => {
        return download.mime.match(new RegExp(/image\/[a-z]+/g));
      });

      return filtered;
    },

    currentStoredData: state => {
      const existing = state.exportData.platformOptions.find(
        platform => platform.id === state.currentPlatformOptionSettings.id
      );

      if (existing)
        return existing.cropData;

      return null;
    }
  },
  modules: {
  }
})
