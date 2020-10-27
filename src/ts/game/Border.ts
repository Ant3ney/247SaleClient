class Border {
  left: number;
  top: number;
  right: number;
  bottom: number;

  constructor() {
    this.left = 0;
    this.top = 0;
    this.right = 14000;
    this.bottom = 14000;
  }

  update(left: number, top: number, right: number, bottom: number): void {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
}

export default new Border();
