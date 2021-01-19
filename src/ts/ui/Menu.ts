import SettingsMenu from "./menu/SettingsMenu";
import ServerMenu from "./menu/ServerMenu";
import Profiles from "./menu/Profiles";
import Events from "../game/Events";
import AccountData from "../entities/AccountData";
import Account from "./Account";

class Menu {
  element: HTMLElement;
  buttonPlay: HTMLButtonElement;
  buttonSpectate: HTMLButtonElement;
  isOpen: boolean;
  isFullscreen: boolean;

  constructor() {
    this.element = <HTMLElement>document.getElementById('menu');
    this.buttonPlay = <HTMLButtonElement>document.getElementById('play');
    this.buttonSpectate = <HTMLButtonElement>document.getElementById('spectate');
    this.isOpen = true;
    this.isFullscreen = false;
  }

  initialise(): void {
    SettingsMenu.initialise();
    ServerMenu.initialise();
    Profiles.initialise();
    this.attachEvents();

    AccountData.onLogin = () => {
      Profiles.loadData(AccountData.profile);
    };

    AccountData.onLogout = () => {
      Profiles.createProfiles();
      Profiles.updateElements();
    };

    Account.initialise();
  }

  onServerChanged(): void {
    Events.connectToServer();
  }

  attachEvents(): void {
    ServerMenu.onServerChanged = this.onServerChanged.bind(this);

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

    this.buttonSpectate.addEventListener('touchend', (event: TouchEvent) => {
      this.onSpectate(event);
    }, { passive: false });

    const btnServerMenu: HTMLButtonElement = <HTMLButtonElement>document.getElementById('servers');
    btnServerMenu.addEventListener('touchend', () => { ServerMenu.show() }, { passive: true });

    const btnSettingsMenu: HTMLButtonElement = <HTMLButtonElement>document.getElementById('settings');
    btnSettingsMenu.addEventListener('touchend', () => { SettingsMenu.show() }, { passive: true });

    const btnSignIn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('sign-in-menu');
    btnSignIn.addEventListener('touchend', () => { this.showSignInOptions() }, { passive: true });

    const btnExitSettingsMenu: HTMLButtonElement = <HTMLButtonElement>document.getElementById('exit-server-options');
    btnExitSettingsMenu.addEventListener('touchend', () => { this.exitSinInPotions() }, { passive: true });

    const btnSmallProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-form-second');
    btnSmallProfilePanel.addEventListener('touchend', () => { Account.showLargeProfilePanel(); }, { passive: true });

    const btnLoginDiscord: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-button-discord');
    btnLoginDiscord.addEventListener('touchend', () => { Account.loginWithDiscord(); });

    const btnLoginFB: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-button-fb');
    btnLoginFB.addEventListener('touchend', () => { Account.loginWithFB(); });

    const btnLogout: HTMLButtonElement = <HTMLButtonElement>document.getElementById('logout-button');
    btnLogout.addEventListener('touchend', () => { Account.logout(); });

    const btnExitPanel: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-panel-close');
    btnExitPanel.addEventListener('touchend', () => { Account.showSmallProfilePanel(); });

    const btnFullscreen: HTMLButtonElement | null = <HTMLButtonElement | null>document.getElementById('fullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('touchend', () => { this.onFullscreen() }, { passive: true });
    }
  }

  showSignInOptions(): void {
    const signInConteiner: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-form-zero');
    const optionsConteiner: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-form-first');
    signInConteiner.style.display = "none";
    optionsConteiner.style.display = "block";
  }
  exitSinInPotions(): void {
    const signInConteiner: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-form-zero');
    const optionsConteiner: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-form-first');
    signInConteiner.style.display = "block";
    optionsConteiner.style.display = "none";
  }

  onFullscreen(): void {
    if (this.isFullscreen) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
    this.isFullscreen = !this.isFullscreen;
  }

  setPlayButtonConnecting(): void {
    this.buttonPlay.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i><span>Connecting</span>';
  }

  setPlayButtonLoading(): void {
    this.buttonPlay.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i><span>Loading</span>';
  }

  setPlayButtonNormal(): void {
    this.buttonPlay.innerHTML = '<i class="fas fa-play"></i><span>Play</span>';
  }

  onPlay(event: TouchEvent): void {
    event.preventDefault();
    Events.play();
  }

  onSpectate(event: TouchEvent): void {
    event.preventDefault();
    Events.spectate();
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
