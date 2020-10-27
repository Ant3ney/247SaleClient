import { Point } from "../../utilities/Structures";
import Settings from "../../game/Settings";
import Player from "../../game/Player";
import Camera from "../../game/Camera";

class Joystick {
  screen: HTMLCanvasElement
  container: HTMLDivElement;
  ball: HTMLDivElement;
  startPoint: Point;
  direction: Point;
  radiusContainer: number;
  radiusBall: number;
  touchID: number | false;

  constructor() {
    this.screen = <HTMLCanvasElement>document.getElementById('screen');
    this.container = <HTMLDivElement>document.getElementById('joystick');
    this.ball = <HTMLDivElement>document.getElementById('joystick-ball');
    this.startPoint = <Point>{ x: 0, y: 0 };
    this.direction = <Point>{ x: 0, y: 0 };
    this.radiusContainer = 50;
    this.radiusBall = 20;
    this.touchID = false;
  }

  initialise(): void {
    this.attachEvents();
  }

  attachEvents(): void {
    this.screen.addEventListener('touchstart', (event: TouchEvent) => {
      this.onTouchStart(event);
    }, { passive: true });

    this.screen.addEventListener('touchmove', (event: TouchEvent) => {
      this.onTouchMove(event);
    }, { passive: true });

    this.screen.addEventListener('touchend', (event: TouchEvent) => {
      this.onTouchEnd(event);
    }, { passive: true });
  }

  onTouchStart(event: TouchEvent) {
    for (let i: number = 0; i < event.changedTouches.length; i++) {
      const touch: Touch = event.changedTouches[i];
      if (touch.target !== this.screen) continue;

      this.touchID = touch.identifier;
      if (Settings.directionOnTouch) {
        const tabCenter: Point = Player.activeTab === 0 ? Player.center1 : Player.center2;
        const centerX: number = (window.innerWidth >> 1) + (tabCenter.x - Camera.x) / window.devicePixelRatio * Camera.zoom;
        const centerY: number = (window.innerHeight >> 1) + (tabCenter.y - Camera.y) / window.devicePixelRatio * Camera.zoom;
        const changeX: number = touch.clientX - centerX;
        const changeY: number = touch.clientY - centerY;
        const hypoteneuse: number = Math.sqrt(changeX ** 2 + changeY ** 2) || 1;
        this.direction.x = hypoteneuse < 15 ? 0 : changeX / hypoteneuse;
        this.direction.y = hypoteneuse < 15 ? 0 : changeY / hypoteneuse;
        this.startPoint.x = touch.clientX - this.radiusContainer * this.direction.x;
        this.startPoint.y = touch.clientY - this.radiusContainer * this.direction.y;
      } else {
        this.startPoint.x = touch.clientX;
        this.startPoint.y = touch.clientY;
        this.direction.x = 0;
        this.direction.y = 0;
      }
      this.show();
      this.updateBall();
      break;
    }
  }

  onTouchMove(event: TouchEvent) {
    if (this.touchID === false) return;

    for (let i: number = 0; i < event.changedTouches.length; i++) {
      const touch: Touch = event.changedTouches[i];
      if (touch.identifier !== this.touchID) continue;

      const changeX: number = touch.clientX - this.startPoint.x;
      const changeY: number = touch.clientY - this.startPoint.y;
      const hypoteneuse: number = Math.sqrt(changeX ** 2 + changeY ** 2) || 1;
      const dx: number = changeX / hypoteneuse;
      const dy: number = changeY / hypoteneuse;
      const radius: number = this.radiusContainer;
      this.direction.x = dx * Math.min(radius, hypoteneuse) / radius;
      this.direction.y = dy * Math.min(radius, hypoteneuse) / radius;
      this.updateBall();

      break;
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (this.touchID === false) return;

    for (let i: number = 0; i < event.changedTouches.length; i++) {
      const touch: Touch = event.changedTouches[i];
      if (touch.identifier !== this.touchID) continue;

      this.touchID = false;
      if (Settings.stopOnRelease) this.resetBall();
      this.hide();

      break;
    }
  }

  updateBall(): void {
    const radiusContainer: number = this.radiusContainer;
    const radiusBall: number = this.radiusBall;
    const offsetX: number = radiusContainer + (radiusContainer * this.direction.x) | 0;
    const offsetY: number = radiusContainer + (radiusContainer * this.direction.y) | 0;
    this.ball.style.left = `${offsetX - radiusBall}px`;
    this.ball.style.top = `${offsetY - radiusBall}px`;
  }

  resetBall(): void {
    this.direction.x = 0;
    this.direction.y = 0;
  }

  show(): void {
    this.container.style.display = 'block';
    this.container.style.left = `${this.startPoint.x - 50}px`;
    this.container.style.top = `${this.startPoint.y - 50}px`;
  }

  hide(): void {
    this.container.style.display = 'none';
  }

  resize(factor: number): void {
    this.radiusContainer = 50 * factor | 0; 
    this.radiusBall = 20 * factor | 0;
    this.container.style.width = `${this.radiusContainer * 2}px`;
    this.container.style.height = `${this.radiusContainer * 2}px`;
    this.ball.style.width = `${this.radiusBall * 2}px`;
    this.ball.style.height = `${this.radiusBall * 2}px`;
  }
}

export default new Joystick();
