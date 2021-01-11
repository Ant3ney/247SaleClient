import ServerList from "./server-menu/ServerList";
import { ServerListEntry } from "../../utilities/Structures";

class ServerMenu {
  element: HTMLDivElement;
  listContainer: HTMLDivElement;
  template: HTMLTemplateElement;
  isScrolling: boolean;
  isOpen: boolean;
  selectedServer: string;
  _serverName: string;
  _selectedRegion: string;

  onServerChanged: any;

  constructor() {
    this.element = <HTMLDivElement>document.getElementById('outter-server-menu');
    this.listContainer = <HTMLDivElement>document.getElementById('server-list');
    this.template = <HTMLTemplateElement>document.getElementById('server-list-row');
    this.isOpen = false;
    this.isScrolling = false;
    this.selectedServer = '';
    this._serverName = '';
    this._selectedRegion = '';
    this.onServerChanged = null;
  }

  get serverName(): string {
    return this._serverName;
  }

  set serverName(value: string) {
    this._serverName = value;
    this.updateMenuInfo();
  }

  get selectedRegion(): string {
    return this._selectedRegion;
  }

  set selectedRegion(value: string) {
    if (this._selectedRegion === value) return;
    this._selectedRegion = value;
    this.updateMenuInfo();

    const items: HTMLCollection = this.listContainer.children;
    for (let i = 0; i < items.length; i++) {
      const item: HTMLDivElement = <HTMLDivElement>items[i];
      const region: string = <string>item.getAttribute('region');
      const isTitle: boolean = item.classList.contains('title');
      item.style.display = isTitle || region === value ? 'flex' : 'none';
    }

    const navBar: HTMLDivElement = <HTMLDivElement>document.querySelector('#server-menu .header .nav-bar');
    const regionBtns: HTMLCollection = navBar.children;
    for (let i: number = 0; i < regionBtns.length; i++) {
      const regionBtn: HTMLDivElement = <HTMLDivElement>regionBtns[i];
      const region: string = <string>regionBtn.getAttribute('region');
      if (region === value) regionBtn.classList.add('active');
      else regionBtn.classList.remove('active');
    }
  }

  initialise(): void {
    ServerList.initialise();
    this.attachEvents();
    this.selectedRegion = 'EU';
    this.selectedServer = localStorage.getItem('senpa-mob:server') || '';
    if (this.onServerChanged !== null)
      this.onServerChanged();
  }

  attachEvents(): void {
    const closeButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('server-menu-close');
    closeButton.addEventListener('touchend', () => { this.hide() }, { passive: true });

    this.listContainer.addEventListener('touchmove', () => {
      this.isScrolling = true;
    }, { passive: true });

    this.listContainer.addEventListener('touchend', () => {
      this.isScrolling = false;
    }, { passive: true });

    const navBar: HTMLDivElement = <HTMLDivElement>document.querySelector('#server-menu .header .nav-bar');
    const regionBtns: HTMLCollection = navBar.children;
    for (let i = 0; i < regionBtns.length; i++) {
      const regionBtn: HTMLDivElement = <HTMLDivElement>regionBtns[i];
      const region: string = <string>regionBtn.getAttribute('region');

      regionBtn.addEventListener('touchend', () => {
        localStorage.setItem('senpa-mob:region', region);
        this.selectedRegion = region;
      }, { passive: true });
    }
  }
  
  updateServerList(): void {
    const titleRow: HTMLDivElement = <HTMLDivElement>this.listContainer.querySelector('div.item-row.title');
    this.listContainer.innerHTML = '';
    this.listContainer.appendChild(titleRow);
    for (const entry of ServerList.list) {
      if (this.selectedServer.length < 1) this.selectedServer = entry.IP;
      this.addServer(entry);
    }
  }

  addServer(data: ServerListEntry): void {
    const row: HTMLDivElement = <HTMLDivElement>this.template.content.children[0].cloneNode(true);
    const name: HTMLDivElement = <HTMLDivElement>row.querySelector('.cell[data=name]');
    const count: HTMLDivElement = <HTMLDivElement>row.querySelector('.cell[data=count]');
    const mode: HTMLDivElement = <HTMLDivElement>row.querySelector('.cell[data=mode]');

    name.innerText = data.name;
    count.innerText = `${data.numPlayers} / ${data.maxPlayers}`;
    mode.innerText = data.mode;
    row.setAttribute('region', data.region);
    row.style.display = data.region === this.selectedRegion ? 'flex' : 'none';
    if (data.IP === this.selectedServer) {
      row.classList.add('active');
      this.serverName = data.name;
    }

    row.addEventListener('touchend', () => {
      if (this.isScrolling) return;

      const activeRows = this.listContainer.querySelectorAll('.item-row.active');
      for (let i = 0; i < activeRows.length; i++) {
        const activeRow = activeRows[i];
        activeRow.classList.remove('active');
      }
      row.classList.add('active');
      this.selectedServer = data.IP;
      this.serverName = data.name;
      localStorage.setItem('senpa-mob:server', data.IP);

      if (this.onServerChanged !== null)
        this.onServerChanged();
    }, { passive: true });

    this.listContainer.appendChild(row);
  }

  setDetectedRegion(region: string): void {
    const savedRegion: string | null = localStorage.getItem('senpa-mob:region');
    this.selectedRegion = savedRegion || region;
  }

  show(): void {
    this.element.style.display = 'flex';
    this.isOpen = true;
  }

  hide(): void {
    this.element.style.display = 'none';
    this.isOpen = false;
  }

  updateMenuInfo(): void {
    const infoBox = <HTMLDivElement>document.getElementById('server-info');
    infoBox.innerText = `Region: ${this.selectedRegion || 'None'}\nServer: ${this.serverName || 'None'}`;
  }
}

export default new ServerMenu();
