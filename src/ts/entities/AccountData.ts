import { Profile } from '../utilities/Structures';
// @ts-ignore
import postMessage from '../ui/huds/postMessage.js';

const cookie = require('cookiejs');

class AccountData {
    public authToken: string = '';
    public profile: Profile = new Profile();

    public loginStatus: boolean = false;

    private errors: Array<number> = [0, 1, 2];

    private cookieDuration: number = 365;
    public onLogout: Function = () => { };
    public onLogin: Function = () => { };

    fetchProfileData(urlAuthAccount: string) {
        console.log('-> Fetching profile data');

        return new Promise(async (accept, reject) => {
            if (this.authToken) {
                postMessage.send('authToken below');
                postMessage.send(this.authToken);
            } else {
                postMessage.send('authToken is undefined or null');
            }

            const data = await fetch(urlAuthAccount, {
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
}

export default new AccountData();