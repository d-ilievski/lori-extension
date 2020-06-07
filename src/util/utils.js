window.debounceTimers = [];

export default {
    blobToFile: function (dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], 'download', { type: mime });
    },
    pathToFilename: function (path) {
        let delimeter = window.navigator.platform == "Win32" ? "\\" : "/";
        let parts = path.split(delimeter);
        return parts[parts.length - 1];
    },
    /**
     * returns string with all characters to lowercase, no special characters except '_' with which spaces are replaced.
     * e.g. Profile Photo (vertical) = profile_photo_vertical
    */
    normalizeString: function (str) {

        str = str.toLowerCase().replace(/[^\w^\s]/g, "").replace(/[\s]/g, "_").replace(/_{2,}/g, "_"); // eslint-disable-line

        return str;
    },
    toDataURL: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var fr = new FileReader();

            fr.onload = function () {
                callback(this.result);
            };

            fr.readAsDataURL(xhr.response); // async call
        };

        xhr.send();
    },
    generateGUID: function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    debounce: function (id, callback, ms) {

        if (window.debounceTimers[id]) {

            return;
        }

        window.debounceTimers[id] = setTimeout(function () {
            window.debounceTimers[id] = null;
        }, ms);

        callback();
    }
}