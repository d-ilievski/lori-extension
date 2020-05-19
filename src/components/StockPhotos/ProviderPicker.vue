<template>
  <div class="provider-picker">
    <div :class="{'active':activeProviderId == 1}" class="provider-wrapper" @click="setProvider(1)">
      <img src="@/assets/unsplash-logo.svg" alt="Unsplash Logo" />
      <div class="label"></div>
    </div>

    <div
      :class="{'active':activeProviderId === 2}"
      class="provider-wrapper"
      @click="setProvider(2)"
    >
      <img src="@/assets/pixabay-logo.svg" alt="Pixabay Logo" />
      <div class="label"></div>
    </div>

    <div
      :class="{'active':activeProviderId === 3}"
      class="provider-wrapper"
      @click="setProvider(3)"
    >
      <img src="@/assets/pexels-logo.svg" alt="Pexels Logo" />
      <div class="label"></div>
    </div>
  </div>
</template> 

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "provider-picker",
  methods: {
    ...mapActions("stockPhotos", ["setProvider"])
  },
  computed: {
    ...mapState("stockPhotos", {
      activeProviderId: state => state.activeProviderId
    })
  }
};
</script>

<style scoped>
.provider-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.provider-wrapper {
  width: 70px;
  height: 70px;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: var(--round-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border .2s ease;
}
.provider-wrapper:hover,
.provider-wrapper.active {
  cursor: pointer;
  border: 2px solid var(--primary);
}
.provider-wrapper > img {
  width: 100%;
  height: auto;
}
</style>