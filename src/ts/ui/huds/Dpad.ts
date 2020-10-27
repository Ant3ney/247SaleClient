import Events from "../../game/Events";
import Settings from "../../game/Settings";

class Dpad {
  buttons: {
    a: HTMLButtonElement,
    b: HTMLButtonElement,
    c: HTMLButtonElement,
    d: HTMLButtonElement
  };
  touchID: number | false;

  constructor() {
    this.buttons = {
      a: <HTMLButtonElement>document.getElementById('d-pad-a'),
      b: <HTMLButtonElement>document.getElementById('d-pad-b'),
      c: <HTMLButtonElement>document.getElementById('d-pad-c'),
      d: <HTMLButtonElement>document.getElementById('d-pad-d')
    };
    this.touchID = false;
  }

  initialise(): void {
    this.buttons.a.addEventListener('touchend', () => {
      Events.togglePlayer();
    }, { passive: true });

    this.buttons.b.addEventListener('touchend', () => {
      Events.split(1);
    }, { passive: true });

    this.buttons.c.addEventListener('touchstart', (event: TouchEvent) => {
      if (this.touchID !== false) return;
      for (let i: number = 0; i < event.changedTouches.length; i++) {
        const touch: Touch = event.changedTouches[i];
        if (touch.target !== this.buttons.c) continue;
        this.touchID = touch.identifier;
        Events.macroFeed(true);
        break;
      }
    }, { passive: true });

    this.buttons.c.addEventListener('touchend', (event: TouchEvent) => {
      if (this.touchID === false) return;
      for (let i: number = 0; i < event.changedTouches.length; i++) {
        const touch: Touch = event.changedTouches[i];
        if (touch.identifier !== this.touchID) continue;
        this.touchID = false;
        Events.macroFeed(false);
        break;
      }
    }, { passive: true });

    this.buttons.d.addEventListener('touchend', () => {
      const count: number = parseInt((<string>Settings.dPadButton4).replace('x', ''));
      Events.split(count);
    }, { passive: true });
  }
}

export default new Dpad();
