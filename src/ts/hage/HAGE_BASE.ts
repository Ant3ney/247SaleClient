class HAGE_BASE {
  canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('screen');
  }

  initialise(): void {}

  run(): void {}
}

export default HAGE_BASE;
