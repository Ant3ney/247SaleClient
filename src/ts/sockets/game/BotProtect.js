// eslint-disable-next-line no-unused-vars
import Socket from "./Socket";
import Emitter from "./Emitter";
import Writer from "../Writer";

class BotProtect {
	constructor(key, enabled) {
		this.bpPublicKey = key;
		this.enabled = enabled;
		
		this.ready = false;
	}
	
	waitForBotProtect() {
		return new Promise(async (resolve) => {
			if(window.BotProtect.ready) {
				window.BotProtect.ready(async (err) => {
					if(err) {
						console.log(err);
					}
					resolve();
				});
			} else resolve();
		});
	}
	
	auth() {
		return new Promise(async (resolve) => {
			//if(!window.BotProtectReady) {
			await this.waitForBotProtect();
			await window.BotProtect.readyAsync();
			//}
			
			let token = await window.BotProtect.exec({
				publicKey: this.bpPublicKey,
				showVisualOnError: false,
				watermark: false,
				showVisual: false
			}).catch(e => console.error(e));
			
			console.log('Got token!', token);
			
			const writer = new Writer(2+token.length);
			
			writer.writeUInt8(150);
			writer.writeString8(token);
			
			Socket.ws.send(writer.buffer);
			resolve();
		});
	}
}

let bp = (new BotProtect('FSi6eVh5pLsNv1gd80HqqrIxqaie7QCm', true));

export default bp;