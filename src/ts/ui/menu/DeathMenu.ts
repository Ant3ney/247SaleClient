import Menu from '../Menu';

class DeathMenu{
    element: HTMLDivElement;
    buttonPlayAgain: HTMLDivElement;
    buttonMenu: HTMLDivElement;
    constructor(){
        this.element = <HTMLDivElement>document.getElementById('death-menu-container');
        this.buttonPlayAgain = <HTMLDivElement>document.querySelectorAll('#death-menu-container .action-buttons button')[0];
        this.buttonMenu = <HTMLDivElement>document.querySelectorAll('#death-menu-container .action-buttons button')[1];
    }

    initialise(): void {
        this.attachEvents();
    }
    attachEvents(): void {
        this.buttonPlayAgain.addEventListener('touchend', (event) => {
            this.onPlayAgain(event);
        },  { passive: false });
        this.buttonMenu.addEventListener('touchend', () => {
            this.onMenu();
        },  { passive: true });
    }
    show(): void{
        this.element.style.display = 'flex';
    }
    hide(): void{
        this.element.style.display = 'none';
    }
    onMenu(): void{
        this.hide();
        Menu.show();
    }
    onPlayAgain(event): void{
        this.hide();
        Menu.onPlay(event);
    }
}

export default new DeathMenu();