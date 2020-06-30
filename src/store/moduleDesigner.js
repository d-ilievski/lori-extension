const moduleDesigner = {

    namespaced: true,

    state: {
        activeTool: null,
        recentColors: [],
        suggestedColors: [],
        fonts: [
            "Alegreya SC",
            "Allura",
            "Anton",
            "Coiny",
            "Copse",
            "DM Serif Text",
            "Dokdo",
            "Electrolize",
            "Faster One",
            "Flamenco",
            "Krona One",
            "Lobster",
            "Londrina Shadow",
            "Lora",
            "Megrim",
            "Monoton",
            "MuseoModerno",
            "Nanum Brush Script",
            "New Rocker",
            "Notable",
            "Open Sans",
            "Orbitron",
            "Oxygen",
            "Parisienne",
            "Permanent Marker",
            "Piedra",
            "Playfair Display",
            "Poiret One",
            "Press Start 2P",
            "PT Sans",
            "PT Serif",
            "Ribeye Marrow",
            "Roboto",
            "Roboto Condensed",
            "Roboto Mono",
            "Rubik",
            "Rye",
            "Shadows Into Light",
            "Six Caps",
            "Unica One",
            "Vibes",
            "Yellowtail"
        ]
    },
    actions: {
        setActiveTool: ({ commit }, tool) => {
            commit('setActiveTool', tool);
        },
        loadRecentColors: ({ commit }) => {
            chrome.storage.local.get('recentColors', colors => {
                commit('loadRecentColors', colors);
            });
        },
        storeRecentColors: ({ state }) => {
            chrome.storage.local.set({ recentColors: state.recentColors });
        },
        saveSuggestedColors: ({ commit }, { LightMuted, Muted, DarkMuted, LightVibrant, Vibrant, DarkVibrant }) => {
            commit('saveSuggestedColors', [LightMuted.hex, Muted.hex, DarkMuted.hex, LightVibrant.hex, Vibrant.hex, DarkVibrant.hex])
        },
        loadPalettes: ({ commit }) => {
            const colorPalettes = require("nice-color-palettes/200");
            commit('savePalettes', colorPalettes);
        }
    },
    mutations: {
        setActiveTool: (state, tool) => (state.activeTool = tool),
        saveSuggestedColors: (state, colors) => (state.suggestedColors = colors),
        savePalettes: (state, colorPalettes) => (state.colorPalettes = colorPalettes)
    },
    getters: {
        shouldShowLoadMore: state => {
        }
    },
}

export default moduleDesigner;