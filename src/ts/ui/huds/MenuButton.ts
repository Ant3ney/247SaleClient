import Menu from "../Menu";
import Socket from "../../sockets/game/Socket";
import Huds from "../Huds";

class MenuButton {
  warningContainer: HTMLDivElement;

  constructor() {
    this.warningContainer = <HTMLDivElement>document.getElementById('menu-return-warning');
  }

  initialise(): void {
    this.attachEvents();
  }

  attachEvents(): void {
    const mainBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('back-to-menu');
    mainBtn.addEventListener('touchend', () => { 
      Huds.hide();
      Menu.show();
    });


    // const mainBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('back-to-menu');
    // mainBtn.addEventListener('touchend', () => { this.showWarning() });

    const closeBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('close-return-warning');
    closeBtn.addEventListener('touchend', () => { this.hideWarning() });

    const continueBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('menu-open');
    continueBtn.addEventListener('touchend', () => {
      Menu.show();
      this.hideWarning();
      Socket.cleanUp();
    });
  }

  showWarning(): void {
    this.warningContainer.style.display = 'flex';
  }

  hideWarning(): void {
    this.warningContainer.style.display = 'none';
  }
}

export default new MenuButton();
