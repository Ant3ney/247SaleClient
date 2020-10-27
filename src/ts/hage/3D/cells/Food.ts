import Cell from "../../../entities/Cell";
import { Texture, Sprite, Container } from "pixi.js";
import Settings from "../../../game/Settings";

class Food {
  texture: Texture;
  pool: Sprite[];
  index: 0;

  constructor() {
    this.texture = Texture.WHITE;
    this.pool = [];
    this.index = 0;
  }

  initialise(): void {
    this.createTexture();
  }

  reset(): void {
    this.index = 0;
  }

  add(container: Container, cell: Cell): void {
    const sprite: Sprite = this.pool[this.index++] || this.newSprite();
    const color: string = <boolean>Settings.singleColorPellets ? <string>Settings.pelletColor : cell.color;
    sprite.x = cell.x;
    sprite.y = cell.y;
    sprite.width = cell.radius * 2;
    sprite.height = cell.radius * 2;
    sprite.tint = parseInt(color.replace('#', '0x'));
    container.addChild(sprite);
  }

  createTexture(): void {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
    const size: number = 128;

    canvas.width = size;
    canvas.height = size;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    this.texture = Texture.fromCanvas(canvas);
  }

  newSprite(): Sprite {
    const sprite: Sprite = new Sprite(this.texture);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this.pool.push(sprite);
    return sprite;
  }
}

export default new Food();
