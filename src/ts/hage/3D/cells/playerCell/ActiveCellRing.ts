import { Texture, Sprite } from "pixi.js";

class ActiveCellRing {
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

  getSprite(): Sprite {
    return this.pool[this.index++] || this.newSprite();
  }

  createTexture(): void {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
    const size: number = 512;
    const thickness: number = 0.075;

    canvas.width = size;
    canvas.height = size;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, (size / 2) - (size * (thickness / 2)), 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = size * thickness;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

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

export default new ActiveCellRing();
