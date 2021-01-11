import { ServerListEntry } from "../../../utilities/Structures";
import Player from "../../../game/Player";
import ServerMenu from "../ServerMenu";
import SplashScreen from "../../../SplashScreen";

class ServerList {
  endpoint: string;
  refreshInterval: number;
  list: ServerListEntry[];
  listByIp: Map<string, ServerListEntry>;

  constructor() {
    this.endpoint = 'https://us.senpa.io:8000';
    this.refreshInterval = 1E3 * 10;
    this.list = [];
    this.listByIp = new Map();
  }

  initialise(): void {
    this.fetchServers();
    this.findRegion();
  }

  fetchServers(): void {
    if (!Player.isAlive) {
      const request: XMLHttpRequest = new XMLHttpRequest();
      request.open('GET', this.endpoint);
      request.onload = () => {
        if (request.status !== 200) return;
        try {
          this.list = JSON.parse(request.responseText);
          this.listByIp.clear();
          for (const item of this.list) this.listByIp.set(item.IP, item);      
          ServerMenu.updateServerList();
        } catch (e) {
          console.log('Failed to fetch server list');
        }
        SplashScreen.finish();
      }

      request.onerror = () => {
        const message: HTMLDivElement = <HTMLDivElement>document.getElementById('network-error');
        message.style.display = 'block';
      }
      request.send();
      }

    //setTimeout(() => { this.fetchServers() }, this.refreshInterval);
  }

  findRegion(): void {
    const request: XMLHttpRequest = new XMLHttpRequest();
    request.open('GET', 'https://ipapi.co/json/');
    request.onload = () => {
      if (request.status !== 200) return;
      try {
        const info = JSON.parse(request.responseText);

        let region = 'EU';
        switch (info.continent_code) {
          case 'SA': region = 'NA'; break;
          case 'NA': region = 'NA'; break;
          case 'AS': region = 'AS'; break;
        }

        ServerMenu.setDetectedRegion(region);
      } catch {
        console.log(`Failed to detect client's region.`);
      }
    }
    request.send();
  }
}

export default new ServerList();
