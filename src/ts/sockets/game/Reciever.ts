import Socket from './Socket';
import Reader from '../Reader';
import Border from '../../game/Border';
import Camera from '../../game/Camera';
import Emitter from './Emitter';
import ClientData from '../../entities/ClientData';
import PlayerData from '../../entities/PlayerData';
import World from '../../game/World';
import Leaderboard from '../../ui/huds/Leaderboard';
import Minimap from '../../ui/huds/Minimap';
import Color from '../../utilities/Color';
import Config from '../../game/Config';
import Dpad from '../../ui/huds/Dpad';
import Cell from '../../entities/Cell';
import * as Module from '../../utilities/module/Module';
import Player from '../../game/Player';
import { Point } from 'pixi.js';
const BotProtect = require('./BotProtect').default;

class Reciever {
   parse(buffer: ArrayBuffer) {
      const reader: Reader = new Reader(buffer);
      const OP: number = reader.readUInt8();
      switch (OP) {
         case 0:
            this.preInfoPacket(reader);
            break;
         case 10:
            this.clientsUpdate(reader);
            break;
         case 11:
            this.playersUpdate(reader);
            break;
         case 20:
            this.worldUpdate(reader);
            break;
         case 21:
            this.leaderboardUpdate(reader);
            break;
         case 22:
            this.minimapUpdate(reader);
            break;
         case 23:
            this.spectateInfo(reader);
            break;
         case 30:
            this.pong();
            break;
         case 43:
            this.configUpdate(reader);
            break;
         case 255:
            this.handshake(reader);
            break;
      }
   }

   preInfoPacket(reader: Reader): void {
      const worldSize: number = reader.readUInt32();
      Border.update(0, 0, worldSize, worldSize);

      Player.setCenters(new Point(worldSize / 2, worldSize / 2));
      Camera.targetZoom = 0.5;

      World.myClientID = reader.readUInt16();
      World.myPlayerIDs = [];
      World.myCells = [];

      const playerUnitCount: number = reader.readUInt8();
      for (let i: number = 0; i < playerUnitCount; i++) {
         const playerID = reader.readUInt16();
         const playerCells = new Map();
         World.myPlayerIDs.push(playerID);
         World.myCells.push(playerCells);
      }
      Dpad.buttons.a.style.visibility =
         playerUnitCount > 1 ? 'visible' : 'hidden';
      Emitter.playerInfo();
   }

   clientsUpdate(reader: Reader): void {
      const newCount: number = reader.readUInt8();
      for (let i: number = 0; i < newCount; i++) {
         const id: number = reader.readUInt16();
         const isBot: boolean = reader.readUInt8() !== 0;
         const nick: string = reader.readString16();
         const tag: string = reader.readString16();
         const r: number = reader.readUInt8();
         const g: number = reader.readUInt8();
         const b: number = reader.readUInt8();
         const teamColor: string = Color.rgb2hex(r, g, b);
         const client: ClientData = new ClientData(
            id,
            isBot,
            nick,
            tag,
            teamColor
         );
         World.clientsList.set(id, client);
      }

      const updateCount: number = reader.readUInt8();
      for (let i: number = 0; i < updateCount; i++) {
         const id: number = reader.readUInt16();
         const client: ClientData =
            World.clientsList.get(id) || new ClientData();
         const flags: number = reader.readUInt8();
         if (flags & 1) client.nick = reader.readString16();
         if (flags & 2) client.tag = reader.readString16();
         if (flags & 4) {
            const r: number = reader.readUInt8();
            const g: number = reader.readUInt8();
            const b: number = reader.readUInt8();
            client.teamColor = Color.rgb2hex(r, g, b);
         }
      }

      const removeCount: number = reader.readUInt8();
      for (let i: number = 0; i < removeCount; i++) {
         const id: number = reader.readUInt16();
         World.clientsList.delete(id);
      }
   }

   playersUpdate(reader: Reader): void {
      const newCount = reader.readUInt8();
      for (let i: number = 0; i < newCount; i++) {
         const id: number = reader.readUInt16();
         const parentClientID: number = reader.readUInt16();
         const r: number = reader.readUInt8();
         const g: number = reader.readUInt8();
         const b: number = reader.readUInt8();
         const color: string = Color.rgb2hex(r, g, b);
         const skinURL: string = reader.readString8();
         const player: PlayerData = new PlayerData(
            id,
            parentClientID,
            color,
            skinURL
         );
         World.playersList.set(id, player);
      }

      const updateCount: number = reader.readUInt8();
      for (let i: number = 0; i < updateCount; i++) {
         const id: number = reader.readUInt16();
         const player: PlayerData =
            World.playersList.get(id) || new PlayerData();
         const flags: number = reader.readUInt8();
         if (flags & 1) {
            const r: number = reader.readUInt8();
            const g: number = reader.readUInt8();
            const b: number = reader.readUInt8();
            player.color = Color.rgb2hex(r, g, b);
         }
         if (flags & 2) player.skinURL = reader.readString8();
      }

      const removeCount: number = reader.readUInt8();
      for (let i: number = 0; i < removeCount; i++) {
         const id: number = reader.readUInt16();
         World.playersList.delete(id);
      }
   }

   worldUpdate(reader: Reader): void {
      const eatCount: number = reader.readUInt16();
      for (let i: number = 0; i < eatCount; i++) {
         const hunterID: number = reader.readUInt32();
         const preyID: number = reader.readUInt32();
         World.eatCell(hunterID, preyID);
      }

      const newCount: number = reader.readUInt16();
      for (let i: number = 0; i < newCount; i++) {
         const id: number = reader.readUInt32();
         const x: number = reader.readInt32();
         const y: number = reader.readInt32();
         const radius: number = reader.readUInt16();
         const type: number = reader.readUInt8();
         const cell: Cell = World.newCell(id, x, y, radius, type);

         if (type === 0) {
            const parentPlayerID: number = reader.readUInt16();
            cell.parentPlayerID = parentPlayerID;
            World.ownCellCheck(cell);

            const r: number = reader.readUInt8();
            const g: number = reader.readUInt8();
            const b: number = reader.readUInt8();
            cell.color = Color.rgb2hex(r, g, b);
         }

         if (type === 2) {
            const r: number = reader.readUInt8();
            const g: number = reader.readUInt8();
            const b: number = reader.readUInt8();
            cell.color = Color.rgb2hex(r, g, b);
         }
      }

      const updateCount: number = reader.readUInt16();
      for (let i: number = 0; i < updateCount; i++) {
         const id: number = reader.readUInt32();
         const x: number = reader.readInt32();
         const y: number = reader.readInt32();
         const radius: number = reader.readUInt16();
         const cell: Cell = World.getCell(id);
         cell.update(x, y, radius);
      }

      const removeCount: number = reader.readUInt16();
      for (let i: number = 0; i < removeCount; i++) {
         const id: number = reader.readUInt32();
         World.removeCell(id);
      }
   }

   leaderboardUpdate(reader: Reader): void {
      Leaderboard.reset();
      const count: number = reader.readUInt8();
      for (let i: number = 0; i < count; i++) {
         const clientID: number = reader.readUInt16();
         const client: ClientData =
            World.clientsList.get(clientID) || new ClientData();
         const nick: string = client.nick || 'Unnamed cell';
         const color: string = client.teamColor;
         const mass: number = reader.readUInt32();
         Leaderboard.add(nick, mass, color);
      }
   }

   minimapUpdate(reader: Reader): void {
      const existingCount: number = reader.readUInt8();
      for (let i: number = 0; i < existingCount; i++) {
         const playerID: number = reader.readUInt16();
         const x: number = reader.readUInt32();
         const y: number = reader.readUInt32();
         const radius: number = reader.readUInt16();
         Minimap.updatePlayer(playerID, x, y, radius);
      }
   }

   spectateInfo(reader: Reader): void {
      Camera.spectatePoint.x = reader.readUInt32();
      Camera.spectatePoint.y = reader.readUInt32();
   }

   pong(): void {
      Socket.latency = (performance.now() - Socket.pingTime) | 0;
   }

   configUpdate(reader: Reader): void {
      Config.leaderboardTitle = reader.readString16();
      Config.trainingMode = reader.readUInt8() === 1;
      Config.trainingModeTag = reader.readString16();
      Config.onChange();
   }

   handshake(reader: Reader): void {
      const key = reader.readUInt32();
      Module.authorise(Socket.ws!, key);
	  
	  if(BotProtect.enabled) {
		  BotProtect.auth().then(() => {
			  
		  });
		  
		  Emitter.handshakeDone = true;
	  } else {
		  Emitter.handshakeDone = true;
	  }
   }
}

export default new Reciever();
