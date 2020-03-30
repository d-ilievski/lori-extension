<template>
  <div class="option" :class="{'active':active, 'locked':item.locked}">
    <div class="info">
      <i class="gg-info"></i>
    </div>
    <div class="remove" v-if="active">
      <i class="gg-trash"></i>
    </div>
    <div class="label" @click="choose">
      <i :class="item.icon"></i>
      <div class="title">{{item.title}}</div>
    </div>
    <div class="actions">
      <div class="btn choose" v-if="isChooseActive" @click="choose">
        <span>Choose</span>
        <i class="gg-math-plus"></i>
      </div>
      <div class="btn edit" v-if="active" @click="choose">
        <span>Edit</span>
        <i class="gg-pen"></i>
      </div>
      <div class="btn unlock" v-if="item.locked">
        <span>Unlock</span>
        <i class="gg-arrow-top-right-r"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "platform-option",
  props: {
    item: Object
  },
  methods: {
    choose: function() {
      this.$emit("choose", this.item);
    }
  },
  computed: {
    isChooseActive: function() {
      return !this.active && !this.locked;
    },
    active: function() {
      return this.exportData.platformOptions.some(
        option => option.id === this.item.id
      );
    },
    ...mapState({
      exportData: state => state.exportData
    })
  }
};
</script>

<style scoped>
.option {
  --ggs: 0.7;

  width: 150px;
  height: 150px;
  color: var(--text-primary);
  border-radius: var(--round-lg);
  border-color: transparent;
  margin-left: 5px;
  margin-bottom: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  transition: border-color 0.25s ease;
}
.option:hover {
  border: 0.5px solid var(--primary);
  color: var(--primary);
}

.option.active {
  background: var(--background-gradient);
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  color: #fff;
}
.option.locked {
  color: var(--primary-light);
}
.option.locked:hover {
  border-color: var(--primary-light);
}

.option .info {
  position: absolute;
  top: 0;
  right: 15px;
  opacity: 0;
  color: var(--text-secondary);
  transition: all 0.15s ease-out;
}
.option .info:hover {
  color: var(--primary);
  cursor: pointer;
}
.option.active .info {
  color: #fff;
}
.option:hover .info,
.option:hover .remove {
  top: 15px;
  opacity: 1;
}

.option .remove {
  position: absolute;
  top: 0;
  left: 15px;
  opacity: 0;
  color: #fff;
  transition: all 0.15s ease-out;
}

.option .remove:hover {
  cursor: pointer;
}

.option .label {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-primary);
}

.option .label:hover {
  cursor: pointer;
}

.option .label .title {
  margin-top: 5px;
  transition: margin 0.15s ease;
}

.option .actions .btn {
  --ggs: 0.6;

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  opacity: 0;
  transition: all 0.15s ease-out;

  background: var(--background-gradient);
  color: #fff;
  border-radius: var(--round-sm);
  font-family: var(--font-primary);

  height: 25px;
  width: 80px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.option .actions .btn:hover {
  cursor: pointer;
}
.option:hover .actions .btn {
  bottom: 15px;
  opacity: 1;
}

.option .actions .btn.edit {
  background: #fff;
  color: var(--text-primary);
}
.option .actions .btn.edit:hover {
  color: var(--primary);
}
</style>