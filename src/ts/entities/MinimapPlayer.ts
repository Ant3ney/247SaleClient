import Time from "../utilities/Time";

class MinimapPlayer {
  id: number;

  startX: number;
  x: number;
  endX: number;
  startY: number;
  y: number;
  endY: number;
  startRadius: number;
  radius: number;
  endRadius: number;

  updateTime: number;
  dt: number;

  constructor(id: number, x: number, y: number, radius: number) {
    this.id = id;

    this.startX = x;
    this.x = x;
    this.endX = x;
    this.startY = y;
    this.y = y;
    this.endY = y;
    this.startRadius = radius;
    this.radius = radius;
    this.endRadius = radius;

    this.updateTime = Time.now;
    this.dt = 0;
  }

  animate(): void {
    this.dt = (Time.now - this.updateTime) / 3000;
    this.dt = this.dt > 1 ? 1 : this.dt < 0 ? 0 : this.dt;

    this.x = this.startX + (this.endX - this.startX) * this.dt;
    this.y = this.startY + (this.endY - this.startY) * this.dt;
    this.radius = this.startRadius + (this.endRadius - this.startRadius) * this.dt;
  }

  update(x: number, y: number, radius: number): void {
    this.animate();
    this.startX = this.x;
    this.startY = this.y;
    this.startRadius = this.radius;
    this.endX = x;
    this.endY = y;
    this.endRadius = radius;
    this.updateTime = Time.now;
  }
}

export default MinimapPlayer;
