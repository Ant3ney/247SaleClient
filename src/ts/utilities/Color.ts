class Color {
  static rgb2hex(r: number, g: number, b: number): string {
    const colorHexInt: number = 0x1000000 | (r << 16) | (g << 8) | b;
    const colorHexString: string = '#' + colorHexInt.toString(16).substring(1);
    return colorHexString;
  }

  static randomColor(): string {
    const rgb: [number, number, number] = [255, Math.random() * 100 | 0, Math.random() * 256 | 0];
    rgb.sort(() => Math.random() - 0.5);
    return Color.rgb2hex(...rgb);
  }
}

export default Color;
