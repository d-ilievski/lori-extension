import StockPhotosRepository from "@/api/StockPhotosRepository";

const moduleStockPhotos = {

    namespaced: true,

    state: {
        activeProviderId: 1,
        loading: false,
        page: 1,
        totalPages: 1,
        query: null,
        color: null,
        results: [],
    },
    actions: {
        search: function ({ commit, state }, { query, color, page }) {

            if(query === state.query && color === state.color && page === state.page)
                return;

            if(query !== state.query || color !== state.color) {
                page = 1;
            }

            if (state.activeProviderId === 1) {
                
                StockPhotosRepository.searchUnsplash(query, color, page)
                    .then(({ data }) => {
                        commit('setResults', { data, query, color, page });
                    });
            }
        },
        nextPage: function ({ commit, state, dispatch }) {
            dispatch("search", { query: state.query, color: state.color, page: state.page + 1 });
        }
    },
    mutations: {
        setResults: function (state, { data, query, color, page }) {

            if (page === 1) {
                state.results = [];
            }

            state.query = query;
            state.color = color;
            state.page = page;

            state.results.push(...data.results);
            state.totalPages = data.total_pages;

        },
    },
    getters: {
        shouldShowLoadMore: state => {
            return state.page < state.totalPages;
        }
    },
}

export default moduleStockPhotos;