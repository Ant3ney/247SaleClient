import MinimapPlayer from "../../entities/MinimapPlayer";
import Border from "../../game/Border";
import World from "../../game/World";
import Time from "../../utilities/Time";
import PlayerData from "../../entities/PlayerData";

class Minimap {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  playerList: Map<number, MinimapPlayer>
  PI2: number;
  size: number;
  isOpen: boolean;
  lightMode: boolean;

  constructor () {
    this.container = <HTMLDivElement>document.getElementById('minimap-hud');
    this.canvas = <HTMLCanvasElement>document.getElementById('minimapNode');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.playerList = new Map();
    this.PI2 = Math.PI * 2;
    this.size = 120 * devicePixelRatio;
    this.isOpen = false;
  }

  initialise(): void {
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.renderGrid();

    const toggle: HTMLButtonElement = <HTMLButtonElement>document.getElementById('minimap-toggle');
    toggle.addEventListener('touchend', () => {
      if (this.isOpen) this.hide();
      else this.show();
    });
  }

  updatePlayer(id: number, x: number, y: number, radius: number): void {
    const player: MinimapPlayer = this.playerList.get(id) || this.getNewPlayer(id, x, y, radius);
    player.update(x, y, radius);
  }

  getNewPlayer(id: number, x: number, y: number, radius: number): MinimapPlayer {
    const player: MinimapPlayer = new MinimapPlayer(id, x, y, radius);
    this.playerList.set(id, player);
    return player;
  }

  update(): void {
    const ctx: CanvasRenderingContext2D = this.ctx;
    const time: number = Time.now;
    const ratio: number = this.size / (Border.right - Border.left);
    const showNicks: boolean = true;

    ctx.clearRect(0, 0, this.size, this.size);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font = `400 ${12 * (this.size / 200) | 0}px ubuntu`;
    ctx.globalAlpha = 0.9;

    for (const [id, player] of this.playerList) {
      if (time - player.updateTime > 2E3) {
        this.playerList.delete(id);
        continue;
      }

      const parentPlayer: PlayerData = World.playersList.get(id) || new PlayerData();
      const isBot: boolean = parentPlayer.parentClient.isBot;
      const isSelf: boolean = World.myPlayerIDs.includes(id);

      player.animate();
      const x: number = player.x * ratio | 0;
      const y: number = player.y * ratio | 0;
      const radius: number = Math.max(3, player.radius * ratio | 0) * (this.size / 200) | 0;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, this.PI2, true);
      ctx.closePath();

      ctx.fillStyle = parentPlayer.parentClient.teamColor;
      ctx.fill();

      if (isSelf) {
        ctx.beginPath();
        ctx.arc(x, y, radius + 2, 0, this.PI2, true);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = parentPlayer.parentClient.teamColor;
        ctx.stroke();
      }

      const name: string = parentPlayer.parentClient.nick;
      if (!isBot && showNicks && name) {
        const mass: number = player.endRadius * player.endRadius / 100 | 0;
        const text: string = false ? `${name} [${mass}]` : name;
        ctx.fillText(text, x, y - radius);
      }
    }
  }

  renderGrid(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('minimap');
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
    const edge: number = this.size;
    const sectorEdge: number = edge / 5;
    const sectorEdge_2: number = sectorEdge / 2;
    const letters: string[] = 'ABCDE'.split('');
    const gridWidth: number = 2;

    canvas.width = this.size;
    canvas.height = this.size;

    ctx.clearRect(0, 0, edge, edge);
    ctx.fillStyle = this.lightMode ? 'rgba(136, 136, 136,0.63)' : 'rgba(36,36,36,0.63)';
    ctx.fillRect(0, 0, edge, edge);

    if (false) {
      ctx.strokeStyle = '#111';
      ctx.lineWidth = gridWidth;
      ctx.strokeRect(sectorEdge, 0, sectorEdge, edge);
      ctx.strokeRect(sectorEdge * 3, 0, sectorEdge, edge);
      ctx.strokeRect(0, sectorEdge, edge, sectorEdge);
      ctx.strokeRect(0, sectorEdge * 3, edge, sectorEdge);
      ctx.lineWidth = gridWidth << 1;
      ctx.strokeRect(0, 0, edge, edge);

      ctx.strokeStyle = '#333';
      ctx.lineWidth = gridWidth >> 1;
      ctx.strokeRect(0, 0, edge, edge);
    }

    // letters
    if (true) {
      ctx.font = `400 ${ 12 * (this.size / 200) | 0}px ${ 'Ubuntu' }`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#383838';

      for (let i: number = 0; i < 5; i++) {
        const y: number = sectorEdge_2 + i * sectorEdge;
        for (let j = 0; j < 5; j++) {
          const x: number = sectorEdge_2 + j * sectorEdge;
          const sectorID: string = letters[i] + (j + 1);
          ctx.fillText(sectorID, x, y);
        }
      }
    }
  }

  hide(): void {
    this.container  .style.display = 'none';
    this.isOpen = false;
  }

  show(): void {
    this.container  .style.display = 'block';
    this.isOpen = true;
  }

  resize(size: number): void {
    this.size = size;
    this.canvas.width = size;
    this.canvas.height = size;
    this.renderGrid();
  }
}

export default new Minimap();
