import { particles, Texture, Sprite } from "pixi.js";
import World from "../../game/World";
import Joystick from "../../ui/huds/Joystick";
import Player from "../../game/Player";
import Camera from "../../game/Camera";
import { Point } from "../../utilities/Structures";
import Settings from "../../game/Settings";

const MAX_COUNT:number = 128;

class MouseTracker {
  options: particles.ParticleContainerProperties;
  container: particles.ParticleContainer;
  texture: Texture;
  sprites: Sprite[];

  constructor() {
    this.options = <particles.ParticleContainerProperties>{
      vertices: true,
      rotation: true,
      tint: true
    };
    this.container = new particles.ParticleContainer(MAX_COUNT, this.options);
    this.texture = Texture.WHITE;
    this.sprites = [];
  }

  initialise(): void {
    for (let i = 0; i < MAX_COUNT; i++) {
      const sprite: Sprite = new Sprite(this.texture);
      sprite.anchor.x = 0.5;
      this.sprites.push(sprite);
    }
  }

  run(): void {
    if (<string>Settings.directionMarkerType === 'lines' && Player.isAlive) {
      if (this.container.children.length !== MAX_COUNT) {
        for (const sprite of this.sprites) this.container.addChild(sprite);
      }
    } else {
      if (this.container.children.length !== 0) {
        this.container.removeChildren();
      }
      return;
    }
    
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite: Sprite = this.sprites[i];
      sprite.alpha = 0;
    }

    let index: number = 0;
    const thickness: number = 4 * window.devicePixelRatio;
    const joystickX: number = Joystick.direction.x * (150 * window.devicePixelRatio);
    const joystickY: number = Joystick.direction.y * (150 * window.devicePixelRatio);
    const center: Point = Player.activeTab === 0 ? Player.center1 : Player.center2;
    const x: number = center.x + joystickX / Camera.zoom;
    const y: number = center.y + joystickY / Camera.zoom;

    for (const cell of World.myCells[Player.activeTab].values()) {
      if (index === MAX_COUNT) break;

      const dx: number = x - cell.x;
      const dy: number = y - cell.y;
      const distance: number = Math.sqrt(dx * dx + dy * dy);
      const angle: number = Math.atan(dx / dy) || 0;
      const sprite: Sprite = this.sprites[index++];

      sprite.x = x;
      sprite.y = y;
      sprite.width = thickness;
      sprite.height = distance;
      sprite.rotation = (y < cell.y ? 0 : Math.PI) - angle;
      sprite.alpha = 1;
      sprite.tint = parseInt((<string>Settings.directionLinesColor).replace('#', '0x'));
    }
  }
}

export default new MouseTracker();
