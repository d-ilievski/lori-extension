import StockPhotosRepository from "@/api/StockPhotosRepository";

const moduleStockPhotos = {

    namespaced: true,

    state: {
        activeProviderId: 1,
        searching: false,
        noResults: false,
        page: 1,
        totalPages: 1,
        query: null,
        color: null,
        results: [],
    },
    actions: {
        search: ({ commit, state }, { query, color, page }) => {

            if(state.activeProviderId !== 2 && !query)
                return;

            if (query === state.query && color === state.color && page === state.page)
                return;

            if (query !== state.query || color !== state.color || !page) {
                page = 1;
            }

            commit('setSearching', true);

            // UNSPLASH
            if (state.activeProviderId === 1) {
                StockPhotosRepository.searchUnsplash(query, color, page)
                    .then(({ data }) => {

                        const totalPages = data.total_pages;

                        const noResults = data.results.length ? false : true;

                        const results = data.results.map(({ id, user, urls, links }) => ({
                            id,
                            user: {
                                username: user.username,
                                profile: user.links.html,
                                platform: "Unsplash",
                                platformLink: links.html
                            },
                            image: {
                                thumb: urls.thumb,
                                full: urls.full
                            }
                        }));


                        commit('setSearching', false);
                        commit('setResults', { results, query, color, page, totalPages, noResults });
                    })
                    .catch(() => {
                        commit('setSearching', false);
                    });

                // PIXABAY
            } else if (state.activeProviderId === 2) {
                StockPhotosRepository.searchPixabay(query, color, page)
                    .then(({ data }) => {

                        const totalPages = Math.ceil(data.totalHits / 20);

                        const noResults = data.hits.length ? false : true;

                        const results = data.hits.map(({ id, pageUrl, user, webformatURL, imageURL }) => ({
                            id,
                            user: {
                                username: user,
                                profile: pageUrl,
                                platform: "Pixabay",
                                platformLink: "https://pixabay.com/"
                            },
                            image: {
                                thumb: webformatURL,
                                full: imageURL
                            }
                        }));

                        commit('setSearching', false);
                        commit('setResults', { results, query, color, page, totalPages, noResults });
                    })
                    .catch(() => {
                        commit('setSearching', false);
                    });

            } else if (state.activeProviderId === 3) {
                StockPhotosRepository.searchPexels(query, page)
                    .then(({ data }) => {

                        const noResults = data.photos.length ? false : true;

                        const totalPages = Math.ceil(data.total_results / 15);

                        const results = data.photos.map(({ id, url, photographer, photographer_url, src }) => ({
                            id,
                            user: {
                                username: photographer,
                                profile: photographer_url,
                                platform: "Pexels",
                                platformLink: url
                            },
                            image: {
                                thumb: src.medium,
                                full: src.original
                            }
                        }));

                        commit('setSearching', false);
                        commit('setResults', { results, query, color, page, totalPages, noResults });
                    })
                    .catch(() => {
                        commit('setSearching', false);
                    });
            } else {
                commit('setSearching', false);
            }
        },
        nextPage: ({ state, dispatch }) => (dispatch("search", { query: state.query, color: state.color, page: state.page + 1 })),
        setProvider: ({ commit, state }, providerId) => {
            if (state.activeProviderId === providerId)
                return;

            commit("setProvider", providerId)
        }
    },
    mutations: {
        setResults: (state, { results, query, color, page, totalPages, noResults }) => {

            if (page === 1) {
                state.results = [];
            }

            state.results.push(...results);
            state.query = query;
            state.color = color;
            state.page = page;
            state.totalPages = totalPages;
            state.noResults = noResults;
        },
        setSearching: (state, searching) => (state.searching = searching),
        setProvider: (state, providerId) => {
            state.activeProviderId = providerId;
            state.results = [];
            state.totalPages = 1;
            state.page = 1;
        },
    },
    getters: {
        shouldShowLoadMore: state => {
            return state.page < state.totalPages;
        }
    },
}

export default moduleStockPhotos;