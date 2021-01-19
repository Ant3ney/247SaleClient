import Profile from './profiles/Profile';
import { ProfileData } from '../../utilities/Structures';
import Defaults from './profiles/Defaults';
import Player from '../../game/Player';

import AccountData from '../../entities/AccountData';

const $ = require('jquery');

import SkinModal from '../SkinModal';
import Emitter from '../../sockets/game/Emitter';

const Image_NoSkin = require('../../../resources/images/no-skin.png');

class Profiles {
	list: Profile[];
	tag: string;
	selected: number;

	storeName: string = 'senpaio:profiles';
	systemVersion: number = 1.01;

	config: any;

	constructor() {
		if (false) {
			this.config = {
				saveProfile: "http://localhost/account/save-profile",
				skinBase: "https://auth.senpa.io/u/",
			}
		} else {
			this.config = {
				saveProfile: "https://auth.senpa.io/account/save-profile",
				skinBase: "https://auth.senpa.io/u/",
			}
		}

		this.list = [];
		this.tag = '';
		this.selected = 0;

		SkinModal.changeOnSkinUpdate(this.onSkinUpdate.bind(this));
	}

	initialise(): void {
		this.attachEvents();
		this.createProfiles();
		// this.loadData();
		this.updateElements();
	}

	onSkinUpdate(id: number, newSkin: string) {
		const selected: Profile = this.list[this.selected];
		let skinUrl: string = newSkin;

		if (newSkin === 'no-skin') {
			skinUrl = Image_NoSkin;
		}

		if (id === 0) {
			$(`#skin-preview-1`).css('background-image', `url(${skinUrl})`);

			selected.skin1 = newSkin;
			Player.skin1 = newSkin;
		} else {
			$(`#skin-preview-2`).css('background-image', `url(${skinUrl})`);

			selected.skin2 = newSkin;
			Player.skin2 = newSkin;
		}


		this.saveProfileChange();
		this.saveData();
	}

	attachEvents(): void {
		const tag: HTMLInputElement = <HTMLInputElement>(
			document.getElementById('tag')
		);
		const nick: HTMLInputElement = <HTMLInputElement>(
			document.getElementById('nick')
		);
		const arrowPrev: HTMLDivElement = <HTMLDivElement>(
			document.getElementById('profile-previous')
		);
		const arrowNext: HTMLDivElement = <HTMLDivElement>(
			document.getElementById('profile-next')
		);

		const skinPreview1: HTMLDivElement = <HTMLDivElement>(
			document.getElementById('skin-preview-1')
		);
		const skinPreview2: HTMLDivElement = <HTMLDivElement>(
			document.getElementById('skin-preview-2')
		);

		tag.addEventListener('touchend', () => {
			const value: string | null = window.prompt('Tag', this.tag);
			if (value === null) return;

			tag.value = value;
			this.tag = value;
			Player.teamTag = value;
			this.saveData();
		});

		nick.addEventListener('touchend', () => {
			const selected: Profile = this.list[this.selected];
			const value: string | null = window.prompt('Nick', selected.nick);
			if (value === null) return;

			nick.value = value;
			selected.nick = value;
			Player.nick = value;
			this.saveData();

			Emitter.nick();
		});

		skinPreview1.addEventListener('touchend', () => {
			SkinModal.selectedSkinUnit = 0;
			SkinModal.show();
		});

		skinPreview2.addEventListener('touchend', () => {
			SkinModal.selectedSkinUnit = 1;
			SkinModal.show();
		});

		arrowPrev.addEventListener('touchend', () => {
			this.selected = (this.selected + 9) % 10;
			const profile: Profile = this.list[this.selected];
			Player.nick = profile.nick;
			Player.skin1 = profile.skin1;
			Player.skin2 = profile.skin2;
			this.updateElements();
			this.saveData();
		});

		arrowNext.addEventListener('touchend', () => {
			this.selected = (this.selected + 1) % 10;
			const profile: Profile = this.list[this.selected];
			Player.nick = profile.nick;
			Player.skin1 = profile.skin1;
			Player.skin2 = profile.skin2;
			this.updateElements();
			this.saveData();
		});
	}

	updateNick(value: string) {
		if (value === null) return;

		const nick: HTMLInputElement = <HTMLInputElement>(
			document.getElementById('nick')
		);

		const selected: Profile = this.list[this.selected];

		nick.value = value;
		selected.nick = value;
		Player.nick = value;
		this.saveData();
	}

	createProfiles(): void {
		this.list = [];
		for (let i: number = 0; i < 10; i++) {
			const defaultData: ProfileData = Defaults[i] || {};
			const nick: string = defaultData.nick || `Profile ${i + 1}`;
			const skin1: string =
				defaultData.skin1 || '';
			const skin2: string =
				defaultData.skin2 || '';
			const profile: Profile = new Profile(nick, skin1, skin2);
			this.list.push(profile);
		}
	}

	loadData(profileData: any): void {
		console.log(profileData);
		if (!profileData.skinProfiles || !profileData.skinRoutes)
			return;


		const skinRoutes = profileData.skinRoutes;
		this.createProfiles();
		for (const profileId of Object.keys(profileData.skinProfiles)) {
			const profile = profileData.skinProfiles[profileId];
			this.list[parseInt(profileId)].skin1 = this.config.skinBase + skinRoutes[profile.skinId1];
			this.list[parseInt(profileId)].skin2 = this.config.skinBase + skinRoutes[profile.skinId2];
		}

		console.log(this.list);

		const savedTag: string | null = localStorage.getItem('senpa-mob:tag');
		if (savedTag !== null) {
			this.tag = savedTag;
		}

		const savedSelected: string | null = localStorage.getItem(
			'senpa-mob:selected'
		);
		if (savedSelected !== null) {
			this.selected = +savedSelected;
		}

		const selectedProfile: Profile = this.list[this.selected];
		Player.teamTag = this.tag;
		Player.nick = selectedProfile.nick;
		Player.skin1 = selectedProfile.skin1;
		Player.skin2 = selectedProfile.skin2;

		selectedProfile.updateSkinPreviews();
		this.updatePreviewElements();
	}

	saveData(): void {
		localStorage.setItem('senpa-mob:tag', this.tag);
		localStorage.setItem('senpa-mob:selected', this.selected.toString());
		this.saveProfiles();
	}

	saveProfiles() {
		const storedData = {
			selected: this.selected,
			tag: this.tag,
			list: [],
			version: this.systemVersion
		};

		for (let i = 0; i < this.list.length; i++) {
			const profile = this.list[i];
			storedData.list[i] = {
				nick: profile.nick,
				skin1: profile.skin1,
				skin2: profile.skin2
			};
		}

		const dataString = JSON.stringify(storedData);
		localStorage.setItem(this.storeName, dataString);

	}

	updateElements(): void {
		const profile: Profile = this.list[this.selected];

		profile.select();

		this.updatePreviewElements();
	}

	updatePreviewElements() {
		let skin1 = (document.getElementById('skin-preview-1').style.backgroundImage.indexOf('no-skin.png') >= 0 ? 'none' : 'something');
		let skin2 = (document.getElementById('skin-preview-2').style.backgroundImage.indexOf('no-skin.png') >= 0 ? 'none' : 'something');

		if (skin1 == 'none' && $(`#skin-preview-1`).hasClass('has-image')) {
			while ($(`#skin-preview-1`).hasClass('has-image')) {
				$(`#skin-preview-1`).removeClass('has-image');
			}
		}
		if (skin2 == 'none' && $(`#skin-preview-2`).hasClass('has-image')) {
			while ($(`#skin-preview-2`).hasClass('has-image')) {
				$(`#skin-preview-2`).removeClass('has-image');
			}
		}

		if (skin1 != 'none' && !$(`#skin-preview-1`).hasClass('has-image')) {
			$(`#skin-preview-1`).addClass('has-image');
		}
		if (skin2 != 'none' && !$(`#skin-preview-2`).hasClass('has-image')) {
			$(`#skin-preview-2`).addClass('has-image');
		}
	}

	saveProfileChange() {
		if (AccountData.authToken != null) {
			const selectedProfile = this.list[this.selected];
			const profileBody = {
				profileId: this.selected,
				profile: {
					route1: selectedProfile.skin1.replace(this.config.skinBase, ""),
					route2: selectedProfile.skin2.replace(this.config.skinBase, "")
				}
			}
			this.saveProfileToAccount(profileBody);
		}
	}

	saveProfileToAccount(body) {
		console.log("packet to send:", body);

		fetch(this.config.saveProfile, {
			method: "POST",
			headers: { auth: AccountData.authToken, 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		})
			.then((data) => data.json())
			.then(data => {
				console.log("save result: ", data);
			})
	}
}

export default new Profiles();