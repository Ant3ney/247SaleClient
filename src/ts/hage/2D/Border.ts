import gameBorder from '../../game/Border';
import Settings from '../../game/Settings';

class Border {
  render(ctx: CanvasRenderingContext2D) {
    const borderWidth: number = 40;
    const shift: number = borderWidth >> 1;
    const startX: number = gameBorder.left - shift;
    const startY: number = gameBorder.top - shift;
    const edgeX: number = gameBorder.right - gameBorder.left + borderWidth;
    const edgeY: number = gameBorder.bottom - gameBorder.top + borderWidth;

    ctx.strokeStyle = <string>Settings.borderColor;
    ctx.lineWidth = borderWidth;

    ctx.strokeRect(startX, startY, edgeX, edgeY);
  }
}

export default new Border();
