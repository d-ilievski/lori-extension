const moduleDesigner = {

    namespaced: true,

    state: {
        activeTool: null
    },
    actions: {
        setActiveTool: ({ commit }, tool) => {
            commit('setActiveTool', tool);
        }
    },
    mutations: {
        setActiveTool: (state, tool) => (state.activeTool = tool),
    },
    getters: {
        shouldShowLoadMore: state => {
        }
    },
}

export default moduleDesigner;