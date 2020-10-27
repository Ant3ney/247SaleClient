import { particles, Texture, Sprite } from "pixi.js";
import Settings from "../../game/Settings";
import WorldBorder from "../../game/Border";

class Border {
  options: particles.ParticleContainerProperties;
  container: particles.ParticleContainer;
  texture: Texture;
  sprites: Sprite[];
  PI2: number;

  constructor() {
    this.options = <particles.ParticleContainerProperties>{
      tint: true,
      position: true,
      vertices: true
    };
    this.container = new particles.ParticleContainer(4, this.options);
    this.texture = Texture.WHITE;
    this.sprites = [];
    this.PI2 = Math.PI * 2;
  }

  initialise(): void {
    for (let i: number = 0; i < 4; i++) {
      const sprite: Sprite = new Sprite(this.texture);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.rotation = (this.PI2 / 4) * i;
      this.sprites.push(sprite);
      this.container.addChild(sprite);
    }
  }

  run(): void {
    const thickness: number = 40;
    const tint: number = parseInt((<string>Settings.borderColor).replace('#', '0x'));
    const edgeX: number = WorldBorder.right - WorldBorder.left;
    const edgeY: number = WorldBorder.bottom - WorldBorder.top;

    for (let i: number = 0; i < 4; i++) {
      const sprite: Sprite = this.sprites[i];
      sprite.tint = tint;
    }

    const top: Sprite = this.sprites[0];
    top.x = WorldBorder.left + (edgeX / 2);
    top.y = WorldBorder.top;
    top.width = edgeX + thickness;
    top.height = thickness;

    const right: Sprite = this.sprites[1];
    right.x = WorldBorder.right;
    right.y = WorldBorder.top + (edgeY / 2);
    right.width = edgeY + thickness;
    right.height = thickness;

    const bottom: Sprite = this.sprites[2];
    bottom.x = WorldBorder.left + (edgeX / 2);
    bottom.y = WorldBorder.bottom;
    bottom.width = edgeX + thickness;
    bottom.height = thickness;

    const left: Sprite = this.sprites[3];
    left.x = WorldBorder.left;
    left.y = WorldBorder.top + (edgeY / 2);
    left.width = edgeY + thickness;
    left.height = thickness;
  }
}

export default new Border();
