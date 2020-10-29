class Profile {
	public experience: number = 0;
	public favorites: Array<number> = [];
	
	constructor() {
		
	}
}

class AccountData {
	public authToken: string = 'SENPA_MOBILE'; //'SENPA_MOBILE';
	public profile: Profile = new Profile();
	
	constructor() {
		
	};
	
	
}


export default new AccountData();