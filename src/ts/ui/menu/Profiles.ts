import Profile from './profiles/Profile';
import { ProfileData } from '../../utilities/Structures';
import Defaults from './profiles/Defaults';
import Player from '../../game/Player';

class Profiles {
   list: Profile[];
   tag: string;
   selected: number;

   constructor() {
      this.list = [];
      this.tag = '';
      this.selected = 0;
   }

   initialise(): void {
      this.attachEvents();
      this.createProfiles();
      this.loadData();
      this.updateElements();
   }

   attachEvents(): void {
      const tag: HTMLInputElement = <HTMLInputElement>(
         document.getElementById('tag')
      );
      const nick: HTMLInputElement = <HTMLInputElement>(
         document.getElementById('nick')
      );
      const skin1: HTMLInputElement = <HTMLInputElement>(
         document.getElementById('skin1')
      );
      const skin2: HTMLInputElement = <HTMLInputElement>(
         document.getElementById('skin2')
      );
      const arrowPrev: HTMLDivElement = <HTMLDivElement>(
         document.getElementById('profile-previous')
      );
      const arrowNext: HTMLDivElement = <HTMLDivElement>(
         document.getElementById('profile-next')
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
      });

      skin1.addEventListener('touchend', () => {
         const selected: Profile = this.list[this.selected];
         const value: string | null = window.prompt(
            'Skin 1 URL',
            selected.skin1
         );
         if (value === null) return;

         skin1.value = value;
         selected.skin1 = value;
         Player.skin1 = value;
         this.saveData();
      });

      skin2.addEventListener('touchend', () => {
         const selected: Profile = this.list[this.selected];
         const value: string | null = window.prompt(
            'Skin 2 URL',
            selected.skin2
         );
         if (value === null) return;

         skin2.value = value;
         selected.skin2 = value;
         Player.skin2 = value;
         this.saveData();
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

   createProfiles(): void {
      for (let i: number = 0; i < 10; i++) {
         const defaultData: ProfileData = Defaults[i] || {};
         const nick: string = defaultData.nick || `Profile ${i + 1}`;
         const skin1: string =
            defaultData.skin1 || 'https://i.imgur.com/gDaGg7U.png';
         const skin2: string =
            defaultData.skin2 || 'https://i.imgur.com/gDaGg7U.png';
         const profile: Profile = new Profile(nick, skin1, skin2);
         this.list.push(profile);
      }
   }

   loadData(): void {
      const savedProfiles: string | null = localStorage.getItem(
         'senpa-mob:profiles'
      );
      if (savedProfiles !== null) {
         try {
            const data: ProfileData[] = JSON.parse(savedProfiles);
            for (let i: number = 0; i < 10; i++) {
               const savedProfile: ProfileData | undefined = data[i];
               if (savedProfile === undefined) continue;
               const profile: Profile = this.list[i];
               if (savedProfile.nick) profile.nick = savedProfile.nick;
               if (savedProfile.skin1) profile.skin1 = savedProfile.skin1;
               if (savedProfile.skin2) profile.skin2 = savedProfile.skin2;
            }
         } catch {
            console.warn(
               'Saved profiles data was found corrupt. Cleaning up...'
            );
            localStorage.removeItem('senpa-mob:profiles');
         }
      }

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
   }

   saveData(): void {
      let profiles: ProfileData[] = [];
      const profile: Profile = this.list[this.selected];
      const savedProfiles: string | null = localStorage.getItem(
         'senpa-mob:profiles'
      );

      if (savedProfiles !== null) {
         try {
            profiles = JSON.parse(savedProfiles);
         } catch {
            console.warn(
               'Saved profiles data was found corrupt. Cleaning up...'
            );
            localStorage.removeItem('senpa-mob:profiles');
         }
      }

      const profileData: ProfileData = {
         nick: profile.nick,
         skin1: profile.skin1,
         skin2: profile.skin2,
      };
      profiles[this.selected] = profileData;

      localStorage.setItem('senpa-mob:profiles', JSON.stringify(profiles));
      localStorage.setItem('senpa-mob:tag', this.tag);
      localStorage.setItem('senpa-mob:selected', this.selected.toString());
   }

   updateElements(): void {
      const profile: Profile = this.list[this.selected];
      const tag: HTMLInputElement = <HTMLInputElement>(
         document.getElementById('tag')
      );
      const nick: HTMLInputElement = <HTMLInputElement>(
         document.getElementById('nick')
      );
      const skin1: HTMLInputElement = <HTMLInputElement>(
         document.getElementById('skin1')
      );
      const skin2: HTMLInputElement = <HTMLInputElement>(
         document.getElementById('skin2')
      );

      tag.value = this.tag;
      nick.value = profile.nick;
      skin1.value = profile.skin1;
      skin2.value = profile.skin2;
   }
}

export default new Profiles();
