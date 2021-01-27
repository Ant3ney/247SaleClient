import UI from "../../../UI";
import leaderboard from '../../huds/Leaderboard';
import Minimap from '../../huds/Minimap';

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
 // showSectors: {
 //   type: 'toggle',
 //   category: 'game',
 //   displayName: 'Show sectors',
 //   default: false
//  },
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
  nickStroke: {
    type: 'toggle',
    category: 'game',
    displayName: 'Nick stroke',
    default: true
  },
  massStroke: {
    type: 'toggle',
    category: 'game',
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
    category: 'game',
    displayName: 'Single color pellets',
    default: false
  },
  lightMode: {
    type: 'toggle',
    category: 'theme',
    displayName: 'Light mode',
    default: false,
    onChange: (lightMode: boolean) => {
      //Settings elements
      let settingsHeaderEle: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('header')[1];
      let settingTitle: HTMLDivElement = <HTMLDivElement>settingsHeaderEle.getElementsByTagName('span')[0];
      let settingsContainer: HTMLDivElement = <HTMLDivElement>document.querySelector('#settings-menu .container');
      let settingItemsContainer: HTMLDivElement = <HTMLDivElement>document.querySelector('#settings-menu .setting-items');
      let settingItems = document.querySelectorAll('#settings-menu .item');
      let settingItem: HTMLDivElement;
      let settingItemTitles = document.querySelectorAll('#settings-menu .title');
      let settingItemTitle: HTMLDivElement;

      //Hud and canvas elements
      let canvas: HTMLDivElement = <HTMLDivElement>document.getElementById('screen');
      let pauseButton: HTMLDivElement = <HTMLDivElement>document.querySelector('#back-to-menu i');
      let mapToggle: HTMLDivElement = <HTMLDivElement>document.querySelector('#minimap-toggle i');
      let leaderbordButton: HTMLDivElement = <HTMLDivElement>document.querySelector('#leaderboard-toggle .lBord-icon');
      let innerLeaderbordLogo: HTMLDivElement = <HTMLDivElement>document.querySelector('#lBord .lBord-icon');
      let zoomInHud: HTMLDivElement = <HTMLDivElement>document.querySelector('#zoom-in i');
      let zoomOutHud: HTMLDivElement = <HTMLDivElement>document.querySelector('#zoom-out i');
      let dPadA: HTMLImageElement = <HTMLImageElement>document.querySelector('#d-pad-a img');
      let joystickBG: HTMLImageElement = <HTMLImageElement>document.querySelector('#joystick');
      let joystickBall: HTMLImageElement = <HTMLImageElement>document.querySelector('#joystick-ball');
      //item
      if(lightMode){
        //#region setting changes
          settingsHeaderEle.style.backgroundColor = 'white';
          settingTitle.style.color = 'black';
          settingsContainer.style.backgroundColor = 'white';
          settingItemsContainer.style.backgroundColor = 'white';
          for(let i = 0; i < settingItems.length; i++){
            settingItem = <HTMLDivElement>settingItems[i];
            settingItem.style.backgroundColor = '#f5f5f5';
          }
          for(let i = 0; i < settingItemTitles.length; i++){
            settingItemTitle = <HTMLDivElement>settingItemTitles[i];
            settingItemTitle.style.color = 'black';
          }
        //#endregion
        ////#region HUD and Canvas
          canvas.style.backgroundColor = 'white';
          pauseButton.style.color = 'black';
          mapToggle.style.color = 'black';
          leaderbordButton.classList.add('lBord-icon-dark');
          innerLeaderbordLogo.classList.add('lBord-icon-dark');
          zoomInHud.style.color = 'black';
          zoomOutHud.style.color = 'black';
          leaderboard.lightMode = true;
          joystickBG.style.backgroundColor = 'rgba(100, 100, 100, 0.2)';
          joystickBall.style.backgroundColor = 'rgba(99, 98, 101, 0.8)';
          Minimap.lightMode = true;
        //#endregion
      }
      else{
        //#region setting changes
          settingsHeaderEle.style.backgroundColor = '#272727';
          settingTitle.style.color = 'white';
          settingsContainer.style.backgroundColor = 'black';
          settingItemsContainer.style.backgroundColor = 'black';
          for(let i = 0; i < settingItems.length; i++){
            settingItem = <HTMLDivElement>settingItems[i];
            settingItem.style.backgroundColor = '#272727';
          }
          for(let i = 0; i < settingItemTitles.length; i++){
            settingItemTitle = <HTMLDivElement>settingItemTitles[i];
            settingItemTitle.style.color = 'white';
          }
        //#endregion
        //#region Hud and Canvas
          canvas.style.backgroundColor = 'black';
          pauseButton.style.color = 'white';
          mapToggle.style.color = 'white';
          leaderbordButton.classList.remove('lBord-icon-dark');
          innerLeaderbordLogo.classList.remove('lBord-icon-dark');
          zoomInHud.style.color = 'white';
          zoomOutHud.style.color = 'white';
          joystickBG.style.backgroundColor = 'rgba(200, 200, 200, 0.2)';
          joystickBall.style.backgroundColor = 'rgba(199, 198, 201, 0.8)';
          Minimap.lightMode = false;
        //#endregion
      }
    }
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
    default: '#000000',
    onChange: (value: string) => {
      document.body.style.backgroundColor = value;
    }
  }
};

export default List;
