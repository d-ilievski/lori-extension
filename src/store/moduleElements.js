import ElementsRepository from "../api/ElementsRepository";

const moduleDesigner = {

    namespaced: true,

    state: {
        authTokenFlaticon: null,
        authTokenFreesvg: null,
        elementsUnDraw: [],
        elementsFlaticon: [],
        elementsFreesvg: [],
        metadataFlaticon: null
    },
    actions: {
        auth: ({ commit }) => {
            ElementsRepository.authenticateFlaticon()
                .then(({ data }) => {
                    commit('setAuthTokenFlaticon', data.data.token);
                })

            ElementsRepository.authenticateFreesvg()
                .then(({ data }) => {
                    commit('setAuthTokenFreesvg', data.token);
                })
        },
        searchElements: ({ commit, state }, { query }) => {


            ElementsRepository.searchUndraw(query)
                .then(({ data }) => {
                    commit('setUnDrawElements', data.illustrations)
                })

            ElementsRepository.searchFlaticon(query, state.authTokenFlaticon)
                .then(({ data }) => {
                    commit('setFlaticonElements', data)
                });
                
            ElementsRepository.searchFreesvg(query, state.authTokenFreesvg)
                .then(({ data }) => {
                    commit('setFreesvgElements', data.data)
                });


        }
    },
    mutations: {
        setUnDrawElements: (state, elements) => (state.elementsUnDraw = elements),
        setFlaticonElements: (state, elements) => { state.elementsFlaticon = elements.data; state.metadataFlaticon = elements.metadata },
        setFreesvgElements: (state, elements) => { state.elementsFreesvg = elements; },
        setAuthTokenFlaticon: (state, token) => (state.authTokenFlaticon = token),
        setAuthTokenFreesvg: (state, token) => (state.authTokenFreesvg = token)
    },
    getters: {
    },
}

export default moduleDesigner;