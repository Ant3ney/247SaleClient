import Socket from './Socket';
import Writer from '../Writer';
import Player from '../../game/Player';
import World from '../../game/World';
//import AccountData from '../../ui/AccountData';

class Emitter {
   handshakeDone: boolean;

   constructor() {
      this.handshakeDone = false;
   }

   initialise(): void {
      this.handshakeDone = false;
      this.handshake1();
   }

   handshake1(): void {
      if (Socket.ws === null) return;

      const version: number = 2;
      const writer: Writer = new Writer(1);
      writer.writeUInt8(version);
      Socket.ws.send(writer.buffer);
   }

   playerInfo(): void {
      this.nick();
      this.tag();
      this.skin(0);
      this.skin(1);
   }

   nick(): void {
      if (!Socket.ws || !Socket.connected || !this.handshakeDone) return;

      const writer: Writer = new Writer(1 + 2 * (Player.nick.length + 1));
      writer.writeUInt8(10);
      writer.writeString16(Player.nick);

      Socket.ws.send(writer.buffer);
   }

   tag(): void {
      if (!Socket.ws || !Socket.connected || !this.handshakeDone) return;

      const writer: Writer = new Writer(1 + 2 * (Player.teamTag.length + 1));
      writer.writeUInt8(11);
      writer.writeString16(Player.teamTag);

      Socket.ws.send(writer.buffer);
   }

   skin(unit: number = Player.activeTab): void {
      if (!Socket.ws || !Socket.connected || !this.handshakeDone || unit >= World.myPlayerIDs.length) return;

      const skinURL: string = unit === 0 ? Player.skin1 : unit === 1 ? Player.skin2 : '';
	  const hasAuthToken = Player.authToken != null;
	  
	  let len = 2 + skinURL.length + 1;
	  
	  if (hasAuthToken) len += 2 * (Player.authToken.length + 1);
	  
      const writer: Writer = new Writer(len);
      writer.writeUInt8(21);
      writer.writeUInt8(unit);
      writer.writeString8(skinURL);
	  if (hasAuthToken) writer.writeString16(Player.authToken);

      Socket.ws.send(writer.buffer);
   }

   cursor(x: number, y: number, unit: number = Player.activeTab): void {
      if (!Socket.ws || !Socket.connected || !this.handshakeDone) return;

      const spectatePoint: boolean = !Player.isAlive;
      const writer: Writer = new Writer(spectatePoint ? 10 : 11);
      writer.writeUInt8(20);
      writer.writeUInt8(spectatePoint ? 1 : 0);
      if (!spectatePoint) writer.writeUInt8(unit);
      writer.writeInt32(x);
      writer.writeInt32(y);

      Socket.ws.send(writer.buffer);
   }

   spawn(unit: number = Player.activeTab): void {
      if (!Socket.ws || !Socket.connected || !this.handshakeDone) return;

      this.playerInfo();
      const writer: Writer = new Writer(2);
      writer.writeUInt8(0);
      writer.writeUInt8(unit);

      Socket.ws.send(writer.buffer);
   }

   ping(): void {
      if (!Socket.ws || !Socket.connected || !this.handshakeDone) return;

      const writer: Writer = new Writer(1);
      writer.writeUInt8(30);

      Socket.ws.send(writer.buffer);
      Socket.pingTime = performance.now();
   }

   split(unit: number, count: number): void {
      if (!Socket.ws || !Socket.connected || !this.handshakeDone) return;

      const writer: Writer = new Writer(3);
      writer.writeUInt8(22);
      writer.writeUInt8(unit);
      writer.writeUInt8(count);

      Socket.ws.send(writer.buffer);
   }

   feed(unit: number, single: boolean, state: number = 0): void {
      if (!Socket.ws || !Socket.connected || !this.handshakeDone) return;

      const writer: Writer = new Writer(single ? 3 : 4);
      writer.writeUInt8(23);
      writer.writeUInt8(unit);
      writer.writeUInt8(single ? 0 : 1);
      if (!single) writer.writeUInt8(state);

      Socket.ws.send(writer.buffer);
   }
}

export default new Emitter();
