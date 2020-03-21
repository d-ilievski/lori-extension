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
    }
}