import HAGE_BASE from "./HAGE_BASE";
import Camera from "../game/Camera";

import Grid2 from "./2D/Grid2";
import Grid from "./2D/Grid";
import Border from "./2D/Border";
import MouseTracker from "./2D/MouseTracker";
import Cells from "./2D/Cells";
import DirectionArrow from "./2D/DirectionArrow";

class HAGE2D extends HAGE_BASE {
  ctx: CanvasRenderingContext2D;

  constructor() {
    super();
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
  }

  initialise(): void {
    this.setScreenSize();
    window.addEventListener('resize', () => { this.setScreenSize() }, { passive: true });
  }

  setScreenSize(): void {
    this.canvas.width = window.innerWidth * window.devicePixelRatio | 0;
    this.canvas.height = window.innerHeight * window.devicePixelRatio | 0;
  }

  run(): void {
    this.clearCanvas();
    this.setCamera();

    Grid2.render(this.ctx);
    Grid.render(this.ctx);
    Border.render(this.ctx);
    MouseTracker.render(this.ctx);
    Cells.render(this.ctx);
    DirectionArrow.render(this.ctx);

    this.resetCamera();
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setCamera(): void {
    const x: number = ((this.canvas.width >> 1) / Camera.zoom) - Camera.x;
    const y: number = ((this.canvas.height >> 1) / Camera.zoom) - Camera.y;

    this.ctx.scale(Camera.zoom, Camera.zoom);
    this.ctx.translate(x, y);
  }

  resetCamera(): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default HAGE2D;
