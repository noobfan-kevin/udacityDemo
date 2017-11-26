!function () {
    window.ImageLoader = class ImageLoader {
        constructor() {
        }

        load(urls) {
            if (urls instanceof Array) {
                return Promise.all(
                    urls.map((url) => {
                        return this.loadUrl(url);
                    })
                );
            }
            return this.loadUrl(urls);
        }

        loadUrl(url) {
            return new Promise((resolve, reject) => {
                if (store$.has(url)) {
                    resolve();
                }
                var img = new Image();
                img.onload = function () {
                    store$.add(url,img);
                    resolve();
                }.bind(this);
                img.src = url;
            });
        }
    }
}();
