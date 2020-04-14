<template>
  <div class="progress-bar">
    <div class="progress" :style="{width: progress + '%'}">
      <span class="indicator">{{indicatorText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props: {
    progress: Number
  },
  computed: {
    indicatorText: function() {
      return this.progress < 100
        ? this.progress + "%"
        : "Lori is working... Please be patient.";
    }
  }
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  background: linear-gradient(
    180deg,
    transparent calc(50% - 1px),
    var(--text-secondary) calc(50%),
    transparent calc(50% - 1px)
  );
}

.progress {
  border-radius: var(--round-sm);
  background: var(--background-gradient);
  height: 20px;
  min-width: 5%;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: width 0.2s ease-in-out;
}

.indicator {
  color: #fff;
  font-weight: bold;
}
</style>