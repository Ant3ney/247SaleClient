import Player from "./Player";
import Emitter from "../sockets/game/Emitter";
import Socket from "../sockets/game/Socket";
import ServerMenu from "../ui/menu/ServerMenu";
import ServerList from "../ui/menu/server-menu/ServerList";
import Joystick from "../ui/huds/Joystick";
import Camera from "./Camera";
import { Point, ServerListEntry } from "../utilities/Structures";
import Menu from "../ui/Menu";
import World from "./World";
import Huds from "../ui/Huds";

class Events {
  feedInterval: number;
  connectedServer: string;

  constructor() {
    this.connectedServer = "";
    this.feedInterval = 0;
  }

  initialise() {
    setInterval(() => { this.sendMouse() }, 42);
  }

  connectToServer(): void {
    if (ServerMenu.selectedServer.length < 1) return void console.warn('No server selected.');
    const serverInfo: ServerListEntry | undefined = ServerList.listByIp.get(ServerMenu.selectedServer);
    if (serverInfo === undefined || serverInfo.maxPlayers <= serverInfo.numPlayers) {
      Menu.setPlayButtonNormal();
      window.alert('Server is full. Please switch to another server.');
      return;
    }
    Menu.setPlayButtonConnecting();

    if (this.connectedServer != ServerMenu.selectedServer) {
      Socket.connect(ServerMenu.selectedServer);
      this.connectedServer = ServerMenu.selectedServer;
    } 
  }

  spectate(): void {
    Menu.hide();
    Huds.show();

    if (Player.isAlive === false) {
      Huds.hideControls();
    }
  }

  play(): void {
    if (Player.isAlive && Socket.connected) {
      Menu.hide();
      Huds.show();
      Huds.showControls();
    } else {
      Menu.setPlayButtonLoading();
      Emitter.spawn();
    }
  }

  feed(): void {
    Emitter.feed(Player.activeTab, true);
  }

  macroFeed(turnOn: boolean): void {
    Emitter.feed(Player.activeTab, false, turnOn ? 1 : 0);
  }

  split(count: number = 1): void {
    Emitter.split(Player.activeTab, count);
  }

  togglePlayer(): void {
    const playerCount = World.myPlayerIDs.length;
    const next = (Player.activeTab + 1) % playerCount;
    Player.activeTab = next;
    if (World.myCells[next].size < 1) Emitter.spawn(next);
  }

  sendMouse(): void {
    const joystickX: number = Joystick.direction.x * (150 * window.devicePixelRatio);
    const joystickY: number = Joystick.direction.y * (150 * window.devicePixelRatio);
    const center: Point = (false === Player.isAlive) ? Camera.spectatePoint : (Player.activeTab === 0 ? Player.center1 : Player.center2);
    const x: number = center.x + joystickX / Camera.zoom;
    const y: number = center.y + joystickY / Camera.zoom;
    Emitter.cursor(x, y, Player.activeTab);
  }
};

export default new Events();
