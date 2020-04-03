import Repository from "./Repository";

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
            responseType: 'arraybuffer'
        });
    }
};