import World from '../../game/World';
import TextCache from './text/TextCache';
import Camera from '../../game/Camera';
import Player from '../../game/Player';
import Skins from './Skins';
import Settings from '../../game/Settings';
import ClientData from '../../entities/ClientData';

class Cells {
   PI2: number;

   constructor() {
      this.PI2 = Math.PI * 2;
   }

   render(ctx: CanvasRenderingContext2D) {
      const virusColor1: string = <string>Settings.virusColor;
      const virusColor2: string = <string>Settings.virusBorderColor;
      const virusBorderWidth: number = 14;

      const activeCellBorder: boolean = true;
      const activeCellBorderWidth: number = 15;
      const activeCellBorderColor: string = <string>(
         Settings.activeCellBorderColor
      );

      const nickSize: number = 1;
      const massSize: number = 1;

      const cellMass: boolean = true;
      const ownCellMass: boolean = true;
      const strokeMass: boolean = <boolean>Settings.massStroke;
      const cellMassFormat: string = 'shortened';
      const cellNick: boolean = true;
      const ownCellNick: boolean = true;
      const strokeNick: boolean = <boolean>Settings.nickStroke;

      const allSkins: boolean = <string>Settings.showSkins === 'all';
      const teamSkins: boolean =
         allSkins || <string>Settings.showSkins === 'team';
      const ownSkin: boolean =
         teamSkins || <string>Settings.showSkins === 'own';

      const pellets: boolean = true;
      const singleColorPellets: boolean = <boolean>Settings.singleColorPellets;
      const pelletColor: string = <string>Settings.pelletColor;

      const myClient: ClientData =
         World.clientsList.get(World.myClientID) || new ClientData();

      for (const cell of World.sortedCells) {
         if (!pellets && cell.isFood) continue;

         cell.animate();

         ctx.globalAlpha = 1;
         ctx.beginPath();
         ctx.arc(cell.x, cell.y, cell.radius, 0, this.PI2, true);
         ctx.closePath();

         if (cell.isFood) {
            ctx.fillStyle = singleColorPellets ? pelletColor : cell.color;
            ctx.fill();
            continue;
         }

         if (cell.isEject) {
            ctx.fillStyle = cell.color;
            ctx.fill();
            continue;
         }

         if (cell.isVirus) {
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = virusColor1;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.lineWidth = virusBorderWidth;
            ctx.strokeStyle = virusColor2;
            ctx.stroke();
         }

         if (cell.isPlayerCell) {
            const cellClient: ClientData = cell.parentPlayer.parentClient;
            const isTeammate: boolean = cellClient.tag === myClient.tag && cellClient.teamColor === myClient.teamColor;            const isBot: boolean = cell.isBot;
            let skin: HTMLCanvasElement | boolean = false;

            if (!isBot && Player.isTR && !cell.isTR) ctx.globalAlpha *= 0.35;
            if (!isBot && !Player.isTR && cell.isTR) ctx.globalAlpha *= 0.35;
            if (cell.removed) ctx.globalAlpha *= 1 - cell.dt;

            if (!isBot) {
               if (cell.isOwn >= 0) {
                  if (ownSkin) skin = Skins.get(cell.skin);
               } else if (isTeammate) {
                  if (teamSkins) skin = Skins.get(cell.skin);
               } else {
                  if (allSkins) skin = Skins.get(cell.skin);
               }
            }

            if (!skin || !cell.removed) {
               ctx.fillStyle = cell.color;
               ctx.fill();
            }

            if (skin) {
               ctx.drawImage(
                  skin,
                  cell.x - cell.radius,
                  cell.y - cell.radius,
                  2 * cell.radius,
                  2 * cell.radius
               );
            }

            if (
               cell.isOwn >= 0 &&
               activeCellBorder &&
               World.myPlayerIDs.length > 1
            ) {
               const thickness: number =
                  cell.radius * (activeCellBorderWidth / 100);
               const thickness_2: number = thickness / 2;
               ctx.beginPath();
               ctx.arc(
                  cell.x,
                  cell.y,
                  (cell.radius - thickness_2) | 0,
                  0,
                  this.PI2,
                  true
               );
               ctx.closePath();
               ctx.lineWidth = thickness | 0;
               ctx.strokeStyle =
                  cell.isOwn === Player.activeTab
                     ? activeCellBorderColor
                     : '#ffffff';
               ctx.stroke();
            }

            if (
               (cell.isOwn >= 0 && ownCellNick) ||
               (cell.isOwn < 0 && cellNick)
            ) {
               const screenRadius: number =
                  cell.radius * Camera.zoom * nickSize;
               const color: string = cellClient.teamColor;
               const canvas: HTMLCanvasElement | boolean = TextCache.nick(
                  cellClient.tag + (cell.nick || 'Unnamed cell'),
                  color,
                  strokeNick,
                  screenRadius
               );

               if (canvas && canvas.width && canvas.height) {
                  const factor: number =
                     (cell.radius * nickSize * 0.3) / canvas.height;
                  const width: number = canvas.width * factor;
                  const height: number = canvas.height * factor;
                  ctx.drawImage(
                     canvas,
                     cell.x - width / 2,
                     cell.y - height / 2,
                     width,
                     height
                  );
               }
            }
         }

         if (
            cell.isVirus ||
            (cell.isPlayerCell &&
               ((cell.isOwn >= 0 && ownCellMass) ||
                  (cell.isOwn < 0 && cellMass)))
         ) {
            const screenRadius: number = cell.radius * Camera.zoom * massSize;
            const color: string = cell.parentPlayer.parentClient.teamColor;
            const mass: string =
               cell.mass > 999 && cellMassFormat === 'shortened'
                  ? `${((cell.mass / 100) | 0) / 10}k`
                  : cell.mass.toString();
            const canvas: HTMLCanvasElement | boolean = TextCache.mass(
               cell.id,
               mass,
               color,
               strokeMass,
               screenRadius
            );

            if (canvas && canvas.width && canvas.height) {
               const factor: number =
                  (cell.radius * massSize * 0.3) / canvas.height;
               const width: number = canvas.width * factor;
               const height: number = canvas.height * factor;
               ctx.drawImage(
                  canvas,
                  cell.x - width / 2,
                  cell.y + height / 4 / nickSize,
                  width,
                  height
               );
            }
         }
      }

      ctx.globalAlpha = 1;
      TextCache.cleaner();
   }
}

export default new Cells();
