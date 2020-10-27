import HAGE_BASE from "./HAGE_BASE";
import { WebGLRenderer, WebGLRendererOptions, Container } from "pixi.js";
import Camera from "../game/Camera";
import Border from "./3D/Border";
import Grid from "./3D/Grid";
import MouseTracker from "./3D/MouseTracker";
import Cells from "./3D/Cells";
import DirectionArrow from "./3D/DirectionArrow";

class HAGE3D extends HAGE_BASE {
  options: WebGLRendererOptions;
  renderer: WebGLRenderer;
  stage: Container;

  constructor() {
    super();

    this.options = <WebGLRendererOptions>{
      view: this.canvas,
      antialias: true,
      resolution: 1
    };
    this.renderer = new WebGLRenderer(1, 1, this.options);
    this.stage = new Container();
  }

  initialise(): void {
    Grid.initialise();
    this.stage.addChild(Grid.container);

    Border.initialise();
    this.stage.addChild(Border.container);

    MouseTracker.initialise();
    this.stage.addChild(MouseTracker.container);

    Cells.initialise();
    this.stage.addChild(Cells.container);

    DirectionArrow.initialise();
    this.stage.addChild(DirectionArrow.container);

    this.setScreenSize();
    window.addEventListener('resize', () => { this.setScreenSize() }, { passive: true });
  }

  setScreenSize(): void {
    const width: number = window.innerWidth * window.devicePixelRatio | 0;
    const height: number = window.innerHeight * window.devicePixelRatio | 0;
    this.renderer.resize(width, height);
  }

  run(): void {
    this.setCamera();

    Grid.run();
    Border.run();
    MouseTracker.run();
    Cells.run();
    DirectionArrow.run();

    this.renderer.render(this.stage);
  }

  setCamera(): void {
    const x: number = (this.canvas.width / 2) - (Camera.x * Camera.zoom);
    const y: number = (this.canvas.height / 2) - (Camera.y * Camera.zoom);
    this.stage.setTransform(x, y, Camera.zoom, Camera.zoom);
  }
}

export default HAGE3D;
