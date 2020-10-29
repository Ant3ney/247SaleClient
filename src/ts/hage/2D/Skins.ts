class Skins {
  downloaded: Map<string, HTMLCanvasElement>;
  downloading: Map<string, HTMLImageElement>;
  fallbacks: {
    readonly noSkin: string,
    readonly errorSkin: string
  };

  constructor() {
    this.downloaded = new Map();
    this.downloading = new Map();
    this.fallbacks = {
      noSkin: require('../../../resources/images/no-skin.png'),
      errorSkin: require('../../../resources/images/error-skin.png')
    };
    this.initialise();
  }

  initialise(): void {
    this.download(this.fallbacks.noSkin);
    this.download(this.fallbacks.errorSkin);
  }

  get(url: string): HTMLCanvasElement | false {
    if (url === 'no-skin') return false;
    if (!url) return false;

    const skin: HTMLCanvasElement | undefined = this.downloaded.get(url);
    if (skin !== undefined) return skin;

    const isDownloading: boolean = this.downloading.has(url);
    if (!isDownloading) this.download(url);
    return false;
  }

  download(url: string): void {
    const skin: HTMLImageElement = new Image();
    skin.crossOrigin = 'anonymous';
    skin.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
      const size: number = 512;

      canvas.width = size;
      canvas.height = size;

      ctx.beginPath();
      ctx.arc(size >> 1, size >> 1, size >> 1, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      if (skin.width && skin.height) ctx.drawImage(skin, 0, 0, size, size);

      this.downloading.delete(url);
      this.downloaded.set(url, canvas);

      skin.onload = null;
      skin.onerror = null;
    };
    skin.onerror = () => {
      const errorSkin: HTMLCanvasElement | undefined = this.downloaded.get(this.fallbacks.errorSkin);
      if (errorSkin !== undefined) {
        this.downloading.delete(url);
        this.downloaded.set(url, errorSkin);
      }

      skin.onload = null;
      skin.onerror = null;
    };
    skin.src = url;
    this.downloading.set(url, skin);  
  }
}

export default new Skins();
