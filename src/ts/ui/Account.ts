import AccountData from '../entities/AccountData';
import Experience from '../game/Experience';
// @ts-ignore
import postMessage from './huds/postMessage.js';

const avatarImg = require('../../resources/images/avatar.png');

const DEVBUILD = process.env.NODE_ENV == 'development';

class Account {
	private urlAuthAccount: string = '';
	private urlAuthDiscord: string = '';
	private urlAuthFacebook: string = '';

	private windowObj: Window = null;
	private previousUrl: string = '';

	constructor() {
		// if (DEVBUILD) {
		// this.urlAuthFacebook = 'http://localhost/auth/facebook';
		// this.urlAuthDiscord = 'http://localhost/auth/discord';
		// this.urlAuthAccount = 'http://localhost/account/';
		// } else {
		this.urlAuthFacebook = 'https://auth.senpa.io/auth/facebook';
		this.urlAuthDiscord = 'https://auth.senpa.io/auth/discord';
		this.urlAuthAccount = 'https://auth.senpa.io/account/';
		// }


		this.setStatus(false);

		const picElem = document.getElementById('pf-avatar');
		if (!picElem) return;

		picElem.onerror = () => {
			this.setProfilePicture(avatarImg);
		}

		const smallPicElem = document.getElementById('small-pf-avatar');
		if (!smallPicElem) return;


		smallPicElem.onerror = () => {
			this.setSmallProfilePicture(avatarImg);
		}

	};

	setExperienceProgress(progress: number) {
		const prog = Math.max(Math.min(progress, 1), 0.1);

		const progElem = document.getElementById('login-panel-xp-progress');
		if (!progElem) return;
		progElem.style.width = (150 * prog) + 'px';
	}

	setSmallRealName(name: string) {
		const nameElem = document.getElementById('small-login-panel-name');
		if (!nameElem) return;

		nameElem.innerHTML = name;
	}

	setRealName(name: string) {
		const nameElem = document.getElementById('login-panel-name');
		if (!nameElem) return;

		nameElem.innerHTML = name;
	}

	setLv(lv: number) {
		//small-login-panel-lv
		const lvElem = document.getElementById('login-panel-lv');
		if (!lvElem) return;

		lvElem.innerHTML = 'Level ' + lv;
	}

	setSmallLv(lv: number) {
		//small-login-panel-lv
		const lvElem = document.getElementById('small-login-panel-lv');
		if (!lvElem) return;

		lvElem.innerHTML = 'Level ' + lv;
	}

	setSmallProfilePicture(url: string) {
		const picElem = document.getElementById('small-pf-avatar');
		if (!picElem) return;

		picElem.setAttribute('src', url);
	}

	setProfilePicture(url: string) {
		const picElem = document.getElementById('pf-avatar');
		if (!picElem) return;

		picElem.setAttribute('src', url);
	}

	setStatus(isLoggedIn: boolean) {
		const zeroLoginForm = document.getElementById('login-form-zero');
		const secondLoginForm = document.getElementById('login-form-second');
		const thirdLoginForm: HTMLButtonElement = <HTMLButtonElement>document.getElementById('login-form-third');

		AccountData.loginStatus = isLoggedIn;

		if (zeroLoginForm) {
			zeroLoginForm.style.display = isLoggedIn ? 'none' : 'block';
		}
		if (secondLoginForm) {
			secondLoginForm.style.display = isLoggedIn ? 'block' : 'none';
		}
		if (thirdLoginForm) {
			if (thirdLoginForm.style.display !== 'none') {
				thirdLoginForm.style.display = 'none';
			}
		}
	}

	showLargeProfilePanel() {
		const smallProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#login-form-second');
		const largeProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#login-form-third');

		if (smallProfilePanel.style.display !== 'none') {
			smallProfilePanel.style.display = 'none';
		}
		if (largeProfilePanel.style.display !== 'block') {
			largeProfilePanel.style.display = 'block';
		}
		this.updateLargeProfilePanel();
	}

	showSmallProfilePanel() {
		const smallProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#login-form-second');
		const largeProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#login-form-third');

		if (smallProfilePanel.style.display !== 'block') {
			smallProfilePanel.style.display = 'block';
		}
		if (largeProfilePanel.style.display !== 'none') {
			largeProfilePanel.style.display = 'none';
		}
		this.updateSmallProfilePanel();
	}

	updateLargeProfilePanel() {
		const level = Experience.levelFromExp(AccountData.profile.experience);
		const expForLevel = Experience.realExpGainRequiredForLevelUp(level);
		this.setLv(level);
		this.setRealName(AccountData.profile.realName);
		this.setProfilePicture(AccountData.profile.avatarURL || avatarImg);
		const xpText = document.getElementById('xp-text');
		if (xpText) {
			xpText.innerHTML = AccountData.profile.experience.toString() + ' / ' + expForLevel.toString() + ' XP';
		}
	}

	updateSmallProfilePanel() {
		const level = Experience.levelFromExp(AccountData.profile.experience);
		const expForLevel = Experience.realExpGainRequiredForLevelUp(level);
		this.setStatus(true);
		this.setSmallLv(level);
		this.setSmallRealName(AccountData.profile.realName);
		console.log(AccountData.profile.avatarURL);
		this.setSmallProfilePicture(AccountData.profile.avatarURL || avatarImg);

		const xpText = document.getElementById('xp-text');
		if (xpText) {
			xpText.innerHTML = AccountData.profile.experience.toString() + ' / ' + expForLevel.toString() + ' XP';
		}
	}

	async receiveMessage(event: any) {
		//if (!event || !event.isTrusted || event.origin != 'https://auth.senpa.io' || !event.data || !event.data.token) return;
		let token;

		!DEVBUILD ? token = (event.data).replace('token:', '') : token = event.data.token;

		AccountData.setAuthToken(token);

		await AccountData.fetchProfileData(this.urlAuthAccount);
		this.updateSmallProfilePanel();
		AccountData.onLogin();
	}

	logout() {
		AccountData.setAuthToken('');
		this.setStatus(false);
		AccountData.removeAuthToken();

		AccountData.onLogout();
	}

	loginWithFB() {
		this.popupLogin(this.urlAuthFacebook, 'Login with Facebook');
	}

	loginWithDiscord() {
		this.popupLogin(this.urlAuthDiscord, 'Login with Discord');
	}

	popupLogin(url: string, name: string) {
		const features = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

		if (!this.windowObj || this.windowObj.closed) {
			this.windowObj = window.open(url, name, features);
		} else if (this.previousUrl !== url) {
			this.windowObj = window.open(url, name, features);
			this.windowObj.focus();
		} else {
			this.windowObj.focus();
		}

		this.previousUrl = url;
	}

	async initialise(): Promise<void> {
		window.onmessage = (event: any) => this.receiveMessage(event);

		try {
			await AccountData.loadAuthToken();
			await AccountData.fetchProfileData(this.urlAuthAccount);
			this.updateSmallProfilePanel();
			AccountData.onLogin();
		} catch (e) {
			postMessage.send('Req:NativeAuthToken');
		}
	}
}


export default new Account();