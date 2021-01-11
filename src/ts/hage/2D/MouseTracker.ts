import Player from "../../game/Player";
import Camera from "../../game/Camera";
import Joystick from "../../ui/huds/Joystick";
import { Point } from "../../utilities/Structures";
import World from "../../game/World";
import Settings from "../../game/Settings";

class DirectionArrow {
  arrow: HTMLCanvasElement;
  color: string;

  constructor() {
    this.arrow = document.createElement('canvas');
    this.color = '#ffffff';

    this.renderArrow();
  }

  renderArrow(): void {
    const canvas: HTMLCanvasElement = this.arrow;
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

    ctx.fillStyle = this.color;
    ctx.fill();
  }

  render(ctx: CanvasRenderingContext2D) {
    if (<string>Settings.directionMarkerType !== 'arrow') return;
    if (!Player.isAlive) return;
    
    if (<string>Settings.directionArrowColor !== this.color) {
      this.color = <string>Settings.directionArrowColor;
      this.renderArrow();
    }

    const center: Point = Player.activeTab === 0 ? Player.center1 : Player.center2;
    const joystickRadius: number = (150 * window.devicePixelRatio);
    const joystickX: number = center.x + (Joystick.direction.x * joystickRadius) / Camera.zoom;
    const joystickY: number = center.y + (Joystick.direction.y * joystickRadius) / Camera.zoom;

    let radius: number = 0;
    
    if (!World.myCells[Player.activeTab]) return;
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
    const translateX: number = center.x + ax * radius;
    const translateY: number = center.y + ay * radius;
    const angle: number = Math.atan(Joystick.direction.x / -Joystick.direction.y) + (Joystick.direction.y >= 0 ? Math.PI : 0);

    ctx.save();
    ctx.translate(translateX, translateY);
    ctx.rotate(angle);
    ctx.drawImage(this.arrow, - this.arrow.width * 3 / 2, - this.arrow.height * 3 / 2, this.arrow.width * 3, this.arrow.height * 3);
    ctx.restore();
  }
}

export default new DirectionArrow();
