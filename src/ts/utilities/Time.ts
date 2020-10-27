class Time {
  now: number = 0.0;

  update(): void {
    this.now = performance.now();
  }
}

export default new Time();
