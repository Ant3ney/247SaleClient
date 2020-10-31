import Menu from "./ui/Menu";
import Huds from "./ui/Huds";
import Minimap from "./ui/huds/Minimap";
import Joystick from "./ui/huds/Joystick";
import SkinModal from './ui/UISkinModal';

class UI {
  userScale: number;
  SkinModal: any = SkinModal;

  constructor() {
    this.userScale = 1;
  }

  initialise(): void {
    Menu.initialise();
    Huds.initialise();
	SkinModal.initialise();

    this.scale();
    window.addEventListener('resize', () => { this.scale() }, { passive: true });
  }

  scale(): void {
    const ratio: number = Math.min(window.innerHeight, window.innerWidth) / 1024;

    const dpad: HTMLDivElement = <HTMLDivElement>document.getElementById('d-pad');
    dpad.style.transform = `scale(${(0.7 + ratio) * this.userScale})`;

    const centerBox: HTMLDivElement = <HTMLDivElement>document.querySelector('#menu .center-box');
    centerBox.style.transform = `translate(-50%, -50%) scale(${0.7 + ratio})`;

    const hudTopRight: HTMLDivElement = <HTMLDivElement>document.querySelector('#huds .top-right');
    hudTopRight.style.transform = `scale(${(0.7 + ratio) * this.userScale})`;

    const hudTopLeft: HTMLDivElement = <HTMLDivElement>document.querySelector('#huds .top-left');
    hudTopLeft.style.transform = `scale(${(0.7 + ratio) * this.userScale})`;

    const menuReturnWarning: HTMLDivElement = <HTMLDivElement>document.getElementById('menu-return-warning');
    menuReturnWarning.style.transform = `translate(-50%, -50%) scale(${0.7 + ratio})`;

    const menuBtns: HTMLDivElement = <HTMLDivElement>document.querySelector('#menu .bottom-left-btns');
    menuBtns.style.transform = `scale(${0.7 + (ratio * 0.8)})`;
	
	const skinModal: any = document.querySelector("#skin-modal .content");
	if(skinModal) {
		skinModal.style.transform = `scale(${1})`;
	}

    Minimap.resize((140 * window.devicePixelRatio * (0.7 + ratio)) * this.userScale | 0);
    Joystick.resize((0.7 + ratio) * this.userScale);
  }
}

export default new UI();
