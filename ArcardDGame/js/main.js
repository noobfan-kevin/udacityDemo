!function ($) {

    window.Engine = class Engine {
        constructor() {
            this.lastTime = 0;

            var canvas = document.createElement('canvas');
            window.ctx$ = canvas.getContext('2d');
            canvas.width = 505;
            canvas.height = 606;
            $('body').append(canvas);
        }

        render(cb) {

            var rowImages = [
                'images/water-block.png',   // 这一行是河。
                'images/stone-block.png',   // 这一行是石头
                'images/stone-block.png',   // 这一行是石头
                'images/stone-block.png',   // 这一行是石头
                'images/stone-block.png',   // 这一行是石头
                'images/grass-block.png'    // 这一行是草地
                
            ],
                numRows = 6,
                numCols = 5,
                row, col;
            imageLoader$.load(rowImages).then(() => {
                for (row = 0; row < numRows; row++) {
                    for (col = 0; col < numCols; col++) {
                        ctx$.drawImage(store$.get(rowImages[row]), col * 101, row * 83);
                    }
                }
                cb();
            });
        }
    }

}(jQuery);
