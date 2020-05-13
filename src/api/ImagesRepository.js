import Repository from "./Repository";
import store from '@/store'

const resource = "/files";

export default {
    getGoogleImage(id, token) {
        return Repository.get('https://www.googleapis.com/drive/v2/files/' + id + '?alt=media', {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            responseType: "blob"
        });
    },
    uploadImage(file, name, guid, platformOptions) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("guid", guid);
        formData.append("platformOptions", platformOptions);
        return Repository.post(`${resource}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                store.dispatch('updateUploadProgress', Math.round((loaded / total) * 100))
            },
            // responseType: 'arraybuffer'
        });
    }
};