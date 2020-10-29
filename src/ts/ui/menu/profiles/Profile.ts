const $ = require('jquery');
const Image_NoSkin: string = 'https://senpa.io/web/resources/src/resources/img/no-skin.png';
import Player from '../../../game/Player';

class Profile {
	nick: string;
	skin1: string;
	skin2: string;
	
	constructor(nick = '', skin1 = '', skin2 = '') {
		this.nick = nick;
		this.skin1 = skin1;
		this.skin2 = skin2;
	}

	updateSkinPreviews() {
		const skin1 = this.skin1 || Image_NoSkin;
		const skin2 = this.skin2 || Image_NoSkin;
		$(`#skin-preview-1`).css('background-image', `url(${skin1})`);
		$(`#skin-preview-2`).css('background-image', `url(${skin2})`);
	}

	select() {
		const name: HTMLInputElement = <HTMLInputElement> (
			document.getElementById('nick')
		);
		const tag: HTMLInputElement = <HTMLInputElement> (
			document.getElementById('tag')
		);
		
		Player.nick = this.nick;
		Player.skin1 = this.skin1;
		Player.skin2 = this.skin2;
		name.value = this.nick;
		tag.value = Player.teamTag;
		
		this.updateSkinPreviews();
	}
}

export default Profile;