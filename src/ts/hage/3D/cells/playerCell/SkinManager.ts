import Skin from "./skins/Skin";
import { Sprite } from "pixi.js";
import Time from "../../../../utilities/Time";

class SkinManager {
  skins: Map<string, Skin>;
  downloading: Map<string, boolean>;
  fallbacks: {
    readonly noSkin: string,
    readonly errorSkin: string
  };

  constructor() {
    this.skins = new Map();
    this.downloading = new Map();
    this.fallbacks = {
      noSkin: require('../../../../../resources/images/no-skin.png'),
      errorSkin: require('../../../../../resources/images/error-skin.png')
    };
  }

  initialise(): void {
    this.download(this.fallbacks.noSkin);
    this.download(this.fallbacks.errorSkin);
  }

  reset(): void {
    const noSkin: Skin | undefined = this.skins.get(this.fallbacks.noSkin);
    const errorSkin: Skin | undefined = this.skins.get(this.fallbacks.errorSkin);

    for (const [url, skin] of this.skins) {
      const inUse: boolean = Time.now - skin.lastUsed < 2E3;
      if (skin === noSkin || skin === errorSkin || inUse) {
        skin.reset();
      } else {
        skin.destroy();
        this.skins.delete(url);
      }
    }
  }

  get(url: string): Sprite | false {
    if (url === 'no-skin') return false;
    if (!url) return false;

    const skin: Skin | undefined = this.skins.get(url);
    if (skin !== undefined) return skin.getSprite();

    const isDownloading: boolean = this.downloading.has(url);
    if (!isDownloading) this.download(url);
    return false;
  }

  download(url: string): void {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
      const size: number = 512;

      canvas.width = size;
      canvas.height = size;

      ctx.beginPath();
      ctx.arc(size >> 1, size >> 1, size >> 1, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      if (image.width && image.height) ctx.drawImage(image, 0, 0, size, size);

      const skin: Skin = new Skin(canvas);
      this.downloading.delete(url);
      this.skins.set(url, skin);

      image.onload = null;
      image.onerror = null;
    };
    image.onerror = () => {
      const errorSkin: Skin | undefined = this.skins.get(this.fallbacks.errorSkin);
      if (errorSkin !== undefined) {
        this.downloading.delete(url);
        this.skins.set(url, errorSkin);
        errorSkin.lastUsed = Time.now;
      }

      image.onload = null;
      image.onerror = null;
    };
    image.src = url;
    this.downloading.set(url, true);
  }
}

export default new SkinManager();
