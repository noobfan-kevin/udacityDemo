!function (window, $) {
    const POSITION_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const WEATHER_ICON_ARRAY = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
    const COUNT_IN_ROW = 4;

    var underMatching = false;
    var isCounting = false;
    var countingID = null;
    var successMatch = 0;
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
            html += '<li class="card open show" value=' + className + '><i class="fa ' + className + '"></i></li>';
            return html;
        }, '');
    }

    function mountHtml() {
        var html = getHtml();
        $('.deck').html(html);
    }

    function init() {
        mountStartGameEvent();

    }
    function mountStartGameEvent() {
        $('.start-btn').off('click').on('click', () => {
            mountHtml();
            var intervalID = null;
            var seconds = 10;
            intervalID = setInterval(() => {
                seconds -= 1;
                $('.seconds').attr('value', seconds).text(seconds);
                if (seconds === 0) {
                    clearInterval(intervalID);
                    mountCardClickEvent();
                    removeTempClass();
                    mountRestartEvent();
                }
            }, 1000);
        });
    }

    function startCountTime() {
        var seconds = 0;
        countingID = setInterval(() => {
            seconds += 1;
            $('.seconds').attr('value', seconds).text(seconds);
            if (seconds > 60) {
                removeSecondStar();
                return;
            }
            if (seconds > 40) {
                removeThirdStar();
            }
        }, 1000);
    }

    function mountCardClickEvent() {
        $('.card').off('click').on('click', (e) => {
            if (!isCounting) {
                startCountTime();
                isCounting = true;
            }
            if (underMatching) {
                return;
            }
            if ($('.open').length === 2) {
                return;
            }
            var timeoutID = null;
            var $element = $(e.target);
            var $target = $element.hasClass('card') ? $element : $element.parent();
            if ($target.hasClass('match')) {
                return;
            }
            $target.addClass('open');
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                $target.addClass('show');
                underMatching = $('.show').length !== 1;
                if (!underMatching) {
                    return;
                }
                checkMatch($($('.open')[0]).attr('value'), $($('.open')[1]).attr('value'))
            }, 400);

        });
    }

    function mountRestartEvent() {
        $('.restart').off('click').on('click', () => {
            if (confirm('Are you really want to restart game?')) {
                restartGame();
            }
        });
    }

    function restartGame() {
        clearInterval(countingID);
        $('.seconds').attr('value', 10).text(10);
        $('.moves').attr('value', -1).text(0);
        $('.stars').attr('value', 3).html(`<li><i class="star fa fa-star"></i></li>
            <li><i class="star fa fa-star"></i></li>
            <li><i class="star fa fa-star"></i></li>`
        );
        $('.deck').html(`<div class="start-control">
            <button class="start-btn">START</button>
            <br>
            <span>Once you start game, you only have 10s to remember all cards.</span>
            </div>`
        );
        mountStartGameEvent();
        isCounting = false;
    }
    function checkMatch(first, second) {
        if (first === undefined || second === undefined) {
            return;
        }
        var timeoutID = null;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            if (first === second) {
                matchAnimation();
                return;
            }
            errorAnimation();
        }, 600);
    }

    function removeTempClass() {
        underMatching = false;
        $('.show').removeClass('open').removeClass('show');
        var value = parseInt($('.moves').attr('value'));
        setSteps(value + 1);
    }
    function setSteps(steps) {
        $('.moves').attr('value', steps).text(steps);
        var currentStar = $('.stars').attr('value');
        if (currentStar === 1) {
            return;
        }

        if (steps > 15) {
            removeSecondStar();
            return;
        }

        if (steps > 10) {
            removeThirdStar();
        }
    }

    function removeSecondStar() {
        if ($($('.star')[1]).hasClass('fa-star-o')) {
            return;
        }
        $('.stars').attr('value', 2);
        $($('.star')[1]).removeClass('fa-star').addClass('fa-star-o');
    }

    function removeThirdStar() {
        if ($($('.star')[2]).hasClass('fa-star-o')) {
            return;
        }
        $('.stars').attr('value', 1);
        $($('.star')[2]).removeClass('fa-star').addClass('fa-star-o');
    }

    function matchAnimation() {
        $('.show').addClass('match');
        removeTempClass();
        successMatch += 1;
        if (successMatch === 8) {
            showCongratulationPage();
        }
    }

    function errorAnimation() {
        $('.show').addClass('error');
        var timeoutID = null;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            $('.show').removeClass('error');
            removeTempClass();
        }, 600);
    }
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showCongratulationPage() { 
        clearInterval(countingID);
        var start = $('.stars').attr('value');
        var seconds = $('.seconds').attr('value');
        var steps = $('.moves').attr('value');
        $('.win-message').text('With '+start+'star and use '+seconds+' seconds, '+steps+'moves');
        $('.congratulation').show();
        mountAgainEvent();
    }

    function mountAgainEvent() {
        $('.again').off('click').on('click',()=> {
            $('.congratulation').hide();
            restartGame();
        });
    }

    window.FunctionService = {
        init
    }

}(window, jQuery);
