import Player from './Player';
import Settings from './Settings';
import { Point } from '../utilities/Structures';

class Camera {
  x: number;
  y: number;
  zoom: number;
  zoomMin: number;
  zoomMax: number
  targetZoom: number;
  autoZoom: number;
  spectatePoint: Point;

  constructor() {
    this.x = 7000;
    this.y = 7000;
    this.zoom = 0.01;
    this.zoomMin = 1;
    this.zoomMax = 0.04;

    this.targetZoom = 0.04;
    this.autoZoom = 1;
    this.spectatePoint = <Point>{ x: 0, y: 0 };
  }

  initialise(): void {
    const zoomIn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('zoom-in');
    zoomIn.addEventListener('touchend', () => { this.zoomIn() });

    const zoomOut: HTMLButtonElement = <HTMLButtonElement>document.getElementById('zoom-out');
    zoomOut.addEventListener('touchend', () => { this.zoomOut() });
  }

  update(): void {
    if (Player.isAlive) {
      this.x += (Player.x - this.x) / 8;
      this.y += (Player.y - this.y) / 8;
    } else {
      this.x = (29 * this.x + this.spectatePoint.x) / 30;
      this.y = (29 * this.y + this.spectatePoint.y) / 30;
    }

    const targetZoom: number = <boolean>Settings.autoZoom ? this.autoZoom * 3 : this.targetZoom;
    this.zoom += (targetZoom - this.zoom) / 8;
  }

  zoomIn(): void {
    const zoom: number = this.targetZoom / 0.8;
    this.targetZoom = (zoom > this.zoomMin) ? this.zoomMin : (zoom < this.zoomMax) ? this.zoomMax : zoom;
  }

  zoomOut(): void {
    const zoom: number = this.targetZoom * 0.8;
    this.targetZoom = (zoom > this.zoomMin) ? this.zoomMin : (zoom < this.zoomMax) ? this.zoomMax : zoom;
  }

  setSpectatePoint(cameraX: number, cameraY: number): void {
    this.spectatePoint.x = cameraX;
    this.spectatePoint.y = cameraY;
  }
}

export default new Camera();
