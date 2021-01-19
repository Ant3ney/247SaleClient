import Experience from './../game/Experience';
// @ts-ignore
import postMessage from './huds/postMessage.js';

import { Profile } from '../utilities/Structures';

const avatarImg = require('../../resources/images/avatar.png');
const cookie = require('cookiejs');

const DEVBUILD = process.env.NODE_ENV == 'development';

class AccountData {
	public authToken: string = '';
	public profile: Profile = new Profile();
	private urlAuthAccount: string = '';
	private urlAuthDiscord: string = '';
	private urlAuthFacebook: string = '';

	public onLogout: Function = () => { };
	public onLogin: Function = () => { };

	public loginStatus: boolean = false;

	private windowObj: Window = null;
	private previousUrl: string = '';

	private errors: Array<number> = [0, 1, 2];

	private cookieDuration: number = 365;

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


		picElem.onerror = function () {
			this.setProfilePicture(avatarImg);
		}
	};

	fetchProfileData() {
		console.log('-> Fetching profile data');

		return new Promise(async (accept, reject) => {
			if (this.authToken) {
				postMessage.send('authToken below');
				postMessage.send(this.authToken);
			} else {
				postMessage.send('authToken is undefined or null');
			}

			const data = await fetch(this.urlAuthAccount, {
				method: 'GET',
				headers: {
					auth: this.authToken
				}
			});

			const profile = await data.json();
			if (!profile) return reject();

			if (profile.error) {
				postMessage.send('Something went wrong in acout details in fetchProfileData');
				postMessage.send(profile.error.message);
				return reject(profile.error);
			}

			postMessage.send(this.profile.avatarURL);
			this.profile = <Profile>profile;
			accept(this);
		});
	}

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

		this.loginStatus = isLoggedIn;

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
		const level = Experience.levelFromExp(this.profile.experience);
		const expForLevel = Experience.realExpGainRequiredForLevelUp(level);
		this.setLv(level);
		this.setRealName(this.profile.realName);
		this.setProfilePicture(this.profile.avatarURL || avatarImg);
		const xpText = document.getElementById('xp-text');
		if (xpText) {
			xpText.innerHTML = this.profile.experience.toString() + ' / ' + expForLevel.toString() + ' XP';
		}
	}

	updateSmallProfilePanel() {
		const level = Experience.levelFromExp(this.profile.experience);
		const expForLevel = Experience.realExpGainRequiredForLevelUp(level);
		this.setStatus(true);
		this.setSmallLv(level);
		this.setSmallRealName(this.profile.realName);
		this.setSmallProfilePicture(this.profile.avatarURL || avatarImg);

		const xpText = document.getElementById('xp-text');
		if (xpText) {
			xpText.innerHTML = this.profile.experience.toString() + ' / ' + expForLevel.toString() + ' XP';
		}
	}

	loadAuthToken() {
		return new Promise((accept, reject) => {
			if (cookie.get('auth') === 'undefined') {
				cookie.remove('auth');
				cookie.remove('profile');
			}
			const token = cookie.get('auth');
			if (token && token !== '') {
				this.authToken = token;
				accept(this.authToken);
			} else {
				reject({
					code: this.errors[0],
					msg: 'Auth token not stored in cookies'
				});
			}
		});
	}

	setAuthToken(authToken: string) {
		cookie.set('auth', authToken, { expires: this.cookieDuration });
		this.authToken = authToken;
	}

	removeAuthToken() {
		cookie.remove('auth');
	}

	async receiveMessage(event: any) {
		if (!event || !event.isTrusted || event.origin != 'https://auth.senpa.io' || !event.data || !event.data.token) return;

		const token = event.data.token; //DEVBUILD ? (event.data).replace('token:', '') : event.data.token;
		// if (!token) return;

		postMessage.send('Setting auth stuff');
		this.setAuthToken(token);

		await this.fetchProfileData();
		this.updateSmallProfilePanel();
		this.onLogin();
	}

	logout() {
		this.setAuthToken('');
		this.setStatus(false);
		this.removeAuthToken();

		this.onLogout();
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
			await this.loadAuthToken();
			await this.fetchProfileData();
			this.updateSmallProfilePanel();
			this.onLogin();
		} catch (e) {
			postMessage.send('Req:NativeAuthToken');
		}
	}
}


export default new AccountData();