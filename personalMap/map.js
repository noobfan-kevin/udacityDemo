window.MAP = class map {
    constructor(center) {
        this.center = center;
        this.map = this.mapFactory();
        this.infoWindow = this.infoWindowFactory('');
        this.markerList = [];
        this.BaiKeUrl = 'http://baike.baidu.com/api/openapi/BaikeLemmaCardApi';
    }

    mapFactory() {
        return new google.maps.Map(document.getElementById('map'), {
            center: this.center,
            zoom: 12
        });
    }

    markerFactory(G_map, info) {
        let marker = new google.maps.Marker({
            position: info.position,
            map: this.map,
            title: info.title,
            keyWord: info.keyWords,
            animation: google.maps.Animation.DROP,
        });

        this.markerList.push(marker);
        marker.addListener('click', () => {
            this.populateInfoWindow(marker);
            this.toggleBounce(marker);
        });
    }

    resetMarkerList() {
        this.markerList.forEach((marker) => {
            marker.setMap(null);
        });
        this.markerList = [];
    }

    infoWindowFactory(info) {
        return new google.maps.InfoWindow({
            content: info
        })
    }

    contentHtmlFactory(content) {
        return `
        <h3>${content.desc}</h3>
        <p>${content.abstract}</p>
        `;
    }

    /**
     * information window event handle
     * @param {*target marker} marker 
     */
    populateInfoWindow(marker) {
        this.map.setCenter(marker.position);
        if (this.infoWindow.marker == marker) {
            return;
        }
        this.getInfoFromBaiKe(marker.keyWord)
            .then((success) => {
                this.showInfoWindow(marker, success);
            }, (error) => {
                this.showInfoWindow(marker, error);
            })
    }

    /**
     * stop other marker's animation, start target marker's animation
     * @param {*marker} marker 
     */
    toggleBounce(marker) {
        this.markerList.forEach((marker) => {
            marker.setAnimation(null);
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    showInfoWindow(marker, content) {
        this.infoWindow.marker = marker;
        this.infoWindow.setContent(content);
        this.infoWindow.open(this.map, marker);
        this.infoWindow.addListener('closeclick', () => {
            this.infoWindow.marker = null;
            this.infoWindow.close();
        });
    }

    /**
     * get information from BaiKe
     * @param {*key information} keyWord 
     */
    getInfoFromBaiKe(keyWord) {
        let url = `${this.BaiKeUrl}?scope=103&format=json&appid=379020&bk_key=${keyWord}&bk_length=600`;
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'jsonp',
                success: (success) => {
                    resolve(this.contentHtmlFactory(success));
                },
                error: (error) => {
                    reject(`<h3>Oops, can not load ${keyWord} information.</h3>`);
                }

            });
        });
    }

    showTargetMarker(title) {
        let marker = this.markerList.filter((marker) => {
            return marker.title === title;
        });
        if (marker.length === 1) {
            this.populateInfoWindow(marker[0]);
        }
    }
}