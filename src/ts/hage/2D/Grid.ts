import gameBorder from '../../game/Border';
import Settings from '../../game/Settings';

class Grid {
  render(ctx: CanvasRenderingContext2D): void {
    if (!<boolean>Settings.showSectors) return;

    const left: number = gameBorder.left;
    const top: number = gameBorder.top;
    const edgeX: number = gameBorder.bottom - gameBorder.top;
    const edgeY: number = gameBorder.bottom - gameBorder.top;
    const sectorEdgeX: number = edgeX / 5;
    const sectorEdgeY: number = edgeY / 5;
    const sectorEdgeX_2: number = sectorEdgeX / 2;
    const sectorEdgeY_2: number = sectorEdgeY / 2;
    const letters: string[] = 'ABCDE'.split('');

    // lines
    ctx.beginPath();
    ctx.rect(left + sectorEdgeX, top, sectorEdgeX, edgeY);
    ctx.rect(left + sectorEdgeX * 3, top, sectorEdgeX, edgeY);
    ctx.rect(left, top + sectorEdgeY, edgeX, sectorEdgeY);
    ctx.rect(left, top + sectorEdgeY * 3, edgeX, sectorEdgeY);
    ctx.rect(left, top, edgeX, edgeY);
    ctx.closePath();

    ctx.lineWidth = 20;
    ctx.strokeStyle = <string>Settings.sectorColor;
    ctx.stroke();

    // letters
    ctx.font = `400 1200px Ubuntu`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = <string>Settings.sectorColor;

    for (let i = 0; i < 5; i++) {
      const y: number = top + sectorEdgeY_2 + i * sectorEdgeY;
      for (let j = 0; j < 5; j++) {
        const x: number = left + sectorEdgeX_2 + j * sectorEdgeX;
        const sectorID: string = letters[i] + (j + 1);
        ctx.fillText(sectorID, x, y);
      }
    }
  }
}

export default new Grid();
