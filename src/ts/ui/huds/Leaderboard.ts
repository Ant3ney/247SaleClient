import { LeaderboardSlot } from "../../utilities/Structures";

class Leaderboard {
  list: LeaderboardSlot[];
  element: HTMLDivElement;
  isOpen: boolean;

  constructor() {
    this.list = [];
    this.element = <HTMLDivElement>document.getElementById('leaderboard-hud');
    this.isOpen = false;
  }

  initialise(): void {
    const toggle: HTMLButtonElement = <HTMLButtonElement>document.getElementById('leaderboard-toggle');
    toggle.addEventListener('touchend', () => {
      if (this.isOpen) this.hide();
      else this.show();
    });
  }

  reset(): void {
    this.list = [];
  }

  add(name: string, score: number, color: string): void {
    const slot: LeaderboardSlot = <LeaderboardSlot>{ name, score, color };
    this.list.push(slot);
  }

  update(): void {
    const html: string[] = [];
    for (let i: number = 0; i < 5 && i < this.list.length; i++) {
      const slot = this.list[i];
      html.push(`<div class="slot" style="color: ${slot.color}">${i + 1}. ${slot.name} (${slot.score})</div>`);
    }
    this.element.innerHTML = html.join('');
  }

  show(): void {
    this.element.style.display = 'flex';
    this.isOpen = true;
  }

  hide(): void {
    this.element.style.display = 'none';
    this.isOpen = false;
  }
}

export default new Leaderboard();
