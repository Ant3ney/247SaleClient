import Cell from "../../../entities/Cell";
import { Texture, Sprite, Container, BaseTexture, Rectangle } from "pixi.js";
import Settings from "../../../game/Settings";

class Virus {
  canvas: HTMLCanvasElement;
  baseTexture: BaseTexture;
  size: number;
  textures: {
    base: Texture,
    ring: Texture
  };
  pools: {
    base: Sprite[],
    ring: Sprite[]
  };
  index: {
    base: number,
    ring: number
  };

  constructor() {
    this.canvas = document.createElement(`canvas`);
    this.baseTexture = new BaseTexture();
    this.size = 256;
    this.textures = {
      base: Texture.WHITE,
      ring: Texture.WHITE
    };
    this.pools = {
      base: [],
      ring: []
    };
    this.index = {
      base: 0,
      ring: 0
    };
  }

  initialise(): void {
    this.createTextures();
  }

  reset(): void {
    this.index.base = 0;
    this.index.ring = 0;
  }

  add(container: Container, cell: Cell): void {
    const ratio: number = cell.radius / 70;
    const base: Sprite = this.pools.base[this.index.base++] || this.newBase();
    const ring: Sprite = this.pools.ring[this.index.ring++] || this.newRing();

    base.scale.set(ratio, ratio);
    base.position.set(cell.x, cell.y);
    base.tint = parseInt((<string>Settings.virusColor).replace('#', '0x'));
    container.addChild(base);

    ring.scale.set(ratio, ratio);
    ring.position.set(cell.x, cell.y);
    ring.tint = parseInt((<string>Settings.virusBorderColor).replace('#', '0x'));
    container.addChild(ring);
  }

  createTextures(): void {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
    const size: number = this.size;

    canvas.width = size * 2;
    canvas.height = size * 2;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 70, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(size + (size / 2), size / 2, 70, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.stroke();

    const baseTexture: BaseTexture = BaseTexture.fromCanvas(canvas);
    this.textures.base = new Texture(baseTexture, new Rectangle(0, 0, this.size, this.size));
    this.textures.ring = new Texture(baseTexture, new Rectangle(this.size, 0, this.size, this.size));
  }

  newBase(): Sprite {
    const sprite: Sprite = new Sprite(this.textures.base);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.alpha = 0.7;
    this.pools.base.push(sprite);
    return sprite;
  }

  newRing(): Sprite {
    const sprite: Sprite = new Sprite(this.textures.ring);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this.pools.ring.push(sprite);
    return sprite;
  }
}

export default new Virus();
