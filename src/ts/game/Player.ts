import World from "./World";
import Camera from "./Camera";
import Menu from "../ui/Menu";
// import Socket from "../sockets/game/Socket";
import Joystick from "../ui/huds/Joystick";
import { Point } from "../utilities/Structures";
import Config from "./Config";
import ClientData from "../entities/ClientData";
import Huds from "../ui/Huds";

class Player {
  nick: string;
  teamTag: string;
  teamCode: string;
  skin1: string;
  skin2: string;
  x: number;
  y: number;
  center1: Point;
  center2: Point;
  activeTab: number;
  score: number;
  mass: number;
  biggestCellMass: number;
  isTR: boolean;
  isStopped: boolean;
  authToken: string = 'SENPA_MOBILE';

  constructor() {
    this.nick = '';
    this.teamTag = '';
    this.teamCode = '';
    this.skin1 = 'https://i.imgur.com/vX3zql0.png';
    this.skin2 = 'https://i.imgur.com/vX3zql0.png';
    this.x = 0;
    this.y = 0;
    this.center1 = <Point>{ x: 0, y: 0 };
    this.center2 = <Point>{ x: 0, y: 0 };
    this.activeTab = 0;
    this.score = 0;
    this.mass = 0;
    this.biggestCellMass = 0;
    this.isTR = false;
    this.isStopped = false;
  }

  setCenters(pos: Point): void {
    this.center1.x = pos.x;
    this.center1.y = pos.y;
    this.center2.x = pos.x;
    this.center2.y = pos.y;
  }

  get myCellCount(): number {
    let count = 0;
    for (const myCells of World.myCells) count += myCells.size;
    return count;
  }

  get isAlive(): boolean {
    return this.myCellCount > 0;
  }

  update(): void {
    if (!this.isAlive) return;

    const client = World.clientsList.get(World.myClientID) || new ClientData();
    this.isTR = Config.trainingMode && client.tag === Config.trainingModeTag;

    let size: number = 0;
    let count1: number = 0;
    let count2: number = 0;
    this.x = 0;
    this.y = 0;
    this.center1.x = 0;
    this.center1.y = 0;
    this.center2.x = 0;
    this.center2.y = 0;
    this.mass = 0;
    this.biggestCellMass = 0;

    for (const myCells of World.myCells) {
      for (const cell of myCells.values()) {
        size += cell.radius;
        const center: Point = cell.isOwn === 0 ? this.center1 : this.center2;
        center.x += cell.x;
        center.y += cell.y;
        this.x += cell.x;
        this.y += cell.y;
        this.mass += cell.mass;
        if (this.biggestCellMass < cell.mass) this.biggestCellMass = cell.mass;
        if (cell.isOwn === 0) count1++;
        else count2++;
      }
    }
    this.x /= this.myCellCount;
    this.y /= this.myCellCount;
    this.center1.x /= count1 || 1;
    this.center1.y /= count1 || 1;
    this.center2.x /= count2 || 1;
    this.center2.y /= count2 || 1;
    if (this.score < this.mass) this.score = this.mass;

    const scaleBasis: number = Math.pow(Math.min(0.6 / size, 1), 0.3);
    const ratio: number= Math.max(window.innerWidth / 1920, window.innerHeight / 1080);
    const scale: number = scaleBasis * ratio;
    Camera.autoZoom = scale;
  }

  onSpawn(): void {
    this.score = 0;
    this.mass = 0;
    this.biggestCellMass = 0;
    Camera.targetZoom = 0.25;
    Menu.hide();
    Huds.show();
    Huds.showControls();
    
    Menu.setPlayButtonNormal();
  }

  onDeath(): void {
    Huds.hide();
    Menu.show();
    Joystick.resetBall();
    Joystick.hide();
    // Socket.cleanUp();
    this.isTR = false;
  }
}

export default new Player();
