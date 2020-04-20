<template>
  <div class="platform-container" :class="{'active':active}" @click="click">
    <div class="indicator" v-if="indicator">{{indicator}}</div>
    <div class="platform-logo">
      <i :class="icon"></i>
      <div class="name">{{name}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "platform",
  props: {
    name: String,
    active: Boolean,
    icon: String,
    id: Number
  },
  methods: {
    click: function() {
      this.$emit("click", this.id);
    }
  },
  computed: {
    ...mapState({
      exportData: state => state.exportData,
      platformOptions: state => state.platformOptions
    }),
    indicator: function() {
      if (!this.exportData) return;

      let numSelected = 0;

      this.exportData.platformOptions.map(option => {
        if (option.platformId === this.id) {
          numSelected++;
        }
      });

      const currentOption = this.platformOptions.find(
        option => option.platformId === this.id
      );
      let totalOptions = 0;
      if (currentOption) totalOptions = currentOption.items.length;

      if (numSelected > 0 && totalOptions > 0) {
        return `${numSelected} / ${totalOptions}`;
      }

      return "";
    }
  }
};
</script>

<style scoped>
.platform-container {
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: var(--round-md);
  position: relative;
}

.platform-container.active {
  background: var(--background-gradient);
  color: white;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
.platform-container.active:hover {
  color: white;
}

.platform-container:hover {
  cursor: pointer;
  color: var(--primary);
}

.platform-logo {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.name {
  user-select: none;
  margin-top: 10px;
}

.indicator {
  position: absolute;
  top: 15px;
  right: 15px;
  font-weight: bold;
}
</style>