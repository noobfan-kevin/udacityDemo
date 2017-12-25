!function () {
    var map = undefined;
    var center = { lat: 39.9946658285, lng: 116.3302634561 };


    var markerInfoList = [
        {
            position: { lat: 39.992855, lng: 116.396284 },
            title: '鸟巢',
            keyWords: '鸟巢',
            filter: ['niaochao', '鸟巢', 'the Bird\'s Nest'],
            id: 1
        },
        {
            position: { lat: 39.9925696077, lng: 116.3379089550 },
            title: '五道口',
            keyWords: '五道口',
            filter: ['wudaokou', '五道口'],
            id: 2
        },
        {
            position: { lat: 39.992866, lng: 116.390343 },
            title: '水立方',
            keyWords: '水立方',
            filter: ['the Water Cube', 'shuilifang', '水立方'],
            id: 3
        },
        {
            position: { lat: 40.0028847612, lng: 116.3270871606 },
            title: '清华大学',
            keyWords: '清华大学',
            filter: ['qinghuadaxue', 'Tsinghua University', '清华大学'],
            id: 4
        },

        {
            position: { lat: 40.0059086573, lng: 116.3032236151 },
            title: '圆明园',
            keyWords: '圆明园',
            filter: ['yuanmingyuan', 'The Old Summer Palace', '圆明园'],
            id: 5
        },
        {
            position: { lat: 40.015055, lng: 116.393336 },
            title: '北京奥林匹克公园',
            keyWords: '北京奥林匹克公园',
            filter: ['beijingaolinpikegongyuan', 'the Beijing Olympic Park', '北京奥林匹克公园'],
            id: 6
        },
        {
            position: { lat: 39.992655, lng: 116.310941 },
            title: '北京大学',
            keyWords: '北京大学',
            filter: ['beijingdaxue', 'Peking University', '北京大学', 'beida'],
            id: 7
        },
        {
            position: { lat: 39.918177, lng: 116.396943 },
            title: '故宫',
            keyWords: '故宫',
            filter: ['gugong', 'The Imperial Palace', 'The Palace Museum', '故宫'],
            id: 8
        },
        {
            position: { lat: 39.994694, lng: 116.346389 },
            title: '北京语言大学',
            keyWords: '北京语言大学',
            filter: ['Beijing Language and Culture University', 'beijingyuyandaxue', 'beiyu', '北京语言大学', '北语'],
            id: 9
        },
        {
            position: { lat: 39.990419, lng: 116.35892 },
            title: '北京科技大学',
            keyWords: '北京科技大学',
            filter: ['University of Science and Technology Beijing', 'beijingkejidaxue', 'beikeda', '北京科技大学', '北科大'],
            id: 10
        },
    ]

    /**
     * init function
     */
    function init() {
        initMap();
        markerInit(markerInfoList);
    }

    /**
     * init all markers
     * @param {*} markerInfoList 
     */
    function markerInit(markerInfoList) {
        map.resetMarkerList();
        markerInfoList.forEach((marker) => {
            map.markerFactory(map, marker);
        });
    }

    function initMap() {
        map = new MAP(center);
    }


    /**
     * mount click event to marker
     * @param {*} marker 
     * @param {*} infoWindow 
     */
    function mountMarkerClickEvent(marker, infoWindow) {
        marker.addListener('click', function () {
            infoWindow.open(map, marker)
        });
    }

    /**
     * reset markers be shown on map
     * @param {*new marker list} list 
     */
    function resetMarker(list) {
        markerInit(list);
    }

    function showTargetMarkerInfo(title) {
        map.showTargetMarker(title)
    }
    window.TOOL = {
        init,
        initMap,
        markerInit,
        markerInfoList,
        resetMarker,
        showTargetMarkerInfo
    }
}();