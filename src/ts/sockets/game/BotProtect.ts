// eslint-disable-next-line no-unused-vars

class BotProtect {
	bpPublicKey: String;
	enabled: boolean;
	ready: boolean;

	constructor(key: string, enabled: boolean) {
		this.bpPublicKey = key;
		this.enabled = enabled;

		this.ready = false;
	}

	waitForBotProtect(): Promise<void> {
		if (!this.enabled) return new Promise(r => r());;

		try {
			return new Promise(async (resolve) => {
				if (window.BotProtect) {
					if (window.BotProtect.ready) {
						window.BotProtect.ready((e: any) => {
							if (e) console.log(e);

							resolve();
						});
					} else resolve();
				} else {
					console.log('Waiting for botprotect libs.');
					setTimeout(async () => {
						await this.waitForBotProtect();
						resolve();
					}, 250);
				}
			});
		} catch (e) {
			return new Promise(r => r());
		}
	}

	auth(): Promise<string> {
		if (!this.enabled) return new Promise(r => r());

		try {
			return new Promise(async (resolve) => {
				//if(!window.BotProtectReady) {
				await this.waitForBotProtect();
				await window.BotProtect.readyAsync();
				//}

				resolve(await window.BotProtect.exec({
					publicKey: this.bpPublicKey,
					showVisualOnError: false,
					watermark: false,
					showVisual: false
				}).catch((e: any) => console.error(e)));
			});
		} catch (e) {
			return new Promise(r => r());
		}
	}
}

export default new BotProtect('FSi6eVh5pLsNv1gd80HqqrIxqaie7QCm', true);