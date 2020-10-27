import Player from "../../game/Player";
import Camera from "../../game/Camera";
import Joystick from "../../ui/huds/Joystick";
import { Point } from "../../utilities/Structures";
import World from "../../game/World";
import Settings from "../../game/Settings";
import { Sprite, particles, Texture } from "pixi.js";

class DirectionArrow {
  options: particles.ParticleContainerProperties;
  container: particles.ParticleContainer;
  arrow: Sprite;

  constructor() {
    this.options = <particles.ParticleContainerProperties>{ position: false };
    this.container = new particles.ParticleContainer(1, this.options);
    this.arrow = new Sprite();
  }

  initialise(): void {
    this.createArrow();
  }

  createArrow(): void {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    
    const dpp: number = window.devicePixelRatio;
    const width: number = 14 * dpp;
    const height: number = 16 * dpp;

    canvas.width = width;
    canvas.height = height;

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(0, height);
    ctx.lineTo(width / 2, height * 4 / 5);
    ctx.lineTo(width, height);
    ctx.closePath();

    ctx.fillStyle = '#ffffff';
    ctx.fill();

    const texture: Texture = Texture.fromCanvas(canvas);
    const sprite: Sprite = new Sprite(texture);
    sprite.anchor.set(0.5, 0.5);
    sprite.scale.set(3, 3);
    this.arrow = sprite;
  }

  run() {
    this.container.removeChildren();
    if (<string>Settings.directionMarkerType !== 'arrow' || !Player.isAlive) return;

    const center: Point = Player.activeTab === 0 ? Player.center1 : Player.center2;
    const joystickRadius: number = (150 * window.devicePixelRatio);
    const joystickX: number = center.x + (Joystick.direction.x * joystickRadius) / Camera.zoom;
    const joystickY: number = center.y + (Joystick.direction.y * joystickRadius) / Camera.zoom;

    let radius: number = 0;

    for (const cell of World.myCells[Player.activeTab].values()) {
      if (cell.removed) continue;
      const dx: number = center.x - cell.x;
      const dy: number = center.y - cell.y;
      const h: number = Math.sqrt(dx ** 2 + dy ** 2) || 1;
      if (radius < h + cell.radius + 75) radius = h + cell.radius + 75;
    }

    const dx: number = joystickX - center.x;
    const dy: number = joystickY - center.y;
    const h: number = Math.sqrt(dx ** 2 + dy ** 2) || 1;
    const ax: number = dx / h;
    const ay: number = dy / h;
    const angle: number = Math.atan(Joystick.direction.x / -Joystick.direction.y) + (Joystick.direction.y >= 0 ? Math.PI : 0) || 0;

    this.arrow.rotation = angle;
    this.arrow.x = center.x + ax * radius;
    this.arrow.y = center.y + ay * radius;
    this.arrow.tint = parseInt((<string>Settings.directionArrowColor).replace('#', '0x'));

    this.container.addChild(this.arrow);
  }
}

export default new DirectionArrow();
