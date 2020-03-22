import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedOptions: [],
  },
  actions: {
    addOption({ commit }, option) {
      commit('addOption', { option });
    }
  },
  mutations: {
    addOption(state, { option }) {
      state.selectedOptions.push(option);
      console.log('State:', state);
    },
    removeOption(state, { id }) {
      state.selectedOptions = state.selectedOptions.filter(option => option.id !== id);
      console.log('State:', state);
    },
  },
  modules: {
  }
})
