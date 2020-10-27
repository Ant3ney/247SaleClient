import Time from "../../../utilities/Time";

class NickCache {
  lastUseTime: number;
  pool: HTMLCanvasElement[];
  text: string;
  font: string;
  shadow: boolean;
  color: string;
  shadowColor: string;
  canvas: HTMLCanvasElement[] | false[];

  constructor() {
    this.lastUseTime = 0;
    this.pool = [
      document.createElement('canvas'),
      document.createElement('canvas'),
      document.createElement('canvas'),
      document.createElement('canvas'),
      document.createElement('canvas')
    ];

    this.text = '';
    this.font = 'ubuntu';
    this.shadow = false;
    this.color = '#ffffff';
    this.shadowColor = '#000000';

    this.canvas = [false, false, false, false, false];
  }

  setText(value: string): void {
    if (this.text === value) return;
    this.text = value;
    this.resetCache();
  }

  setFont(value: string): void {
    if (this.font === value) return;
    this.font = value;
    this.resetCache();
  }

  setShadow(value: boolean): void {
    if (this.shadow === value) return;
    this.shadow = value;
    this.resetCache();
  }

  setColor(value: string): void {
    if (this.color === value) return;
    this.color = value;
    this.resetCache();
  }

  setShadowColor(value: string): void {
    if (this.shadowColor === value) return;
    this.shadowColor = value;
    this.resetCache();
  }

  getCanvas(size: number): HTMLCanvasElement | false {
    const quality: number = this.getQuality(size);
    this.lastUseTime = Time.now;
    return this.canvas[quality];
  }

  resetCache(): void {
    this.canvas = [false, false, false, false, false];
  }

  renderCanvas(size: number) {
    const quality: number = this.getQuality(size);
    const canvas: HTMLCanvasElement = this.pool[quality];
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    const baseSize: number = (quality + 1) * 300 * 0.8;
    const fontSize: number = baseSize * 0.3;
    const strokeSize: number = 8 * (quality + 1);

    ctx.font = `500 ${ fontSize | 0 }px ${ this.font }`;
    const width: number = ctx.measureText(this.text).width;

    canvas.height = (fontSize | 0) + strokeSize;
    canvas.width = (width | 0) + strokeSize;

    ctx.font = `500 ${ fontSize | 0 }px ${ this.font }`;
    ctx.textBaseline = `middle`;

    if (this.shadow) {
      ctx.strokeStyle = this.shadowColor;
      ctx.lineWidth = strokeSize;
      ctx.strokeText(this.text, strokeSize >> 1, canvas.height >> 1);
    }

    ctx.fillStyle = this.color;
    ctx.fillText(this.text, strokeSize >> 1, canvas.height >> 1);

    this.canvas[quality] = canvas;
    this.lastUseTime = Time.now;

    return canvas;
  }

  getQuality(size: number): number {
    return Math.min(size / 300, 4) | 0;
  }
}

export default NickCache;
