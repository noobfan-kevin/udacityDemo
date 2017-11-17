!function (window, $) {
    const POSITION_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const WEATHER_ICON_ARRAY = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
    const COUNT_IN_ROW = 4;
    /**
     * 
     */
    function getLinearArray(positionArray) {
        return POSITION_ARRAY.reduce((array, item) => {
            var index = getRandomIntInclusive(0, positionArray.length - 1);
            var position = positionArray.splice(index, 1);
            array[position] = WEATHER_ICON_ARRAY[item % 8];
            return array;
        }, Array(16));
    }

    // function cutLinearArrayIntoTwoDimensionalArray(linearArray) {
    //     var times = Math.ceil(linearArray.length / COUNT_IN_ROW);
    //     var twoDimensionalArray = [];
    //     while (times !== 0) {
    //         twoDimensionalArray.push(linearArray.splice(0, COUNT_IN_ROW));
    //         times -= 1;
    //     }
    //     return twoDimensionalArray;
    // }

    function getHtml() {
        var linearArray = getLinearArray(Object.assign([], POSITION_ARRAY));
        return linearArray.reduce((html, className) => {
            html += '<li class="card" value=' + className + '><i class="fa ' + className + '"></i></li>';
            return html;
        }, '');
    }

    function startGame() {
        var html = getHtml();
        $('.deck').html(html);
    }

    function init() {
        startGame();
        mountCardClickEvent();

    }

    function mountCardClickEvent() {
        $('.card').on('click', (e) => {
            var timer = null;
            var $element = $(e.target);
            var $target = $element.hasClass('card') ? $element : $element.parent();
            $target.addClass('open');
            clearTimeout(timer);
            timer = setTimeout(() => {
                $target.addClass('show');
            }, 400);

        })
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.FunctionService = {
        init
    }

}(window, jQuery);
