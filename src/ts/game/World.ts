import Cell from '../entities/Cell';
import Player from './Player';
import ClientData from '../entities/ClientData';
import PlayerData from '../entities/PlayerData';

class World {
  clientsList: Map<number, ClientData>;
  playersList: Map<number, PlayerData>;
  myClientID: number;
  myPlayerIDs: number[];
  myCells: Map<number, Cell>[];
  cells: Map<number | string, Cell>;
  sortedCells: Cell[];

  constructor() {
    this.clientsList = new Map();
    this.playersList = new Map();

    this.myClientID = -1;
    this.myPlayerIDs = [];
    this.myCells = [];

    this.cells = new Map();
    this.sortedCells = [];
  }

  newCell(id: number, x: number, y: number, radius: number, type: number): Cell {
    const cell = new Cell(id, x, y, radius, type);
    this.cells.set(id, cell);
    return cell;
  }

  getCell(id: number): Cell {
    return this.cells.get(id) || new Cell();
  }

  eatCell(hunterID: number, preyID: number): void {
    const hunter: Cell | undefined = this.cells.get(hunterID);
    const prey: Cell | undefined = this.cells.get(preyID);

    if (prey === undefined) return;
    if (hunter === undefined) return void this.removeCell(preyID);

    prey.update(hunter.x, hunter.y, prey.radius);
    prey.removed = true;
    this.cells.delete(preyID);
    if (prey.isOwn >= 0) {
      this.onOwnCellDeath(prey);
      const myCellCount: number = Player.myCellCount;
      if (myCellCount === 0) Player.onDeath();
    }
    this.cells.set(`${preyID}:removed`, prey);
  }

  removeCell(id: number): void {
    const cell: Cell | undefined = this.cells.get(id);
    if (cell === undefined) return;

    cell.removed = true;
    this.cells.delete(id);
    if (cell.isOwn >= 0) {
      this.onOwnCellDeath(cell);
      const myCellCount: number = Player.myCellCount;
      if (myCellCount === 0) Player.onDeath();
    }
    this.cells.set(`${id}:removed`, cell);
  }

  onOwnCellDeath(cell: Cell): void {
    const myCells: Map<number, Cell> = this.myCells[cell.isOwn];
    myCells.delete(cell.id);
    if (cell.isOwn === Player.activeTab && myCells.size === 0) {
      let next: number = (cell.isOwn + 1) % this.myPlayerIDs.length;
      let count: number = 0;
      while (next !== cell.isOwn || count === this.myPlayerIDs.length) {
        if (this.myCells[next].size > 0) break;
        next = (next + 1) % this.myPlayerIDs.length;
        count++;
      }
      Player.activeTab = next;
    }
  }

  ownCellCheck(cell: Cell): void {
    const index: number = this.myPlayerIDs.indexOf(cell.parentPlayerID);
    if (index < 0) return;
    cell.isOwn = index;
    const myCellCount: number = Player.myCellCount;
    const myCells: Map<number, Cell> = this.myCells[index];
    myCells.set(cell.id, cell);
    if (myCellCount === 0) Player.onSpawn();
  }

  update(): void {
    this.sortedCells = [];

    for (const playerData of this.playersList.values()) {
      if (playerData.parentClientID !== playerData.parentClient.id) {
        const parentClient: ClientData | undefined = this.clientsList.get(playerData.parentClientID);
        if (parentClient !== undefined) playerData.parentClient = parentClient;
      }
    }

    for (const [id, cell] of this.cells) {
      if (cell.parentPlayerID !== cell.parentPlayer.id) {
        const parentPlayer: PlayerData | undefined = this.playersList.get(cell.parentPlayerID);
        if (parentPlayer !== undefined) cell.parentPlayer = parentPlayer;
      }

      if (cell.removed && cell.dt === 1) {
        this.cells.delete(id);
        continue;
      }

      cell.animate();
      this.sortedCells.push(cell);
    }
    this.sortedCells.sort(this.sort);
  }

  sort(a: Cell, b: Cell): number {
    return a.radius - b.radius;
  }
}

export default new World();
