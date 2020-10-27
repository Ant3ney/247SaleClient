import UI from "../../../UI";

interface SettingInfo {
  type: string,
  category: 'game' | 'theme'
  displayName: string,
  default: any,
  onChange?: Function
};

interface ToggleInfo extends SettingInfo {
  default: boolean
};

interface ColorpickerInfo extends SettingInfo {
  default: string
};

interface ChoiceBoxInfo extends SettingInfo {
  default: string,
  choices: { [key: string]: string }
};

interface RangeInfo extends SettingInfo {
  default: number,
  min: number,
  max: number,
  step: number
};

export { 
  SettingInfo,
  ToggleInfo,
  ColorpickerInfo,
  ChoiceBoxInfo,
  RangeInfo
};

const List: { [key: string]: ToggleInfo | ColorpickerInfo | ChoiceBoxInfo | RangeInfo } = {
  // game
  useWebGL: {
    type: 'toggle',
    category: 'game',
    displayName: 'Use WebGL renderer (requires reload)',
    default: false,
    onChange: (value: boolean) => {
      const saved: string | null = localStorage.getItem('senpa-mob:WebGL');
      if (value) localStorage.setItem('senpa-mob:WebGL', 'OK');
      else localStorage.removeItem('senpa-mob:WebGL');
      if (saved !== (value ? 'OK' : null)) location.reload();
    }
  },
  hudsScale: {
    type: 'choice-box',
    category: 'game',
    displayName: 'Huds scale',
    default: '1.0',
    choices: {
      '0.75': '0.75x',
      '0.85': '0.85x',
      '1.0': '1.0x',
      '1.15': '1.15x',
      '1.3': '1.3x'
    },
    onChange: (value: string) => {
      UI.userScale = +value;
      UI.scale();
    }
  },
  autoZoom: {
    type: 'toggle',
    category: 'game',
    displayName: 'Auto zoom',
    default: false,
    onChange: (value: boolean) => {
      const zoomIn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('zoom-in');
      const zoomOut: HTMLButtonElement = <HTMLButtonElement>document.getElementById('zoom-out');
      zoomIn.style.display = value ? 'none' : 'flex';
      zoomOut.style.display = value ? 'none' : 'flex';
    }
  },
  directionMarkerType: {
    type: 'choice-box',
    category: 'game',
    displayName: 'Direction marker type',
    default: 'arrow',
    choices: {
      off: 'Off',
      lines: 'Lines',
      arrow: 'Arrow'
    }
  },
  showSectors: {
    type: 'toggle',
    category: 'game',
    displayName: 'Show sectors',
    default: true
  },
  showSkins: {
    type: 'choice-box',
    category: 'game',
    displayName: 'Show skins',
    default: 'team',
    choices: {
      off: 'Off',
      own: 'Own',
      team: 'Team',
      all: 'All'
    },
    onChange: (value: string) => {
      const toggleSpan: HTMLSpanElement = <HTMLSpanElement>document.querySelector('#skins-toggle span');
      toggleSpan.innerText = `Skin\n${value === 'off' ? value : 'on'}`;
    }
  },
  dPadPosition: {
    type: 'choice-box',
    category: 'game',
    displayName: 'D-Pad position',
    default: 'right',
    choices: {
      left: 'Left',
      right: 'Right'
    },
    onChange: (value: string) => {
      const dpad: HTMLDivElement = <HTMLDivElement>document.getElementById('d-pad');
      dpad.setAttribute('position', value);
    }
  },
  dPadButton4: {
    type: 'choice-box',
    category: 'game',
    displayName: 'D-Pad button 4 split macro',
    default: 'x2',
    choices: {
      x2: 'x2',
      x3: 'x3',
      x4: 'x4',
      x5: 'x5',
      x6: 'x6',
      x8: 'x8'
    },
    onChange: (value: string) => {
      const dpad: HTMLDivElement = <HTMLDivElement>document.querySelector('#d-pad-d span');
      dpad.innerText = value;
    }
  },
  gameSounds: {
    type: 'toggle',
    category: 'game',
    displayName: 'Game sounds',
    default: true
  },
  stopOnRelease: {
    type: 'toggle',
    category: 'game',
    displayName: 'Stop on release',
    default: false
  },
  directionOnTouch: {
    type: 'toggle',
    category: 'game',
    displayName: 'Direction on touch',
    default: false
  },
  // theme
  nickStroke: {
    type: 'toggle',
    category: 'theme',
    displayName: 'Nick stroke',
    default: true
  },
  massStroke: {
    type: 'toggle',
    category: 'theme',
    displayName: 'Mass stroke',
    default: true
  },
  borderColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Border color',
    default: '#FF4093'
  },
  sectorColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Sector color',
    default: '#222222'
  },
  virusColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Virus color',
    default: '#555555'
  },
  virusBorderColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Virus border color',
    default: '#FF4093'
  },
  singleColorPellets: {
    type: 'toggle',
    category: 'theme',
    displayName: 'Single color pellets',
    default: false
  },
  pelletColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Pellet color',
    default: '#FF4093'
  },
  activeCellBorderColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Active cell border color',
    default: '#FF4093'
  },
  joystickColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Joystick color',
    default: '#C8C8C8',
    onChange: (value: string) => {
      const hexInt: number = parseInt(value.replace('#', '0x'));
      const rgb = [(hexInt & 0xff0000) >> 16, (hexInt & 0x00ff00) >> 8, (hexInt & 0x0000ff) >> 0];
      const joystick: HTMLDivElement = <HTMLDivElement>document.getElementById('joystick');
      joystick.style.backgroundColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`;
    }
  },
  joystickBallColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Joystick ball color',
    default: '#0A0A0A',
    onChange: (value: string) => {
      const hexInt: number = parseInt(value.replace('#', '0x'));
      const rgb = [(hexInt & 0xff0000) >> 16, (hexInt & 0x00ff00) >> 8, (hexInt & 0x0000ff) >> 0];
      const joystickBall: HTMLDivElement = <HTMLDivElement>document.getElementById('joystick-ball');
      joystickBall.style.backgroundColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`;
    }
  },
  directionLinesColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Direction lines color',
    default: '#FFFFFF'
  },
  directionArrowColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Direction arrow color',
    default: '#FFFFFF'
  },
  backgroundColor: {
    type: 'colorpicker',
    category: 'theme',
    displayName: 'Background color',
    default: '#111111',
    onChange: (value: string) => {
      document.body.style.backgroundColor = value;
    }
  }
};

export default List;
