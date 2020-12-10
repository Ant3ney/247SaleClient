import Emitter from './Emitter';
import Reciever from './Reciever';
import World from '../../game/World';
import Minimap from '../../ui/huds/Minimap';
import Menu from '../../ui/Menu';

class Socket {
  ws: WebSocket | null;
  url: string;
  pingTime: number;
  latency: number;

  constructor() {
    this.ws = null;
    this.url = '';
    this.pingTime = 0;
    this.latency = 0;
  }

  connect(url: string): void {
    this.cleanUp();
    //this.url = 'localhost:1000';
    this.url = url;

    //this.ws = new WebSocket(`ws://${this.url || url}`, 'mobile');
    this.ws = new WebSocket(`wss://${url}`,);
    this.ws.binaryType = 'arraybuffer';
    this.ws.onopen = () => { this.onOpen() };
    this.ws.onmessage = (message: MessageEvent) => { this.onMessage(message) };
    this.ws.onclose = (event: CloseEvent) => { this.onClose(event) };
    this.ws.onerror = () => { this.onError() };
  }

  cleanUp(): void {
    if (this.ws !== null) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.close();
      this.ws = null;
    }
    World.clientsList.clear();
    World.playersList.clear();
    World.myClientID = -1;
    World.myPlayerIDs = [];
    World.myCells = [];
    World.cells.clear();
    World.sortedCells = [];
    Minimap.playerList.clear();
  }

  onOpen(): void {
    Emitter.initialise();
    console.info(`[Game server] Connected to ${this.url}`);
  }

  onMessage(message: MessageEvent): void {
    Reciever.parse(message.data);
  }

  onClose(event: CloseEvent): void {
    console.info(`[Game server] Connection to ${this.url} closed.`);
    console.log(event);
    Menu.show();
  }

  onError(): void {
    console.warn(`[Game server] connection to ${this.url} errored out.`);
  }

  get connected(): boolean {
    return this.ws === null ? false : this.ws.readyState === this.ws.OPEN;
  }
}

export default new Socket();
