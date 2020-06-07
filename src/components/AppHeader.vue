<template>
  <header>
    <div class="left">
      <div class="logo">
        <img src="@/assets/lori-logo-flower.svg" alt="logo" @click="$router.push({ name: 'MainMenu' })"/>
      </div>
    </div>
    <div class="right">
      <div class="profile">
        <div class="photo">
          <img src="@/assets/profile.png" />
        </div>
        <div class="name">Daniel Ilievski</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "app-header"
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: var(--background-primary);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
}

.logo {
  width: 30px;
  height: 30px;
}

.logo img {
  width: 100%;
  height: auto;
}

.profile {
  display: flex;
  align-items: center;
}

.profile:hover {
  cursor: pointer;
}

.profile .name {
  font-family: "Baloo 2", cursive;
  font-size: 1.2em;
}

.profile .photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.profile .photo img {
  width: 100%;
  height: auto;
}
</style>