import Vue from 'vue'
import Vuex from 'vuex'
import u from '@/util/utils.js'
import moduleStockPhotos from "@/store/moduleStockPhotos"
import moduleDesigner from "@/store/moduleDesigner"
import moduleElements from "@/store/moduleElements"

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
        name: "Web, Email & Custom",
        icon: "icofont icofont-image icofont-large"
      },
      {
        id: 2,
        name: "Instagram",
        icon: "icofont icofont-instagram icofont-large"
      },
      {
        id: 3,
        name: "Facebook",
        icon: "icofont icofont-facebook icofont-large"
      },
      {
        id: 4,
        name: "Twitter",
        icon: "icofont icofont-twitter icofont-large"
      },
      {
        id: 5,
        name: "LinkedIn",
        icon: "icofont icofont-linkedin icofont-large"
      },
      {
        id: 6,
        name: "Pinterest",
        icon: "icofont icofont-pinterest icofont-large"
      },
      {
        id: 7,
        name: "Youtube",
        icon: "icofont icofont-youtube-play icofont-large"
      },
    ],
    platformOptions: [
      {
        platformId: 1,
        items: [
          {
            id: 17,
            platformId: 1,
            platformName: "Custom",
            name: "Add",
            icon: "icofont icofont-large icofont-plus",
            locked: false,
            cropperSettings: {
              viewMode: 0,
            }
          }
        ]
      },
      {
        platformId: 2,
        items: [
          {
            id: 1,
            platformId: 2,
            platformName: "Instagram",
            name: "Square Post",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 600,
              minCroppedHeight: 600,
              prefCroppedWidth: 1080,
              prefCroppedHeight: 1080
            }
          },
          {
            id: 2,
            platformId: 2,
            platformName: "Instagram",
            name: "Landscape Post",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1.911 / 1,
              aspectRatioDisplay: '1.91 : 1',
              minCroppedWidth: 600,
              minCroppedHeight: 315,
              prefCroppedWidth: 1200,
              prefCroppedHeight: 628
            }
          },
          {
            id: 3,
            platformId: 2,
            platformName: "Instagram",
            name: "Portrait Post",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 4 / 5,
              aspectRatioDisplay: '4 : 5',
              minCroppedWidth: 600,
              minCroppedHeight: 750,
              prefCroppedWidth: 1080,
              prefCroppedHeight: 1350
            }
          },
          {
            id: 4,
            platformId: 2,
            platformName: "Instagram",
            name: "Story",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 9 / 16,
              aspectRatioDisplay: '9 : 16',
              minCroppedWidth: 600,
              minCroppedHeight: 1067,
              prefCroppedWidth: 1080,
              prefCroppedHeight: 1920
            }
          },
          {
            id: 5,
            platformId: 2,
            platformName: "Instagram",
            name: "Profile Picture",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 110,
              minCroppedHeight: 110,
              prefCroppedWidth: 110,
              prefCroppedHeight: 110
            }
          },
        ]
      },
      {
        platformId: 3,
        items: [
          {
            id: 6,
            platformId: 3,
            platformName: "Facebook",
            name: "Shared Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
            }
          },
          {
            id: 7,
            platformId: 3,
            platformName: "Facebook",
            name: "Link Thumbnail (Small)",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 200,
              minCroppedHeight: 200,
              prefCroppedWidth: 550,
              prefCroppedHeight: 550
            }
          },
          {
            id: 8,
            platformId: 3,
            platformName: "Facebook",
            name: "Link Thumbnail (Large)",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1.911 / 1,
              aspectRatioDisplay: '1.91 : 1',
              minCroppedWidth: 600,
              minCroppedHeight: 315,
              prefCroppedWidth: 1200,
              prefCroppedHeight: 630
            }
          },
          {
            id: 9,
            platformId: 3,
            platformName: "Facebook",
            name: "Highlight Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1.67,
              aspectRatioDisplay: '1 : 1.67',
              minCroppedWidth: 843,
              minCroppedHeight: 504,
              prefCroppedWidth: 1200,
              prefCroppedHeight: 717
            }
          },
          {
            id: 10,
            platformId: 3,
            platformName: "Facebook",
            name: "Event Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 16 / 9,
              aspectRatioDisplay: '16 : 9',
              minCroppedWidth: 470,
              minCroppedHeight: 174,
              prefCroppedWidth: 1920,
              prefCroppedHeight: 1080
            }
          },
          {
            id: 12,
            platformId: 3,
            platformName: "Facebook",
            name: "Landscape Ad",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1.911 / 1,
              aspectRatioDisplay: '1.91 : 1',
              minCroppedWidth: 600,
              minCroppedHeight: 600,
              prefCroppedWidth: 1200,
              prefCroppedHeight: 628
            }
          },
          {
            id: 13,
            platformId: 3,
            platformName: "Facebook",
            name: "Square Ad",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 600,
              minCroppedHeight: 600,
              prefCroppedWidth: 1200,
              prefCroppedHeight: 1200
            }
          },
          {
            id: 14,
            platformId: 3,
            platformName: "Facebook",
            name: "Portrait Ad",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1.911,
              aspectRatioDisplay: '1 : 1.91',
              minCroppedWidth: 600,
              minCroppedHeight: 600,
              prefCroppedWidth: 628,
              prefCroppedHeight: 1200
            }
          },
          {
            id: 15,
            platformId: 3,
            platformName: "Facebook",
            name: "Carousel Ad",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 600,
              minCroppedHeight: 600,
              prefCroppedWidth: 1080,
              prefCroppedHeight: 1080
            }
          },
        ]
      },
      {
        platformId: 4,
        items: [
          {
            id: 16,
            platformId: 4,
            platformName: "Twitter",
            name: "Profile Photo",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 200,
              minCroppedHeight: 200,
              prefCroppedWidth: 400,
              prefCroppedHeight: 400
            }
          },
          {
            id: 17,
            platformId: 4,
            platformName: "Twitter",
            name: "Header Photo",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 1500,
              minCroppedHeight: 500,
              prefCroppedWidth: 1500,
              prefCroppedHeight: 500,
            }
          },
          {
            id: 18,
            platformId: 4,
            platformName: "Twitter",
            name: "Expanded In-Stream Photo",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 2 / 1,
              aspectRatioDisplay: '2 : 1',
              minCroppedWidth: 440,
              minCroppedHeight: 220,
              prefCroppedWidth: 1024,
              prefCroppedHeight: 512,
            }
          },
          {
            id: 19,
            platformId: 4,
            platformName: "Twitter",
            name: "Collapsed In-Stream Photo",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 2 / 1,
              aspectRatioDisplay: '2 : 1',
              minCroppedWidth: 1024,
              minCroppedHeight: 512,
            }
          }
        ]
      },
      {
        platformId: 5,
        items: [
          {
            id: 20,
            platformId: 5,
            platformName: "LinkedIn",
            name: "Personal Profile Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 200,
              minCroppedHeight: 200
            }
          },
          {
            id: 21,
            platformId: 5,
            platformName: "LinkedIn",
            name: "Personal Background Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 4 / 1,
              aspectRatioDisplay: '4 : 1',
              minCroppedWidth: 1584,
              minCroppedHeight: 396,
              prefCroppedWidth: 1584,
              prefCroppedHeight: 396,
            }
          },
          {
            id: 22,
            platformId: 5,
            platformName: "LinkedIn",
            name: "Company Logo",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 300,
              minCroppedHeight: 300,
              prefCroppedWidth: 300,
              prefCroppedHeight: 300,
            }
          },
          {
            id: 23,
            platformId: 5,
            platformName: "LinkedIn",
            name: "Company Cover Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 2 / 1,
              aspectRatioDisplay: '2 : 1',
              minCroppedWidth: 1192,
              minCroppedHeight: 220,
            }
          },
          {
            id: 24,
            platformId: 5,
            platformName: "LinkedIn",
            name: "Banner Image for Company Pages",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              minCroppedWidth: 646,
              minCroppedHeight: 220,
            }
          },
          {
            id: 25,
            platformId: 5,
            platformName: "LinkedIn",
            name: "Hero Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 3 / 1,
              aspectRatioDisplay: '3 : 1',
              minCroppedWidth: 1128,
              minCroppedHeight: 376,
            }
          },
          {
            id: 26,
            platformId: 5,
            platformName: "LinkedIn",
            name: "Shared Image / Link Thumbnail",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1.91 / 1,
              aspectRatioDisplay: '1.91 : 1',
              minCroppedWidth: 552,
              minCroppedHeight: 289,
              prefCroppedWidth: 1104,
              prefCroppedHeight: 736,
            }
          }
        ]
      },
      {
        platformId: 6,
        items: [
          {
            id: 27,
            platformId: 6,
            platformName: "Pinterest",
            name: "Profile Picture",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 165,
              minCroppedHeight: 165,
              prefCroppedWidth: 2048,
              prefCroppedHeight: 2048,
            }
          },
          {
            id: 28,
            platformId: 6,
            platformName: "Pinterest",
            name: "Pin",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 165,
              minCroppedHeight: 165,
              prefCroppedWidth: 2048,
              prefCroppedHeight: 2048,
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
            platformName: "YouTube",
            name: "Channel Profile Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 1 / 1,
              aspectRatioDisplay: '1 : 1',
              minCroppedWidth: 98,
              minCroppedHeight: 98,
              prefCroppedWidth: 800,
              prefCroppedHeight: 800,
            }
          },
          {
            id: 30,
            platformId: 6,
            platformName: "YouTube",
            name: "Channel Cover Image",
            icon: "gg-square",
            locked: false,
            cropperSettings: {
              viewMode: 0,
              aspectRatio: 16 / 9,
              aspectRatioDisplay: '16 : 9',
              minCroppedWidth: 2560,
              minCroppedHeight: 1440,
              prefCroppedWidth: 2560,
              prefCroppedHeight: 1440,
            }
          }
        ]
      }
    ],
    uploadProgress: 0,
    importingImage: false,
    importingLoaded: 0,
    importingTotal: 0
  },
  actions: {
    clearState: function ({ commit, }) {
      return new Promise((resolve) => {
        chrome.storage.local.remove('store');
        commit('clearState');
        resolve();
      })
    },
    initState: function ({ commit }, state) {

      return new Promise((resolve, reject) => {
        commit('initState', { state });
        resolve();
      })
    },
    setCurrentImage: function ({ commit }, item) {

      return new Promise(resolve => {

        if (item.filePath && item.source == "pc") {
          commit('setCurrentImage', { item, imageFile: u.blobToFile(item.filePath), filename: item.filename });
          return;
        }

        // set source
        let source = "file://" + item.filename;

        if (item.filePath && item.source == "web") {
          source = item.filePath
        }

        // create a blob ready to upload from the download item;
        const xhttp = new XMLHttpRequest();

        // listen for `progress` event
        xhttp.onprogress = (event) => {
          commit("setImportingProgress", { progress: event.loaded, total: event.total })
        }

        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (xhttp.response) {

              const reader = new FileReader();

              reader.readAsDataURL(xhttp.response);
              reader.onloadend = function () {

                let base64data = reader.result;

                const imageFile = u.blobToFile(base64data);
                const filename = u.pathToFilename(item.filename);

                item.filePath = base64data;
                item.fileSize = imageFile.size;

                commit('setCurrentImage', { item, imageFile, filename });
                commit('setImportingImage', false);
                resolve();
              };
            }
          }
        };
        xhttp.open("GET", source, true);
        xhttp.responseType = "blob";
        xhttp.send();
      });


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
    storePlatformOptionData: function ({ commit, rootState }, cropData) {

      return new Promise(resolve => {
        commit('storePlatformOptionData', { cropData });
        chrome.storage.local.set({ store: rootState });
        resolve();
      });

    },
    deletePlatformOptionData: function ({ commit, rootState }, id) {
      commit('deletePlatformOptionData', { id });

      chrome.storage.local.set({ store: rootState });
    },
    selectPlatform: function ({ commit }, id) {
      commit('selectPlatform', { id });
    },
    updateUploadProgress: function ({ commit }, value) {
      commit('updateUploadProgress', { value });
    },
    chooseFileFromPc: function ({ commit, dispatch }, file) {

      return new Promise(resolve => {
        if (file) {
          dispatch('clearState');
          var reader = new FileReader();

          reader.onload = function (e) {

            let image = {
              filename: file.name,
              fileSize: file.size,
              filePath: e.target.result
            }

            commit('setCurrentImage', { item: image, imageFile: file, filename: file.name });

            resolve();
          }

          reader.readAsDataURL(file); // convert to base64 string
        }
      })


    },
    importFromLink: function ({ commit, dispatch }, url) {
      return new Promise(resolve => {

        if (url) {
          commit('clearState');

          let image = {
            filename: 'image.jpg',
            filePath: url,
            source: 'web'
          }

          commit('setImportingImage', true);

          dispatch("setCurrentImage", image).then(() => {
            resolve();
          });
        }
      })
    },
  },
  mutations: {
    setImportingProgress: function (state, { progress, total }) {

      state.importingLoaded = progress;
      state.importingTotal = total;
    },
    setImportingImage: function (state, loading) {
      state.importingImage = loading;

      if (!loading) {
        state.importingLoaded = 0;
        state.importingTotal = 0;
      }
    },
    clearState: function (state) {
      state.currentPlatformOptionSettings = null;
      state.currentPlatform = 1;
      state.currentImage = null;
      state.exportData = {
        imageFile: null,
        filename: null,
        platformOptions: []
      }
    },
    initState: function (state, storedState) {
      state.currentImage = storedState.state.currentImage;
      state.currentPlatform = storedState.state.currentPlatform;
      state.currentPlatformOptionSettings = storedState.state.currentPlatformOptionSettings;
      state.exportData = storedState.state.exportData;
    },
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
        const name = u.normalizeString(state.currentPlatformOptionSettings.name);
        const platformName = u.normalizeString(state.currentPlatformOptionSettings.platformName);
        state.exportData.platformOptions.push({
          ...(({ platformId, id, cropperSettings }) => (
            {
              platformId,
              id,
              cropperSettings,
            }))(state.currentPlatformOptionSettings),
          cropData: { ...cropData },
          name,
          platformName
        });
      }
    },
    deletePlatformOptionData: function (state, { id }) {
      const opt = state.exportData.platformOptions.find(option => option.id === id);
      if (opt) {
        state.exportData.platformOptions.splice(state.exportData.platformOptions.indexOf(opt), 1);
      }
    },
    selectPlatform: function (state, { id }) {
      state.currentPlatform = id;
    },
    updateUploadProgress: function (state, { value }) {
      state.uploadProgress = value;
    }
  },
  getters: {
    importingProgress: state => {

      return Math.round(state.importingLoaded / state.importingTotal * 100);
    },
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
    stockPhotos: moduleStockPhotos,
    designer: moduleDesigner,
    elements: moduleElements
  }
})
