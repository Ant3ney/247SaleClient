const cookie = require('cookiejs');

import Experience from './../game/Experience';
// @ts-ignore
import postMessage from './huds/postMessage.js';

class SkinProfile {
	public skinId1: number = 0;
	public skinId2: number = 0;
}

class Profile {
	public experience: number = 0;
	public favorites: Array<number> = [];
	public realName: string = "";
	public id: number = 0;
	public avatarURL: string = "";

	public skinRoutes: Map<number, string> = new Map<number, string>();
	public skinProfiles: Map<number, SkinProfile> = new Map<number, SkinProfile>();
	
	constructor() {
		
	}
}

class AccountData {
	public authToken: string = 'SENPA_MOBILE'; //'SENPA_MOBILE';
	public profile: Profile = new Profile();
	public postMessage: any = postMessage;
	private urlAuthAccount: string = "";
	private urlAuthDiscord: string = "";
	private urlAuthFacebook: string = "";

	public onLogin: any = undefined;
	public onLogout: any = undefined;

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
			if(this.authToken){
				this.postMessage.send("authToken below");
				this.postMessage.send(this.authToken);
			}
			else{
				this.postMessage.send("authToken is undefined or null");
			}
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
			  if (profile.error){
				  postMessage.send("Something went wrong in acout details in fetchProfileData");
				  postMessage.send(profile.error.message);
				return reject(profile.error);
			  }
			  this.profile = <Profile>profile;
			  this.postMessage.send(this.profile.avatarURL);
			  accept(this);
			})
			.catch(err => {
			  this.postMessage.send("Something went wron. In Acound data.fetchProfileData");
			  postMessage.send("this.auth = " + this.authToken);
			  this.postMessage.send(err.message);
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

	setSmallRealName(name: string){
		const nameElem = document.getElementById("small-login-panel-name");
		if (nameElem === null || nameElem === undefined)
			return;
		nameElem.innerHTML = name; 
	}

	setRealName(name: string) {
		const nameElem = document.getElementById("login-panel-name");
		if (nameElem === null || nameElem === undefined)
			return;
		nameElem.innerHTML = name;
	}

	setLv(lv: number){
		//small-login-panel-lv
		const lvElem = document.getElementById('login-panel-lv');
		if(lvElem === null || lvElem === undefined)
			return;
		lvElem.innerHTML = ("Level " + lv);
	}

	setSmallLv(lv: number){
		//small-login-panel-lv
		const lvElem = document.getElementById('small-login-panel-lv');
		if(lvElem === null || lvElem === undefined)
			return;
		lvElem.innerHTML = ("Level " + lv);
	}

	setSmallProfilePicture(url: string) {
		const picElem = document.getElementById("small-pf-avatar");
		if (picElem === null || picElem === undefined)
			return;

		picElem.setAttribute('src', url);
	}

	setProfilePicture(url: string) {
		const picElem = document.getElementById("pf-avatar");
		if (picElem === null || picElem === undefined)
			return;

		picElem.setAttribute('src', url);
	}

	setStatus(isLoggedIn: boolean) {
		console.log("set login status", isLoggedIn);
		const zeroLoginForm = document.getElementById("login-form-zero"),
			  secondLoginForm = document.getElementById("login-form-second"),
			  thirdLoginForm: HTMLButtonElement = <HTMLButtonElement>document.getElementById("login-form-third");
		this.loginStatus = isLoggedIn;
		if (zeroLoginForm){
			zeroLoginForm.style.display = isLoggedIn ? "none" : "block";
		}
		if (secondLoginForm){
			secondLoginForm.style.display =  isLoggedIn ? "block" : "none";
		}
		if (thirdLoginForm){
			if(thirdLoginForm.style.display !== "none"){
				thirdLoginForm.style.display = "none";
			}
		}
	}

	showLargeProfilePanel(){
		const smallProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#login-form-second');
		const largeProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#login-form-third');
		if(smallProfilePanel.style.display !== 'none'){
			smallProfilePanel.style.display = 'none';
		}
		if(largeProfilePanel.style.display !== 'block'){
			largeProfilePanel.style.display = 'block';
		}
		this.updateLargeProfilePanel();
	}

	showSmallProfilePanel(){
		const smallProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#login-form-second');
		const largeProfilePanel: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#login-form-third');
		if(smallProfilePanel.style.display !== 'block'){
			smallProfilePanel.style.display = 'block';
		}
		if(largeProfilePanel.style.display !== 'none'){
			largeProfilePanel.style.display = 'none';
		}
		this.updateSmallProfilePanel();
	}

	updateLargeProfilePanel(){
		const level = Experience.levelFromExp(this.profile.experience);
		const expForLevel = Experience.realExpGainRequiredForLevelUp(level);
		this.setLv(level);
		this.setRealName(this.profile.realName);
		this.setProfilePicture(this.profile.avatarURL);
		const xpText = document.getElementById('xp-text');
		if (xpText)
			xpText.innerHTML = this.profile.experience.toString() + " / " + expForLevel.toString() + " XP";
	}

	updateSmallProfilePanel() {
		const level = Experience.levelFromExp(this.profile.experience);
		const expForLevel = Experience.realExpGainRequiredForLevelUp(level);
		this.setStatus(true);
		this.setSmallLv(level);
		this.setSmallRealName(this.profile.realName);
		this.setSmallProfilePicture(this.profile.avatarURL);

		const xpText = document.getElementById('xp-text');
		if (xpText)
			xpText.innerHTML = this.profile.experience.toString() + " / " + expForLevel.toString() + " XP";
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

	removeAuthToken(){
		cookie.set("auth", "");
	}

	receiveMessage(event: any) {
		let token;
		if(process.env.NODE_ENV !== 'development'){
			token = (event.data).replace('token:', '');
		}
		else{
			token = event.data.token;
		}		

      if (token && token != undefined) {
		 this.postMessage.send("Setting auth stuff");
		 this.setAuthToken(token);
		 this.fetchProfileData()
		 .then(() => {
			 //ToDo invistagate code around here 
			this.updateSmallProfilePanel();
			this.onLogin(); 
		})
		.catch((err) => {
			console.error(err)
		});
      }
	}

	logout() {
		this.setAuthToken("SENPA_MOBILE");
		this.setStatus(false);
		this.removeAuthToken();

		this.onLogout();
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

      this.previousUrl = url;
	}

	initialise() : void {
		window.onmessage = (event: any) => this.receiveMessage(event);
		this.loadAuthToken()
		.then(() => {
			this.fetchProfileData()
			.then(() => { 
				this.updateSmallProfilePanel();
				this.onLogin();  
			})
			.catch(() => {
				console.error("invalid token");
				this.postMessage.test("Invalid token");
				this.postMessage.send("Req:NativeAuthToken");
			});
		})
		.catch(() => {
			console.warn("login token not stored in cookies or invalid");
			this.postMessage.send("Req:NativeAuthToken");
		});
	}
	
}


export default new AccountData();