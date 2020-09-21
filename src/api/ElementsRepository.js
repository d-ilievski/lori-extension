import Axios from "axios"

const undraw_base = "https://undraw.co/api";
const flaticon_base = "https://api.flaticon.com/v2";
const freesvg_base = "https://freesvg.org/api/v1";

export default {
    searchUndraw(query) {
        return Axios.post(
            `${undraw_base}/search`,
            {
                query
            });
    },
    authenticateFlaticon() {

        const data = new FormData();
        data.append('apikey', '2a1115a45adff5f5d4896c75c17f533e1d7cc228')

        return Axios.post(
            `${flaticon_base}/app/authentication`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }
        )
    },
    authenticateFreesvg() {

        return Axios.post(
            `${freesvg_base}/auth/login`,
            {
                email: "hello@iamlori.app",
                password: "U2*6YpgDz4"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
    },
    searchFlaticon(q, authorizationToken) {
        return Axios.get(
            `${flaticon_base}/search/icons`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authorizationToken}`
                },
                params: {
                    q
                }
            }
        )
    },
    searchFreesvg(query, authorizationToken) {
        return Axios.get(
            `${freesvg_base}/search`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authorizationToken}`
                },
                params: {
                    query
                }
            }
        )
    }

};