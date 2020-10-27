import Time from "../utilities/Time";
import PlayerData from "./PlayerData";
import Color from "../utilities/Color";
import Config from "../game/Config";

class Cell {
  id: number;
  parentPlayerID: number;
  parentPlayer: PlayerData;
  type: number;
  isOwn: number;

  startX: number;
  x: number;
  endX: number;
  startY: number;
  y: number;
  endY: number;
  startRadius: number;
  radius: number;
  endRadius: number;

  private _color: string;
  updateTime: number;
  removed: boolean;
  dt: number;

  constructor(id: number = -1, x: number = 0, y: number = 0, radius: number = 0, type: number = 0) {
    this.id = id;
    this.parentPlayerID = -1;
    this.parentPlayer = new PlayerData();
    this.type = type;
    this.isOwn = -1;
    
    this.startX = x;
    this.x = x;
    this.endX = x;
    this.startY = y;
    this.y = y;
    this.endY = y;
    this.startRadius = radius;
    this.radius = radius;
    this.endRadius = radius;

    this._color = Color.randomColor();
    this.updateTime = Time.now;
    this.removed = false;
    this.dt = 0;
  }

  animate(): void {
    const time: number = Time.now;

    this.dt = (time - this.updateTime) / 140;
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

  set color(value) {
    this._color = value;
  }

  get color() {
    return this._color;
  }

  get isTR(): boolean {
    return Config.trainingMode && this.parentPlayer.parentClient.tag === Config.trainingModeTag;
  }

  get nick(): string {
    return this.parentPlayer.parentClient.nick;
  }

  get skin(): string {
    return this.parentPlayer.skinURL;
  }

  get mass(): number {
    return this.endRadius * this.endRadius / 100 | 0;
  }

  get isBot(): boolean {
    return this.parentPlayer.parentClient.isBot;
  }

  get isPlayerCell(): boolean {
    return this.type === 0;
  }

  get isVirus(): boolean {
    return this.type === 1;
  }

  get isEject(): boolean {
    return this.type === 2;
  }

  get isFood(): boolean {
    return this.type === 3;
  }
}

export default Cell;
