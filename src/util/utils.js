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
    hexToRgb: (hex) => {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16),
            alpha: 1
        } : null;
    },
    rgbToHex: (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    rgbToObject: (rgbString) => {
        let result = rgbString.match(/\d+/g);
        return {
            red: parseInt(result[0]),
            green: parseInt(result[1]),
            blue: parseInt(result[2]),
            alpha: typeof result[3] !== 'undefined' ? parseFloat(result[3]) : 1
        }
    }
}