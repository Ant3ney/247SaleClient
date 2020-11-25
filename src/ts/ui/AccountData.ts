const cookie = require('cookiejs');

import Experience from './../game/Experience';

class Profile {
	public experience: number = 0;
	public favorites: Array<number> = [];
	public realName: string = "";
	public id: number = 0;
	public avatarURL: string = "";
	
	constructor() {
		
	}
}

class AccountData {
	public authToken: string = 'SENPA_MOBILE'; //'SENPA_MOBILE';
	public profile: Profile = new Profile();
	private urlAuthAccount: string = "";
	private urlAuthDiscord: string = "";
	private urlAuthFacebook: string = "";

	public loginStatus: boolean = false;

	private windowObjectReference: any = null;
	private previousUrl: string = "";

	private errors: Array<number> = [0, 1, 2];

	private cookieDuration: number = 365;
	
	constructor() {
		if (false) {
			this.urlAuthFacebook = 'http://localhost/auth/facebook';
			this.urlAuthDiscord = 'http://localhost/auth/discord';
			this.urlAuthAccount = 'http://localhost/account/';
		 } else {
			this.urlAuthFacebook = 'https://auth.senpa.io/auth/facebook';
			this.urlAuthDiscord = 'https://auth.senpa.io/auth/discord';
			this.urlAuthAccount = 'https://auth.senpa.io/account/';
		 }   

		 this.setStatus(false);
	};

	fetchProfileData() {
		console.log("-> Fetching profile data");

		return new Promise((accept, reject) => {
		  fetch(this.urlAuthAccount, {
			method: "GET",
			headers: {
			  auth: this.authToken
			}
		  })
			.then(data => data.json())
			.then(profile => {

			  if(profile === undefined || profile === null)
				return reject();
			  if (profile.error)
				return reject(profile.error);
				this.profile.experience= profile.experience;
				this.profile.id = profile.id;
				this.profile.realName= profile.realName;
				this.profile.avatarURL = profile.avatarURL;
			  accept(this);
			})
			.catch(err => {
			  reject(err);
			});
		});
	}

	setExperienceProgress(progress: number) {
		progress = Math.min(progress, 1);
		progress = Math.max(progress, 0.1);

		const progElem = document.getElementById("login-panel-xp-progress");
		if (progElem === null || progElem === undefined)
			return;
		progElem.style.width = (150 * progress).toString() + 'px';
	}

	setRealName(name: string) {
		const nameElem = document.getElementById("login-panel-name");
		if (nameElem === null || nameElem === undefined)
			return;
		nameElem.innerHTML = name;
	}

	setProfilePicture(url: string) {
		const picElem = document.getElementById("pf-avatar");
		if (picElem === null || picElem === undefined)
			return;

		picElem.setAttribute('src', url);
	}

	setStatus(isLoggedIn: boolean) {
		console.log("set login status", isLoggedIn);
		const firstLoginForm = document.getElementById("login-form-first"),
			  secondLoginForm = document.getElementById("login-form-second");
		this.loginStatus = isLoggedIn;
		if (firstLoginForm)
			firstLoginForm.style.display = isLoggedIn ? "none" : "block";
		if (secondLoginForm)
			secondLoginForm.style.display =  isLoggedIn ? "block" : "none";
	}

	updateProfilePanel() {

		const level = Experience.levelFromExp(this.profile.experience);
		const expForLevel = Experience.realExpGainRequiredForLevelUp(level);
		this.setStatus(true);
		this.setExperienceProgress(Experience.realExp(this.profile.experience) / expForLevel);
		this.setRealName(this.profile.realName);
		this.setProfilePicture(this.profile.avatarURL);
	}

	loadAuthToken() {
		return new Promise((accept, reject) => {
			if (cookie.get("auth") === "undefined") {
			  cookie.remove("auth");
			  cookie.remove("profile");
			}
			const token = cookie.get("auth");
			if (token !== false && token !== null && token != undefined && token !== "SENPA_MOBILE") {
			  this.authToken = token;
			  accept(this.authToken);
			} else {
			  //this.updatePanelState();
			  reject({
				code: this.errors[0],
				msg: "Auth token not stored in cookies"
			  });
			}
		  });
	}

	setAuthToken(authToken: string) {
		cookie.set("auth", authToken, { expires: this.cookieDuration });
		this.authToken = authToken;
	}

	receiveMessage(event: any) {
		const token = event.data.token;

      if (token && token != undefined) {
		 this.setAuthToken(token);
		 this.fetchProfileData().then(() => { this.updateProfilePanel(); });
      }
	}

	logout() {
		this.setAuthToken("SENPA_MOBILE");
		this.setStatus(false);
	}

	loginWithFB() {
		this.popupLogin(this.urlAuthFacebook, "Login with Facebook");
	}

	loginWithDiscord() {
		this.popupLogin(this.urlAuthDiscord, "Login with Discord");
	}
	
	popupLogin(url: string, name: string) {
		const strWindowFeatures =
         'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

      if (
         this.windowObjectReference === null ||
         this.windowObjectReference.closed
      ) {
         this.windowObjectReference = window.open(url, name, strWindowFeatures);
      } else if (this.previousUrl !== url) {
         this.windowObjectReference = window.open(url, name, strWindowFeatures);
         this.windowObjectReference.focus();
      } else {
         this.windowObjectReference.focus();
      }

      window.onmessage = (event: any) => this.receiveMessage(event);

      this.previousUrl = url;
	}

	initialise() : void { 
		this.loadAuthToken().then(() => {
			this.fetchProfileData().then(() => { this.updateProfilePanel(); }).catch(() => {
				console.error("invalid token");
			});
		}).catch(() => {
			console.warn("login token not stored in cookies or invalid");
		});
	}
	
}


export default new AccountData();