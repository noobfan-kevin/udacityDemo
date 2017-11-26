!function () {
    const WIDTH_NAX = 500;
    const SINGLE_HEIGHT = 83;
    const SINGLE_WIDTH = 101;
    const ENEMY_COUNT = 4;

    var UserWinTheGame = false;

    var lastTime = 0,
        enemyList = [];

    /**
     * start game
     */
    function init() {
        window.store$ = new ImageStore();
        window.imageLoader$ = new ImageLoader();
        window.engine$ = new Engine();
        window.player$ = new Player(SINGLE_WIDTH * 2, SINGLE_HEIGHT * 5);
        mountKeyBoardEvent();
        appendEnemy(ENEMY_COUNT);
        renderControl();
    }

    /**
     * keyboard event
     */
    function mountKeyBoardEvent() {
        document.addEventListener('keyup', function (e) {
            var allowedKeys = {
                37: { key: 'x', value: -SINGLE_WIDTH, row: 0 },
                38: { key: 'y', value: -SINGLE_HEIGHT, row: -1 },
                39: { key: 'x', value: SINGLE_WIDTH, row: 0 },
                40: { key: 'y', value: SINGLE_HEIGHT, row: 1 }
            };
            player$.handleInput(allowedKeys[e.keyCode]);
        });
    }

    /**
     * first time append enemies to game
     * @param {*enemy number} num 
     */
    function appendEnemy(num) {
        while (num-- > 0) {
            enemyList.push(new Enemy(0, getRowPosition(num), getRandomSpeed(), num));
        }
    }

    /**
     * if Enemy run out of seeable area, reset it.
     * @param {*Enemy object} Enemy 
     */
    function resetEnemy(Enemy) {
        var row = getRandomIntInclusive(1, 3);
        Enemy.reset(0, getRowPosition(row), getRandomSpeed(), row);
    }

    /**
     * update position
     * @param {*interval of render } dt 
     */
    function update(dt) {
        enemyList.forEach((Enemy) => {
            checkCollision(Enemy);
            Enemy.update(dt);
            if (Enemy.x > WIDTH_NAX) {
                resetEnemy(Enemy);
            }
        });
    }

    /**
     * check player in a collision with enemy or not 
     * @param {*enemy object} Enemy 
     */
    function checkCollision(Enemy) {
        if (player$.row === -1) {
            playerWin();
        }
        if (Enemy.row === player$.row) {
            if (Enemy.x < player$.x && (Enemy.x + SINGLE_WIDTH) > player$.x) {
                player$.reset();
            }
            if (Enemy.x > player$.x && Enemy.x < (player$.x + SINGLE_WIDTH)) {
                player$.reset();
            }
        }
    }

    /**
     * win the game
     */
    function playerWin() {
        $('.congratulation').show();
        UserWinTheGame = true;
        $('.again').off('click').on('click', function () {
            UserWinTheGame = false;
            $('.congratulation').hide();
            player$.reset();
        });
    }

    function render() {
        engine$.render(() => {
            enemyList.forEach((Enemy) => {
                Enemy.render();
            });
            player$.render();
        });

    }

    function renderControl() {
        window.requestAnimationFrame(renderControl);
        if (UserWinTheGame) {
            return;
        }
        var now = Date.now();
        if (lastTime === 0) {
            lastTime = now;
        }
        var dt = (now - lastTime) / 1000.0;

        render();
        update(dt);
        lastTime = now;
    }


    /**
     * enemy append y position
     * @param {*row} row 
     */
    function getRowPosition(row) {
        return 60 + row * SINGLE_HEIGHT;
    }

    function getRandomSpeed() {
        return getRandomIntInclusive(100, 300);
    }
    /**
     * get a number within min and max
     * @param {*min number} min 
     * @param {*max number} max 
     */
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    window.Service = {
        init
    }
}();
