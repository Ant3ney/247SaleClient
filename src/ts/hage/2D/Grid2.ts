import { extras, Texture, Sprite, Container } from "pixi.js";
import Settings from "../../game/Settings";
import WorldBorder from "../../game/Border";

const { TilingSprite } = extras;

const tileHeight: number = 16;
const tileWidth: number = 16;

class Border {
    container: Container;
    sprite: Sprite;
    height: number;
    width: number;

    constructor() {
        this.container = new Container();

        this.height = innerHeight;
        this.width = innerWidth;
    }

    initialise(): void {
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
    }

    render(ctx: CanvasRenderingContext2D): void {
        //     ctx.fillStyle = config.colorBack;
        // ctx.fillRect(0, 0, 40, 40);
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = .2;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5 / 2, 0);
        ctx.lineTo(5 / 2, 40);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 5 / 2);
        ctx.lineTo(40, 5 / 2);
        ctx.stroke();
    }
}

export default new Border();
