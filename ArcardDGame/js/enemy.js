!function () {
    window.Enemy = class Enemy {
        constructor(x, y, step, row) {
            this.sprite = 'images/enemy-bug.png';
            this.x = x;
            this.y = y;
            this.row = row;
            this.step = step;
        }

        update(dt) {
            this.x += this.step * dt;
        }

        render() {
            imageLoader$.load(this.sprite).then(() => {
                ctx$.drawImage(store$.get(this.sprite), this.x, this.y);
            });
        }

        reset(x, y, step, row) {
            this.x = x;
            this.y = y;
            this.row = row;
            this.step = step;
        }
    }
}();
