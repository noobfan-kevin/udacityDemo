!function () {
    window.ImageStore = class ImageStore {
        constructor() {
            this.cacheList = {};
        }

        add(key, value) {
            this.cacheList[key] = value;
        }

        get(key) {
            return this.cacheList[key];
        }

        has(key) {
            return this.cacheList.hasOwnProperty(key);
        }
    }
}();
