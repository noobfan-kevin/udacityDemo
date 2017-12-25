window.ViewModel = class myViewModel {
    constructor() {
      this.locationList = ko.observableArray([]);
      this.displayFilter = ko.observable(false);
      this.filter = ko.observable('');
    }

    setLocation(list) {
      this.locationList(list);
    }

    resetLocationList() {
      this.locationList([]);
    }

    addLocation(location) {
      this.locationList.push(location);
    }

    toggleFilter() {
        console.log(this.displayFilter());
        this.displayFilter(!this.displayFilter());
    }
    closeFilter() {
        this.displayFilter(false);
    }

    /**
     * filter
     */
    doFilter() {
        var keyWords = this.filter().toLowerCase();
        var list = TOOL.markerInfoList.filter((marker)=> {
            return marker.filter.some((keyword)=> keyword.toLowerCase().indexOf(keyWords)!==-1)
        });
        this.setLocation(list);
        TOOL.resetMarker(list);
    }

    filterItemClicked(title) {
        TOOL.showTargetMarkerInfo(title);
    }
  }