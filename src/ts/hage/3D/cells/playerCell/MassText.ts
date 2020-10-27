import { extras, loaders } from "pixi.js";
import Settings from "../../../../game/Settings";

class MassText {
  pool: extras.BitmapText[];
  index: number;

  constructor() {
    this.pool = [];
    this.index = 0;
  }

  reset(): void {
    this.index = 0;
  }

  initialise(): void {
    this.loadFonts();
  }

  get(mass: string): extras.BitmapText {
    const bitmapText: extras.BitmapText = this.pool[this.index++] || this.newText();
    bitmapText.text = `${mass}`;
    bitmapText.font = {
      name: <boolean>Settings.massStroke ? 'UbuntuStroked' : 'Ubuntu',
      size: 256
    };
    return bitmapText;
  }

  newText(): extras.BitmapText {
    const font = {
      name: 'Ubuntu',
      size: 256
    };
    const bitmapText = new extras.BitmapText('000', { font });
    bitmapText.anchor = 0.5;
    this.pool.push(bitmapText);
    return bitmapText;
  }

  loadFonts(): void {
    const options = { crossOrigin: true };
    const loader = new loaders.Loader();
    
    loader.add("ubuntu-font-png", require('../../../../../resources/bitmapFonts/ubuntuBold_0.png'), options);
    loader.add("ubuntu-font", require('../../../../../resources/bitmapFonts/ubuntuBold.fnt'), options);
    loader.add("ubuntu-font-stroked-png", require('../../../../../resources/bitmapFonts/ubuntuBoldStroked_0.png'), options);
    loader.add("ubuntu-font-stroked", require('../../../../../resources/bitmapFonts/ubuntuBoldStroked.fnt'), options);

    loader.load();
  }
}

export default new MassText();
