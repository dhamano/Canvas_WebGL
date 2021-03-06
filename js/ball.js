import { detectCollision } from './collisionDetection.js';

export default class Ball {

    constructor (game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.position = {
            x: (game.gameWidth / 2) - (game.ballSize / 2) + (Math.floor(Math.random() * 20) +1),
            y: (game.gameHeight - 75),
        }
        this.speed = {
            x: game.ballSpeed,
            y: game.ballSpeed,
        }
        this.radius = game.ballSize / 2;
    }

    reset() {
        this.position = {
            x: (this.gameWidth / 2) - (this.radius) + (Math.floor(Math.random() * 20) +1),
            y: (this.gameHeight - 75),
        }
        this.game.paddle.reset();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#c00";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#300";
        ctx.stroke();
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // wall on left or right
        if( this.position.x > this.gameWidth - this.radius || this.position.x < 0 + this.radius ) {
            this.speed.x = -this.speed.x;
        }

        // wall on top
        if( this.position.y < 0 + this.radius ) {
            this.speed.y = -this.speed.y;
        }

        // wall of bottom
        if ( this.position.y > this.gameHeight - this.radius ) {
            this.game.lives--;
            this.reset();
        }

        // collision detection with paddles
        if( detectCollision( this, this.game.paddle )) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.radius;
        }
    }

}