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

        this.sprite = new TilingSprite(getBackgroundTexture(), this.width + tileWidth, this.height + tileHeight);
    }

    initialise(): void {
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
    }

    run(): void {
        if (<boolean>Settings.showGrid) {
            if (this.container.children.length !== 1) {
                this.container.addChild(this.sprite);
            }
        } else {
            if (this.container.children.length !== 0) {
                this.container.removeChildren();
            }
            return;
        }

        const edgeX: number = WorldBorder.right - WorldBorder.left;
        const edgeY: number = WorldBorder.bottom - WorldBorder.top;

        this.sprite.x = WorldBorder.left + (edgeX / 2);
        this.sprite.y = WorldBorder.top + (edgeY / 2);

        this.sprite.width = edgeX;
        this.sprite.height = edgeY;

        // this.sprite.tint = parseInt((<string>Settings.sectorColor).replace('#', '0x'));

    }
}

export default new Border();

function getBackgroundTexture() {
    const config = {
        colorLine: '#faa',            // color for line (packet 21)
        colorGrid: '#000',            // color of grid line
        colorBack: '#f1f1f1',         // background color
        gridSpacing: 50,              // spacing of grid lines
        gridLine: 1,                  // thickness of a grid line
    };
    var ret = document.createElement('canvas'),
        c2d = ret.getContext('2d');
    ret.width = 40;
    ret.height = 40;
    c2d.fillStyle = config.colorBack;
    c2d.fillRect(0, 0, 40, 40);
    c2d.strokeStyle = config.colorGrid;
    c2d.globalAlpha = .2;
    c2d.lineWidth = config.gridLine;
    c2d.beginPath();
    c2d.moveTo(config.gridLine / 2, 0);
    c2d.lineTo(config.gridLine / 2, 40);
    c2d.stroke();
    c2d.beginPath();
    c2d.moveTo(0, config.gridLine / 2);
    c2d.lineTo(40, config.gridLine / 2);
    c2d.stroke();
    return Texture.fromCanvas(ret);
}
