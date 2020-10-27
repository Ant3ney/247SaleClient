import { Sprite, Container } from "pixi.js";
import Settings from "../../game/Settings";
import WorldBorder from "../../game/Border";

const sectorURL: string = require('../../../resources/images/sectors.png');

class Border {
  container: Container;
  sprite: Sprite;

  constructor() {
    this.container = new Container();
    this.sprite = Sprite.fromImage(sectorURL);
  }

  initialise(): void {
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
  }

  run(): void {
    if (<boolean>Settings.showSectors) {
      if (this.container.children.length !== 1) {
        this.container.addChild(this.sprite);
      }
    } else {
      if (this.container.children.length !== 0) {
        this.container.removeChildren();
      }
      return;
    }

    const edgeX: number = WorldBorder.right - WorldBorder.left;
    const edgeY: number = WorldBorder.bottom - WorldBorder.top;

    this.sprite.x = WorldBorder.left + (edgeX / 2);
    this.sprite.y = WorldBorder.top + (edgeY / 2);
    this.sprite.width = edgeX;
    this.sprite.height = edgeY;
    this.sprite.tint = parseInt((<string>Settings.sectorColor).replace('#', '0x'));
  }
}

export default new Border();
