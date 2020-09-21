<template>
  <div id="popup">
    <!-- allow drag and drop file upload -->
    <template v-if="shouldAllowDropUpload">
      <file-upload
        extensions="jpg,png,jpeg"
        ref="dropUpload"
        :drop="true"
        @input="onDropFileFromPc"
      ></file-upload>
      <div
        class="drag-backdrop"
        v-show="$refs.dropUpload && $refs.dropUpload.dropActive"
      >Drop your image anywhere 📦</div>
    </template>

    <app-header></app-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeaderVue from "../components/AppHeader.vue";

export default {
  name: "Lori",
  components: {
    "app-header": AppHeaderVue
  },
  computed: {
    shouldAllowDropUpload: function() {
      return this.$route.name === "MainMenu";
    }
  },
  methods: {
    onDropFileFromPc: function(drop) {
      this.$store.dispatch("chooseFileFromPc", drop[0].file).then(() => {
        this.$router.push({ name: "ExportManagement" });
      });
    }
  },
  created() {
    window.___gcfg = {
      parsetags: "explicit"
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Baloo+2|Lato&display=swap");
@import url("https://css.gg/css");
@import url("https://unpkg.com/@icon/icofont/icofont.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");
@import url("https://fonts.googleapis.com/css2?family=Alegreya+SC:ital,wght@0,400;0,700;1,400;1,700&family=Allura&family=Anton&family=Coiny&family=Copse&family=DM+Serif+Text:ital@0;1&family=Dokdo&family=Electrolize&family=Faster+One&family=Flamenco&family=Krona+One&family=Lobster&family=Londrina+Shadow&family=Lora:wght@400;700&family=Megrim&family=Monoton&family=MuseoModerno:wght@400;700&family=Nanum+Brush+Script&family=New+Rocker&family=Notable&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Orbitron:wght@400;700&family=Oxygen:wght@400;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Parisienne&family=Permanent+Marker&family=Piedra&family=Playfair+Display:wght@400;700&family=Poiret+One&family=Press+Start+2P&family=Ribeye+Marrow&family=Roboto+Condensed:wght@400;700&family=Roboto+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&family=Rubik:ital,wght@0,400;0,700;1,400;1,700&family=Rye&family=Shadows+Into+Light&family=Six+Caps&family=Unica+One&family=Vibes&family=Yellowtail&display=swap");

:root {
  --background-secondary: #f7f7f7;
  --background-primary: #fff;
  --background-gradient: linear-gradient(
    to right top,
    #ff9100,
    #f28a00,
    #e58200,
    #d97b00,
    #cc7400
  );

  --text-primary: #303030;
  --text-secondary: #a0a0a0;

  --primary: #ff9100;
  --primary-light: #ffc880;
  --primary-dark: #cc7400;

  --round-xs: 5px;
  --round-sm: 10px;
  --round-md: 15px;
  --round-lg: 20px;

  --header-height: 56px;

  --font-primary: "Baloo 2", cursive;
  --font-secondary: "Lato", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-secondary);
  color: var(--text-primary);
  line-height: 1.2em;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-primary);
}

::-webkit-scrollbar {
  width: 10px;
  background: linear-gradient(var(--text-secondary), var(--text-secondary))
    no-repeat center/.7px 100%;
}

::-webkit-scrollbar-thumb {
  background: var(--background-gradient);
  border-radius: var(--round-sm);
}

::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background: var(--primary);
}

.invisible {
  visibility: hidden;
}

.text-link {
  text-decoration: none;
  color: var(--primary);
}
.text-link:hover {
  cursor: pointer;
  text-decoration: underline;
}

.row {
  display: flex;
  /* justify-content: space-between; */
}

.col {
  flex: 1;
}

.col:not(:last-child) {
  padding-right: 10px;
}

label {
  font-family: var(--font-primary);
  color: var(--primary);
}

.button {
  --ggs: 0.6;

  border-radius: var(--round-sm);
  font-family: var(--font-primary);
  color: var(--text-primary);

  height: 35px;
  padding: 0 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 0;
  outline: 0;
}
.button:hover {
  cursor: pointer;
}

.button.block {
  width: 100%;
}

.button.primary {
  background: var(--background-gradient);
  color: #fff;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.button.primary:active {
  box-shadow: none;
}
.button.primary:hover {
  background: var(--primary);
}

.button.secondary {
  background: none;
}

.button.secondary:hover {
  color: var(--primary);
  border: 1px solid var(--primary);
}

.button.secondary:active {
  background: var(--background-gradient);
  color: #fff;
}

.cropper-view-box {
  outline-color: var(--primary) !important;
}

.cropper-point {
  background-color: var(--primary) !important;
}

.icofont-large {
  font-size: large;
}

.custom-slider {
  -webkit-appearance: none;
  height: 3px;
  background: var(--text-secondary);
  outline: none;
  opacity: 1;
  border-radius: 2px;
  margin: 10px 0;
  width: 100%;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: var(--primary);
  cursor: pointer;
  border-radius: 50%;
}

.custom-slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: var(--primary);
  cursor: pointer;
  border-radius: 50%;
}

.ui-color-picker {
  margin: 0 !important;
  background-color: transparent !important;
  width: auto !important;
}
.ui-color-picker .picker-area {
  padding: 0 !important;
}
.ui-color-picker .color-preview-area {
  padding: 0 !important;
}
.ui-color-picker .gradient-controls {
  height: 30px !important;
  padding: 0 !important;
}
</style>

<style scoped>
.content {
  margin-top: 56px;
}

.drag-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: var(--font-primary);
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}
</style>