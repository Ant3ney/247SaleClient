import Settings from '../../game/Settings';
import Camera from "../../game/Camera";
import World from "../../game/World";
import Player from "../../game/Player";
import Joystick from '../../ui/huds/Joystick';
import { Point } from "../../utilities/Structures";

class MouseTracker {
  render(ctx: CanvasRenderingContext2D) {
    if (!Player.isAlive) return;
    if (<string>Settings.directionMarkerType !== 'lines') return;

    ctx.strokeStyle = <string>Settings.directionLinesColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const joystickX: number = Joystick.direction.x * (150 * window.devicePixelRatio);
    const joystickY: number = Joystick.direction.y * (150 * window.devicePixelRatio);
    const center: Point = Player.activeTab === 0 ? Player.center1 : Player.center2;
    const x: number = center.x + joystickX / Camera.zoom;
    const y: number = center.y + joystickY / Camera.zoom;

    ctx.beginPath();
    if (!World.myCells[Player.activeTab]) return;
    for (const cell of World.myCells[Player.activeTab].values()) {
      if (cell.removed) continue;
      ctx.moveTo(cell.x, cell.y);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
}

export default new MouseTracker();
