import Menu from "./ui/Menu";
import List from './ui/menu/settings-menu/List';
import Settings from './game/Settings';


class SplashScreen {
  element: HTMLDivElement;

  constructor() {
    this.element = <HTMLDivElement>document.getElementById('splash-screen');
    console.log();
  }

  initialise(){
    this.setSplashScreenBackground();
  }

  async setSplashScreenBackground(){
    let lightmode = await Settings.lightMode;
    if(lightmode){
      this.element.style.backgroundImage = 'url("src/resources/images/food-bg-light.png")';
    }
    else{
      this.element.style.backgroundImage = 'url("src/resources/images/food-bg-light.png")';
    }
  }

  finish() {
    
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
