import { Texture, Sprite } from "pixi.js";
import Time from "../../../../../utilities/Time";

class Skin {
  texture: Texture;
  pool: Sprite[];
  index: number;
  lastUsed: number;

  constructor(canvas: HTMLCanvasElement) {
    this.texture = Texture.fromCanvas(canvas);
    this.pool = [];
    this.index = 0;
    this.lastUsed = Time.now;
  }

  getSprite(): Sprite {
    this.lastUsed = Time.now;
    return this.pool[this.index++] || this.newSprite();
  }

  newSprite(): Sprite {
    const sprite: Sprite = new Sprite(this.texture);
    sprite.anchor.set(0.5, 0.5);
    this.pool.push(sprite);
    return sprite;
  }

  reset(): void {
    this.index = 0;
  }

  destroy(): void {
    for (const sprite of this.pool) sprite.destroy(false);
    this.texture.destroy(true);
  }
}

export default Skin;
