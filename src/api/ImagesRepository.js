import Repository from "./Repository";

const resource = "/files";

export default {
    getRecipePhoto(id) {
        return Repository.get(`${resource}/${id}`);
    },
    uploadPhoto(file, name) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        return Repository.post(`${resource}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
};