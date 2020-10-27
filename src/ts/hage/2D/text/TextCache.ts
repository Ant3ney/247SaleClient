import NickCache from './NickCache';
import MassCache from './MassCache';
import Time from '../../../utilities/Time';

class TextCache {
  nickCaches: Map<string, NickCache>;
  massCaches: Map<number, MassCache>;
  maxCacheLife: number;
  nickCachePool: NickCache[];
  massCachePool: MassCache[];

  constructor() {
    this.nickCaches = new Map();
    this.massCaches = new Map();

    this.maxCacheLife = 2E3;

    this.nickCachePool = [];
    this.massCachePool = [];
  }

  nick(nick: string, color: string, shadow: boolean, radius: number): HTMLCanvasElement | false {
    if (nick.length < 1) return false;

    if (radius < 34) return false;

    const nickCache: NickCache = this.nickCaches.get(nick) || this.newNickCache(nick);
    
    nickCache.setFont('ubuntu');
    nickCache.setShadow(shadow);
    nickCache.setColor(color);
    nickCache.setShadowColor('#000000');
    nickCache.setText(nick);

    const canvas = nickCache.getCanvas(radius);
    return canvas || nickCache.renderCanvas(radius);
  }

  newNickCache(nick: string): NickCache {
    const nickCache: NickCache = this.nickCachePool.shift() || new NickCache();
    this.nickCaches.set(nick, nickCache);
    return nickCache;
  }

  mass(id: number, mass: string, color: string, shadow: boolean, radius: number): HTMLCanvasElement | false {
    if (radius < 34) return false;

    const massCache: MassCache = this.massCaches.get(id) || this.newMassCache(id);

    massCache.setFont('ubuntu');
    massCache.setShadow(shadow);
    massCache.setColor(color);
    massCache.setShadowColor('#000000');
    massCache.setSize(radius);
    massCache.setText(mass);

    return massCache.getCanvas();
  }

  newMassCache(id: number): MassCache {
    const massCache: MassCache = this.massCachePool.shift() || new MassCache();
    this.massCaches.set(id, massCache);
    return massCache;
  }

  cleaner(): void {
    const time: number = Time.now;

    for (const [nick, nickCache] of this.nickCaches) {
      if (time - nickCache.lastUseTime < this.maxCacheLife) continue;
      this.nickCaches.delete(nick);
      this.nickCachePool.push(nickCache);
    }

    for (const [id, massCache] of this.massCaches) {
      if (time - massCache.lastUseTime < this.maxCacheLife) continue;
      this.massCaches.delete(id);
      this.massCachePool.push(massCache);
    }
  }
}

export default new TextCache();
