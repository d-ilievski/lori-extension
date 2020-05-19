import store from '@/store'
import Axios from "axios"

const unsplash_base = "https://api.unsplash.com";
const pixabay_base = "https://pixabay.com";
const pexels_base = "https://api.pexels.com";

export default {
    searchUnsplash(query, color, page) {
        return Axios.get(
            `${unsplash_base}/search/photos`,
            {
                headers: {
                    "Authorization": `Client-ID xMpdfmJVtmPUXGBLGDPCJXgGKXb2deLatqpx3nsCaJw`
                },
                params: {
                    query,
                    color,
                    page
                }
            });
    },
    searchPixabay(query, color, page) {
        return Axios.get(
            `${pixabay_base}/api`,
            {
                params: {
                    key: "16611328-485f64e4732e5aace0bc2ba65",
                    q: query,
                    colors: color,
                    page
                }
            });
    },
    searchPexels(query, page) {
        return Axios.get(
            `${pexels_base}/v1/search`,
            {
                headers: {
                    "Authorization": `563492ad6f917000010000013ace9cc14074448280f6b78dfe2f8936`,
                },
                params: {
                    query,
                    page
                }
            });
    },
};