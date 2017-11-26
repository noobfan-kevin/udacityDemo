!function () {
    const SINGLE_HEIGHT = 83;
    const SINGLE_WIDTH = 101;

    window.Player = class Player {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.img = 'images/char-horn-girl.png';
            this.row = 4;
        }

        render() {
            imageLoader$.load(this.img).then(() => {
                ctx$.drawImage(store$.get(this.img), this.x, this.y);
            });
        }

        reset() {
            this.x = SINGLE_WIDTH * 2;
            this.y = SINGLE_HEIGHT * 5;
            this.row  = 4;
        }

        handleInput(info) {
            if (!info) {
                return;
            }
            this[info.key] += info.value;
            this.row += info.row;
            if (this.x < 0 || this.x > (SINGLE_WIDTH * 4) + 1 || this.y < -30 || this.y > (SINGLE_HEIGHT * 5) + 1) {
                this[info.key] -= info.value;
                this.row -= info.row;
            }
        }
    }
}();
