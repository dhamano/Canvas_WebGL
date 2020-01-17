export default class Paddle {

    constructor(game) {
        this.width = 150;
        this.height = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.maxSpeed = game.paddleSpeed;
        this.speed = 0;

        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight - this.height - 10,
        }
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    draw(ctx) {
        ctx.fillStyle = "#0cf";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // dt = delta time
    update(dt) {
        // if (!dt) return;
        // this.position.x += 5 / dt;
        this.position.x += this.speed;

        // setting bounds for paddle
        if(this.position.x < 0) {
            this.position.x = 0;
        };
        if(this.position.x > this.gameWidth - this.width) {
            this.position.x = this.gameWidth - this.width;
        };
    }

    stop() {
        this.speed = 0;
    }
}