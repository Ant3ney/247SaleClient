import Time from "../../../utilities/Time";

class MassCache {
  lastUseTime: number;
  lastTextUpdateTime: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  size: number;
  text: string;
  font: string;
  shadow: boolean;
  color: string;
  shadowColor: string;
  isTainted: boolean;

  constructor() {
    this.lastUseTime = 0;
    this.lastTextUpdateTime = 0;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;

    this.size = 30;
    this.text = 'Text';
    this.font = 'Arial';
    this.shadow = false;
    this.color = '#ffffff';
    this.shadowColor = '#000000';

    this.isTainted = false;
  }

  get updateInterval(): number {
    return 500;
  }

  setSize(value: number): void {
    if (this.size / value < 0.9 || value / this.size < 0.8) {
      this.size = value;
      this.isTainted = true;
    }
  }

  setText(value: string): void {
    const currentTime: number = Time.now;
    const isOld: boolean = currentTime - this.lastTextUpdateTime > this.updateInterval;
    if (this.text !== value && isOld) {
      this.text = value;
      this.lastTextUpdateTime = currentTime;
      this.isTainted = true;
    }
  }

  setFont(value: string): void {
    if (this.font === value) return;
    this.font = value;
    this.isTainted = true;
  }

  setShadow(value: boolean): void {
    if (this.shadow === value) return;
    this.shadow = value;
    this.isTainted = true;
  }

  setColor(value: string): void {
    if (this.color === value) return;
    this.color = value;
    this.isTainted = true;
  }

  setShadowColor(value: string): void {
    if (this.shadowColor === value) return;
    this.shadowColor = value;
    this.isTainted = true;
  }

  render(): void {
    const canvas: HTMLCanvasElement = this.canvas;
    const ctx: CanvasRenderingContext2D = this.ctx;
    const strokeSize: number = 55 * (this.size / 1500) | 0;
    const fontSize: number = this.size * 0.3;
    const testFontSize: number = Math.min(fontSize, 50);

    ctx.font = `500 ${testFontSize | 0}px ${this.font}`;
    const testWidth: number = ctx.measureText(this.text).width;

    canvas.height = (fontSize | 0) + strokeSize;
    canvas.width = ((testWidth * (fontSize / testFontSize)) | 0) + strokeSize;

    ctx.font = `500 ${fontSize | 0}px ${this.font}`;
    ctx.textBaseline = `middle`;

    if (this.shadow) {
      ctx.strokeStyle = this.shadowColor;
      ctx.lineWidth = strokeSize;
      ctx.strokeText(this.text, strokeSize >> 1, canvas.height >> 1);
    }

    ctx.fillStyle = this.color;
    ctx.fillText(this.text, strokeSize >> 1, canvas.height >> 1);

    this.isTainted = false;
  }

  getCanvas(): HTMLCanvasElement {
    if (this.isTainted) this.render();
    this.lastUseTime = Time.now;
    return this.canvas;
  }
}

export default MassCache;
