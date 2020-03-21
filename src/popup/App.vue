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

  --round-small: 10px;
  --round-medium: 15px;
  --round-large: 20px;

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
</style>

<style scoped>
.content {
  margin-top: 56px;
}
</style>