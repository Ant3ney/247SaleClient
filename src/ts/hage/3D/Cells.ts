import { Container } from "pixi.js";
import World from "../../game/World";
import Virus from "./cells/Virus";
import Food from "./cells/Food";
import Eject from "./cells/Eject";
import PlayerCell from "./cells/PlayerCell";

class Cells {
  container: Container;

  constructor() {
    this.container = new Container();
  }

  initialise(): void {
    Food.initialise();
    Eject.initialise();
    Virus.initialise();
    PlayerCell.initialise();
  }

  reset(): void {
    this.container.removeChildren();
    Food.reset();
    Eject.reset();
    Virus.reset();
    PlayerCell.reset();
  }

  run(): void {
    this.reset();
    this.setup();
  }

  setup(): void {
    for (const cell of World.sortedCells) {
      cell.animate();
      if (cell.isVirus) Virus.add(this.container, cell);
      else if (cell.isFood) Food.add(this.container, cell);
      else if (cell.isEject) Eject.add(this.container, cell);
      else if (cell.isPlayerCell) PlayerCell.add(this.container, cell);
    }
  }
}

export default new Cells();
