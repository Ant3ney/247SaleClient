import Cell from '../../../entities/Cell';
import { Texture, Sprite, Container } from 'pixi.js';
import SkinManager from './playerCell/SkinManager';
import Player from '../../../game/Player';
import Settings from '../../../game/Settings';
import ActiveCellRing from './playerCell/ActiveCellRing';
import MassText from './playerCell/MassText';
import NickText from './playerCell/NickText';
import World from '../../../game/World';
import ClientData from '../../../entities/ClientData';

class PlayerCell {
   texture: Texture;
   pool: Sprite[];
   index: number;
   myTeamTag: string;
   myTeamColor: string;

   constructor() {
      this.texture = Texture.WHITE;
      this.pool = [];
      this.index = 0;
      this.myTeamTag = '';
      this.myTeamColor = '';
   }

   initialise(): void {
      this.createTexture();
      SkinManager.initialise();
      ActiveCellRing.initialise();
      MassText.initialise();
   }

   reset(): void {
      this.index = 0;

      const myClient =
         World.clientsList.get(World.myClientID) || new ClientData();
      this.myTeamTag = myClient.tag;
      this.myTeamColor = myClient.teamColor;

      SkinManager.reset();
      ActiveCellRing.reset();
      MassText.reset();
      NickText.reset();
   }

   add(container: Container, cell: Cell): void {
      const cellClient: ClientData = cell.parentPlayer.parentClient;
      const isTeammate: boolean = cellClient.tag === this.myTeamTag;
      const isBot: boolean = cellClient.isBot;

      const base: Sprite = this.pool[this.index++] || this.newBase();
      base.x = cell.x;
      base.y = cell.y;
      base.width = cell.radius * 2;
      base.height = cell.radius * 2;
      base.tint = parseInt(cell.color.replace('#', '0x'));
      base.alpha = 1;
      if (!isBot && Player.isTR && !cell.isTR) base.alpha *= 0.35;
      if (!isBot && !Player.isTR && cell.isTR) base.alpha *= 0.35;
      if (cell.removed) base.alpha *= 1 - cell.dt;
      container.addChild(base);

      const allSkins: boolean = <string>Settings.showSkins === 'all';
      const teamSkins: boolean =
         allSkins || <string>Settings.showSkins === 'team';
      const ownSkin: boolean =
         teamSkins || <string>Settings.showSkins === 'own';
      let skin: Sprite | false = false;

      if (!cell.isBot) {
         if (cell.isOwn >= 0) {
            if (ownSkin) skin = SkinManager.get(cell.skin);
         } else if (isTeammate) {
            if (teamSkins) skin = SkinManager.get(cell.skin);
         } else {
            if (allSkins) skin = SkinManager.get(cell.skin);
         }
      }

      if (skin !== false) {
         skin.x = cell.x;
         skin.y = cell.y;
         skin.width = cell.radius * 2;
         skin.height = cell.radius * 2;
         skin.alpha = base.alpha;
         container.addChild(skin);
      }

      if (cell.isOwn >= 0 && World.myPlayerIDs.length > 1) {
         const color: string =
            cell.isOwn === Player.activeTab
               ? <string>Settings.activeCellBorderColor
               : '#ffffff';
         const tint = parseInt(color.replace('#', '0x'));
         const activeCellRing: Sprite = ActiveCellRing.getSprite();
         activeCellRing.x = cell.x;
         activeCellRing.y = cell.y;
         activeCellRing.width = cell.radius * 2;
         activeCellRing.height = cell.radius * 2;
         activeCellRing.tint = tint;
         container.addChild(activeCellRing);
      }

      const showNick = true;
      if (showNick) {
         const nickText = NickText.get(
            cellClient.tag + (cell.nick || 'Unnamed cell')
         );
         const nickTextScale = (cell.radius * 0.3) / 128;
         const color: number = parseInt(
            cellClient.teamColor.replace('#', '0x')
         );
         nickText.x = cell.x;
         nickText.y = cell.y;
         nickText.scale.x = nickTextScale;
         nickText.scale.y = nickTextScale;
         nickText.alpha = base.alpha;
         nickText.tint = color;
         container.addChild(nickText);
      }

      const showMass = true;
      if (showMass) {
         const massText = MassText.get(cell.mass.toString());
         const massTextScale = (cell.radius * 0.3) / 256;
         const color: number = parseInt(
            cellClient.teamColor.replace('#', '0x')
         );
         massText.x = cell.x;
         massText.y = cell.y + cell.radius * 0.3;
         massText.scale.x = massTextScale;
         massText.scale.y = massTextScale;
         massText.alpha = base.alpha;
         massText.tint = color;
         container.addChild(massText);
      }
   }

   createTexture(): void {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
         canvas.getContext('2d')
      );
      const size: number = 1024;

      canvas.width = size;
      canvas.height = size;

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      this.texture = Texture.fromCanvas(canvas);
   }

   newBase(): Sprite {
      const sprite: Sprite = new Sprite(this.texture);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      this.pool.push(sprite);
      return sprite;
   }
}

export default new PlayerCell();
