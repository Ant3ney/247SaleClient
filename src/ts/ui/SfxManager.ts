import SFX from "./sfx-manager/SFX";

class SfxManager {
  split: SFX;
  eject: SFX;
  death: SFX;
  eat: SFX;

  constructor() {
    this.split = new SFX(require('../../resources/sounds/split.mp3'));
    this.eject = new SFX(require('../../resources/sounds/eject.mp3'));
    this.death = new SFX(require('../../resources/sounds/death.ogg'));
    this.eat = new SFX(require('../../resources/sounds/eject.mp3'));
  }
}

export default new SfxManager();
