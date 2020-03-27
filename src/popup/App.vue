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
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Baloo+2|Lato&display=swap");
@import url("https://css.gg/c");
@import url("https://unpkg.com/@icon/icofont/icofont.css");

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

html {
  width: 450px;
  height: 450px;
  /* transition: all .1s ease; */
}

body {
  font-family: var(--font-secondary);
  color: var(--text-primary);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-primary);
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

.cropper-view-box {
  outline-color: var(--primary) !important;
}

.cropper-point {
  background-color: var(--primary) !important;
}

</style>

<style scoped>
.content {
  margin-top: 56px;
}
</style>