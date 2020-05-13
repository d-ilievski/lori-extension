import store from '@/store'
import Axios from "axios"

const unsplash_base = "https://api.unsplash.com/";

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
    }
};