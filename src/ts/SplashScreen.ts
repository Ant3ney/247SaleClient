import Menu from "./ui/Menu";


class SplashScreen {
  element: HTMLDivElement;

  constructor() {
    this.element = <HTMLDivElement>document.getElementById('splash-screen');
  }

  finish(): void {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.element.style.opacity = '0';
        window.setTimeout(() => {
          this.element.style.display = 'none';
          Menu.onServerChanged();
        }, 1E3);
      });
    }, 1E3);
  }
}

export default new SplashScreen();
