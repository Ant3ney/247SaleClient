import SettingsMenu from "./menu/SettingsMenu";
import ServerMenu from "./menu/ServerMenu";
import Profiles from "./menu/Profiles";
import Events from "../game/Events";
import AccountData from "./AccountData";

class Menu {
  element: HTMLElement;
  buttonPlay: HTMLButtonElement;
  isOpen: boolean;
  isFullscreen: boolean;

  constructor() {
    this.element = <HTMLElement>document.getElementById('menu');
    this.buttonPlay = <HTMLButtonElement>document.getElementById('play');
    this.isOpen = true;
    this.isFullscreen = false;
  }

  initialise(): void {
    SettingsMenu.initialise();
    ServerMenu.initialise();
    Profiles.initialise();
    AccountData.initialise();
    this.attachEvents();
  }

  attachEvents(): void {
    document.body.addEventListener('touchstart', (event: TouchEvent) => {
      if (!this.isOpen) event.preventDefault();
    }, { passive: false });
    document.body.addEventListener('touchmove', (event: TouchEvent) => {
      if (!SettingsMenu.isOpen && !ServerMenu.isOpen) event.preventDefault();
    }, { passive: false });
    document.body.addEventListener('touchend', (event: TouchEvent) => {
      if (!this.isOpen) event.preventDefault();
    }, { passive: false });

    this.buttonPlay.addEventListener('touchend', (event: TouchEvent) => {
      this.onPlay(event);
    }, { passive: false });

    const btnServerMenu: HTMLButtonElement = <HTMLButtonElement>document.getElementById('servers');
    btnServerMenu.addEventListener('touchend', () => { ServerMenu.show() }, { passive: true });

    const btnSettingsMenu: HTMLButtonElement = <HTMLButtonElement>document.getElementById('settings');
    btnSettingsMenu.addEventListener('touchend', () => { SettingsMenu.show() }, { passive: true });
    // btnSettingsMenu.addEventListener('click', () => { SettingsMenu.show() }, { passive: true });

    const btnLoginDiscord: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-button-discord');
    btnLoginDiscord.addEventListener('click', () => { AccountData.loginWithDiscord(); });
    
    const btnLoginFB: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-button-fb');
    btnLoginFB.addEventListener('click', () => { AccountData.loginWithFB(); });
    
    const btnLogout: HTMLButtonElement = <HTMLButtonElement>document.getElementById('logout-button');
    btnLogout.addEventListener('click', () => { AccountData.logout(); });

    const btnFullscreen: HTMLButtonElement | null = <HTMLButtonElement | null>document.getElementById('fullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('touchend', () => { this.onFullscreen() }, { passive: true });
    }
  }

  onFullscreen(): void {
    if (this.isFullscreen) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
    this.isFullscreen = !this.isFullscreen;
  }

  onPlay(event: TouchEvent): void {
    event.preventDefault();
    Events.play();
    this.buttonPlay.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i><span>Connecting</span>';
  }

  show(): void {
    this.element.style.display = 'block';
    this.isOpen = true;
  }

  hide(): void {
    this.element.style.display = 'none';
    this.isOpen = false;
  }
}

export default new Menu();
