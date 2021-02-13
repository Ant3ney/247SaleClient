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

  hide(): void {
    this.element.style.display = 'none';
  }
  show(): void {
    this.element.style.display = 'block';
    this.adjustStyles();
  }
  hideControls(): void {
    const controls = <HTMLElement>document.getElementById('d-pad');
    if (controls !== undefined) {
      controls.style.display = "none";
    }
  }
  showControls(): void {
    const controls = <HTMLElement>document.getElementById('d-pad');
    if (controls !== undefined) {
      controls.style.display = "block";
    }
  }

  initialise(): void {
    Joystick.initialise();
    MenuButton.initialise();
    Dpad.initialise();
    Leaderboard.initialise();
    Minimap.initialise();

    this.hide();

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

  adjustStyles(): void {
    let buttons = [
      document.getElementById('back-to-menu'),
      document.getElementById('minimap-toggle'),
      document.getElementById('zoom-in'),
      document.getElementById('zoom-out')
    ];
    let leaderbordButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('leaderboard-toggle');
    let leaderbordIcon: HTMLDivElement = <HTMLDivElement>leaderbordButton.getElementsByTagName('span')[0];
    let button: HTMLButtonElement;
    let icon: HTMLDivElement;
    leaderbordButton.style.width = '46px';
    leaderbordButton.style.height = '46px';
    leaderbordIcon.style.width = '28px';
    leaderbordIcon.style.height = '30px';
    console.log(leaderbordIcon);
    for(let i = 0; i < buttons.length; i++){
      button = <HTMLButtonElement>buttons[i];
      icon = <HTMLDivElement>button.getElementsByTagName('i')[0];
      button.style.width = '46px';
      button.style.height = '46px';
      icon.style.width = '42px';
      icon.style.height = '42px';
    }
  }
}

export default new Huds();
