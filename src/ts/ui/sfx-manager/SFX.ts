import Settings from "../../game/Settings";

class SFX {
  stream: HTMLAudioElement;

  constructor(url: string) {
    this.stream = new Audio(url);
  }

  play() : void {
    if (!<boolean>Settings.gameSounds) return;
    this.stream.currentTime = 0.0;
    this.stream.play();
  }

  stop(): void {
    this.stream.pause();
  }
}

export default SFX;
