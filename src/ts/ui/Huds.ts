import Joystick from "./huds/Joystick";
import MenuButton from "./huds/MenuButton";
import Dpad from "./huds/Dpad";
import Time from "../utilities/Time";
import Leaderboard from "./huds/Leaderboard";
import Minimap from "./huds/Minimap";
import Settings from "../game/Settings";

class Huds {
  element: HTMLElement;
  lastUpdate: number;

  constructor() {
    this.element = <HTMLElement>document.getElementById('huds');
    this.lastUpdate = 0;
  }

  initialise(): void {
    Joystick.initialise();
    MenuButton.initialise();
    Dpad.initialise();
    Leaderboard.initialise();
    Minimap.initialise();

    this.addEvents();
  }

  addEvents(): void {
    const skinsToggle: HTMLDivElement = <HTMLDivElement>document.getElementById('skins-toggle');
    const label: HTMLSpanElement = <HTMLSpanElement>skinsToggle.querySelector('span');
    let skinChoice: string = 'team';
    skinsToggle.addEventListener('touchend', () => {
      if (Settings.showSkins !== 'off') {
        skinChoice = <string>Settings.showSkins;
        Settings.showSkins = 'off';
        label.innerText = 'Skin\noff';
      } else {
        Settings.showSkins = skinChoice;
        label.innerText = 'Skin\non';
      }
    }, { passive: true });
  }

  update(): void {
    Minimap.update();
    if (Time.now - this.lastUpdate < 1E3) return;
    this.lastUpdate = Time.now;
    Leaderboard.update();
  }
}

export default new Huds();
