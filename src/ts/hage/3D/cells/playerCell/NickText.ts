import NickCache from "./nickText/NickCache";
import Time from "../../../../utilities/Time";
import { Sprite } from "pixi.js";
import Settings from "../../../../game/Settings";

class NickText {
  cacheMap: Map<string, NickCache>;

  constructor() {
    this.cacheMap = new Map();
  }

  reset(): void {
    for (const [nick, nickCache] of this.cacheMap) {
      if (Time.now - nickCache.lastUsed < 5E3) {
        nickCache.reset();
      } else {
        nickCache.destroy();
        this.cacheMap.delete(nick);
      }
    }
  }

  get(nick: string): Sprite {
    const nickCache: NickCache = this.cacheMap.get(nick) || this.newNickCache(nick);
    return nickCache.getSprite();
  }

  newNickCache(nick: string): NickCache {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    const strokeSize: number = <boolean>Settings.nickStroke ? 20 : 0;

    ctx.font = '500 32px Ubuntu';

    const height = 128 + (strokeSize * 2);
    const width = ctx.measureText(nick).width * 4 + (strokeSize * 2) | 0;

    canvas.height = height;
    canvas.width = width;

    ctx.font = '500 128px Ubuntu';
    ctx.textBaseline = 'middle';
    if (strokeSize > 0) {
      ctx.lineWidth = strokeSize;
      ctx.strokeStyle = '#000000';
      ctx.strokeText(nick, strokeSize, height >> 1);
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillText(nick, strokeSize, height >> 1);

    const nickCache: NickCache = new NickCache(canvas);
    this.cacheMap.set(nick, nickCache);
    return nickCache;
  }
}

export default new NickText();
