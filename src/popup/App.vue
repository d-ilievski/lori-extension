<template>
  <div id="popup">
    <app-header></app-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeaderVue from "../components/AppHeader.vue";

export default {
  name: "Popup",
  components: {
    "app-header": AppHeaderVue
  },
  mounted() {
    
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
</style>

<style scoped>
.content {
  margin-top: 56px;
}
</style>