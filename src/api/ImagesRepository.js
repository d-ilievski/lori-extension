import Repository from "./Repository";
import store from '@/store'

const resource = "/files";

export default {
    getRecipePhoto(id) {
        return Repository.get(`${resource}/${id}`);
    },
    uploadImage(file, name, platformOptions) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
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