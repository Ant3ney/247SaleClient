import { LeaderboardSlot } from "../../utilities/Structures";
import world from "../../game/World";
import player from '../../game/Player';

class Leaderboard {
  list: LeaderboardSlot[];
  element: HTMLDivElement;
  isOpen: boolean;
  playerId: any;
  lightMode: boolean;

  constructor() {
    this.list = [];
    this.element = <HTMLDivElement>document.getElementById('leaderboard-hud');
    this.isOpen = false;
    this.playerId = 1;
  }

  initialise(): void {
    const toggle: HTMLButtonElement = <HTMLButtonElement>document.getElementById('leaderboard-toggle');
    toggle.addEventListener('touchend', () => {
      if (this.isOpen){
        this.hide();
      }
      else{
        this.show();
      }
    });

    const lBord: HTMLButtonElement = <HTMLButtonElement>document.getElementById('lBord');
    lBord.addEventListener('touchend', () => {
      if (this.isOpen) this.hide();
      else this.show();
    });
  }

  reset(): void {
    this.list = [];
  }

  setPlayerId(id: any){
    this.playerId = id;
  }

  add(name: string, score: number, color: string, id: number): void {
    const slot: LeaderboardSlot = <LeaderboardSlot>{ name, score, color, id };
    this.list.push(slot);
  }

  update(): void {
    const html: string[] = [];
    let playerInLeaderBord = false;
    for (let i: number = 0; i < this.list.length; i++) {
      const slot = this.list[i];
      const outline = this.lightMode ? 'text-shadow: 1px 2px 0 rgba(112,112,112,0.4), -1px 0px 0 rgba(112,112,112,0.4), 0px -1px 0 rgba(112,112,112,0.4), 0px 1px 0 rgba(112,112,112,0.4);' : '';
      const fontWeight = this.lightMode ? 'font-weight: 600;' : 'font-weight: 300;';
      if(i < 5){
        let color = "white";
        if(slot.id == this.playerId){
          color = '#e8d589'; 
          playerInLeaderBord = true;
        }
        html.push(`<div class="slot" style="color: ${color}; ${outline}">${i + 1}. ${slot.name}</div>`);
      }
      if(slot.id == this.playerId && i >= 5){
        html.push(`<div class="slot" style="color: #e8d589; ${outline}">${i + 1}. ${slot.name}</div>`);
        break;
      }
    }
    this.element.innerHTML = html.join('');
  }

  show(): void {
    this.element.style.display = 'flex';
    this.isOpen = true;

    //Re ajusting ui structure
    const topRightEle: HTMLButtonElement = <HTMLButtonElement>document.getElementsByClassName('top-right')[0];
    if(!topRightEle.classList.contains('flex-row')){
      topRightEle.classList.add('flex-row');
    }
    if(topRightEle.classList.contains('flex-column')){
      topRightEle.classList.remove('flex-column');
    }

    const toggleEle: HTMLButtonElement = <HTMLButtonElement>document.getElementById('leaderboard-toggle');
    if(toggleEle.style.display !== 'none'){
      toggleEle.style.display = 'none';
    }

    const lBordContainer: HTMLButtonElement = <HTMLButtonElement>document.getElementById('lBord');
    lBordContainer.style.display = "block";

    const zoomIn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('zoom-in');
    zoomIn.style.marginTop = "2px";
    //zoom-in
  }

  hide(): void {
    this.element.style.display = 'none';
    this.isOpen = false;

    //Re ajusting ui structure
    const topRightEle: HTMLButtonElement = <HTMLButtonElement>document.getElementsByClassName('top-right')[0];
    if(!topRightEle.classList.contains('flex-column')){
      topRightEle.classList.add('flex-column');
    }
    if(topRightEle.classList.contains('flex-row')){
      topRightEle.classList.remove('flex-row');
    }

    const toggleEle: HTMLButtonElement = <HTMLButtonElement>document.getElementById('leaderboard-toggle');
    if(toggleEle.style.display !== 'flex'){
      toggleEle.style.display = 'flex';
    }

    const lBordContainer: HTMLButtonElement = <HTMLButtonElement>document.getElementById('lBord');
    lBordContainer.style.display = "none";

    const zoomIn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('zoom-in');
    zoomIn.style.marginTop = "10px";
  }
}

export default new Leaderboard();
