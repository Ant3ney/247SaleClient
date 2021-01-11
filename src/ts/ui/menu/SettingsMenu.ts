import List, { ToggleInfo, SettingInfo, ColorpickerInfo, ChoiceBoxInfo, RangeInfo } from "./settings-menu/List";
import Settings from "../../game/Settings";

class SettingsMenu {
  element: HTMLDivElement;
  container: HTMLDivElement;
  templates: {
    toggle: HTMLTemplateElement,
    colorpicker: HTMLTemplateElement,
    choice: HTMLTemplateElement,
    choiceBox: HTMLTemplateElement,
    range: HTMLTemplateElement
  };
  isOpen: boolean;

  constructor() {
    this.element = <HTMLDivElement>document.getElementById('settings-menu');
    this.container = <HTMLDivElement>this.element.querySelector('.container .setting-items');
    this.templates = {
      toggle: <HTMLTemplateElement>document.getElementById('settings-toggle'),
      colorpicker: <HTMLTemplateElement>document.getElementById('settings-colorpicker'),
      choice: <HTMLTemplateElement>document.getElementById('settings-choice'),
      choiceBox: <HTMLTemplateElement>document.getElementById('settings-choice-box'),
      range: <HTMLTemplateElement>document.getElementById('settings-range')
    };
    this.isOpen = false;
  }

  initialise(): void {
    this.attachEvents();
    this.createElements();
    this.loadSaved();
  }

  attachEvents(): void {
    const closeButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('settings-menu-close');
    closeButton.addEventListener('touchend', () => { this.hide() }, { passive: true });

    const navBar: HTMLDivElement = <HTMLDivElement>document.querySelector('#settings-menu .container .nav-bar');
    const categoryBtns: HTMLCollection = navBar.children;
    for (let i: number = 0; i < categoryBtns.length; i++) {
      const categoryBtn: HTMLDivElement = <HTMLDivElement>categoryBtns[i];
      const category: string = <string>categoryBtn.getAttribute('category');

      categoryBtn.addEventListener('touchend', () => {
        const items: HTMLCollection = this.container.children;
        for (let i: number = 0; i < items.length; i++) {
          const item: HTMLDivElement = <HTMLDivElement>items[i];
          const itemCategory: string = <string>item.getAttribute('category');
          item.style.display = category === itemCategory ? 'flex': 'none';
        }
        for (let i: number = 0; i < categoryBtns.length; i++) {
          const btn: HTMLDivElement = <HTMLDivElement>categoryBtns[i];
          btn.classList.remove('active');
        }
        categoryBtn.classList.add('active');
      }, { passive: true });
    }
  }

  createElements(): void {
    const keys: string[] = Object.keys(List);
    for (const key of keys) {
      const setting: SettingInfo = List[key];
      switch (setting.type) {
        case 'toggle': this.addToggle(key, <ToggleInfo>setting); break;
        case 'colorpicker': this.addColorpicker(key, <ColorpickerInfo>setting); break;
        case 'choice-box': this.addChoiceBox(key, <ChoiceBoxInfo>setting); break;
        case 'range': this.addRange(key, <RangeInfo>setting); break;
      }
    }
  }

  addToggle(name: string, setting: ToggleInfo): void {
    // create node
    const template: HTMLTemplateElement = <HTMLTemplateElement>this.templates.toggle;
    const node: HTMLDivElement = <HTMLDivElement>template.content.children[0].cloneNode(true);

    // define inner elements
    let toggleBox: HTMLDivElement = <HTMLDivElement>node.querySelector('.toggle-box');
    let onText: HTMLDivElement = <HTMLDivElement>toggleBox.querySelector('.toggle-text.on');
    let offText: HTMLDivElement = <HTMLDivElement>toggleBox.querySelector('.toggle-text.off');

    // set node data
    const title: HTMLDivElement = <HTMLDivElement>node.querySelector('.title');
    title.innerHTML = setting.displayName;
    node.setAttribute('category', setting.category);
    if (setting.default){
      node.classList.add('active');
      showEle(onText);
      hideEle(offText);
      toggleBox.classList.add('onPadding');
      toggleBox.classList.remove('offPadding');
    }
    else{
      node.classList.remove('active');
      showEle(offText);
      hideEle(onText);
      toggleBox.classList.add('offPadding');
      toggleBox.classList.remove('onPadding');
    }
    console.log(setting.default);
    node.style.display = setting.category === 'game' ? 'flex': 'none';

    // define setting
    let value: boolean = setting.default;
    let self: this = this;
    Object.defineProperty(Settings, name, {
      get() {
        return value;
      },
      set(newValue: boolean) {
        if (newValue){
          node.classList.add('active');
          showEle(onText);
          hideEle(offText);
          toggleBox.classList.add('onPadding');
          toggleBox.classList.remove('offPadding');
        }
        else{ 
          node.classList.remove('active');
          showEle(offText);
          hideEle(onText);
          toggleBox.classList.add('offPadding');
          toggleBox.classList.remove('onPadding');
        }
        self.saveSetting(name, newValue);
        value = newValue;
        if (setting.onChange) setting.onChange(newValue);
      }
    });

    // attach events
    const toggle: HTMLDivElement = <HTMLDivElement>node.querySelector('.toggle-box');
    toggle.addEventListener('touchend', () => {
      Settings[name] = !Settings[name];
    }, { passive: true });

    // append to dom
    this.container.appendChild(node);
  }

  addColorpicker(name: string, setting: ColorpickerInfo): void {
    // create node
    const template: HTMLTemplateElement = <HTMLTemplateElement>this.templates.colorpicker;
    const node: HTMLDivElement = <HTMLDivElement>template.content.children[0].cloneNode(true);

    // set node data
    const title: HTMLDivElement = <HTMLDivElement>node.querySelector('.title');
    const resetBtn: HTMLDivElement = <HTMLDivElement>node.querySelector('.combo-box .reset-btn');
    const input: HTMLInputElement = <HTMLInputElement>node.querySelector('.combo-box input');
    title.innerHTML = setting.displayName;
    input.value = setting.default;
    node.setAttribute('category', setting.category);
    node.style.display = setting.category === 'game' ? 'flex': 'none';

    // define setting
    let value: string = setting.default;
    let self: this = this;
    Object.defineProperty(Settings, name, {
      get() {
        return value;
      },
      set(newValue: string) {
        input.value = newValue;
        self.saveSetting(name, newValue);
        value = newValue;
        if (setting.onChange) setting.onChange(newValue);
      }
    });

    // attach events
    input.addEventListener('blur', () => {
      Settings[name] = input.value;
    }, { passive: true });

    resetBtn.addEventListener('touchend', () => {
      Settings[name] = setting.default;
      input.style.backgroundColor = setting.default;
      (<{jscolor: { fromString: (value: string) => void }}><unknown>input).jscolor.fromString(setting.default);
    }, { passive: true });

    // append to dom
    this.container.appendChild(node);
  }

  addChoiceBox(name: string, setting: ChoiceBoxInfo): void {
    // create node
    const template: HTMLTemplateElement = <HTMLTemplateElement>this.templates.choiceBox;
    const node: HTMLDivElement = <HTMLDivElement>template.content.children[0].cloneNode(true);

    // set node data
    const title: HTMLDivElement = <HTMLDivElement>node.querySelector('.title');
    const choiceContainer: HTMLDivElement = <HTMLDivElement>node.querySelector('.choices');
    title.innerHTML = setting.displayName;
    node.setAttribute('category', setting.category);
    node.style.display = setting.category === 'game' ? 'flex': 'none';

    const values: string[] = Object.keys(setting.choices);
    for (const value of values) {
      const displayName: string = setting.choices[value];
      const template: HTMLTemplateElement = <HTMLTemplateElement>this.templates.choice;
      const node: HTMLDivElement = <HTMLDivElement>template.content.children[0].cloneNode(true);
      if (value === setting.default) node.classList.add('active');
      node.setAttribute('value', value);
      node.innerText = displayName;

      node.addEventListener('touchend', () => {
        Settings[name] = value;
      });

      choiceContainer.appendChild(node);
    }

    // define setting
    let value: string = setting.default;
    let self = this;
    Object.defineProperty(Settings, name, {
      get() {
        return value;
      },
      set(newValue: string) {
        const choices: HTMLCollection = choiceContainer.children;
        for (let i: number = 0; i < choices.length; i++) {
          const choiceNode: HTMLDivElement = <HTMLDivElement>choices[i];
          const choiceValue: string = <string>choiceNode.getAttribute('value');
          if (choiceValue === newValue) choiceNode.classList.add('active');
          else choiceNode.classList.remove('active');
        }

        self.saveSetting(name, newValue);
        value = newValue;
        if (setting.onChange) setting.onChange(newValue);
      }
    });

    // append to dom
    this.container.appendChild(node);
  }

  addRange(name: string, setting: RangeInfo): void {
    // create node
    const template: HTMLTemplateElement = <HTMLTemplateElement>this.templates.range;
    const node: HTMLDivElement = <HTMLDivElement>template.content.children[0].cloneNode(true);

    // set node data
    const title: HTMLDivElement = <HTMLDivElement>node.querySelector('.title');
    const input: HTMLInputElement = <HTMLInputElement>node.querySelector('.range-box input');
    const fill: HTMLInputElement = <HTMLInputElement>node.querySelector('.range-box .progress-bar .fill-out .fill-in');
    title.innerHTML = setting.displayName;
    input.min = setting.min.toString();
    input.max = setting.max.toString();
    input.step = setting.step.toString();
    input.value = setting.default.toString();
    fill.style.width = `${(setting.default - setting.min) / (setting.max - setting.min) * 100 | 0}%`;

    node.setAttribute('category', setting.category);
    node.style.display = setting.category === 'game' ? 'flex': 'none';

    // define setting
    let value: number = setting.default;
    let self: this = this;
    Object.defineProperty(Settings, name, {
      get() {
        return value;
      },
      set(newValue: number) {
        fill.style.width = `${(newValue - setting.min) / (setting.max - setting.min) * 100 | 0}%`;
        input.value = newValue.toString();
        self.saveSetting(name, newValue.toString());
        value = newValue;
        if (setting.onChange) setting.onChange(newValue);
      }
    });

    // attach events
    input.addEventListener('input', () => {
      Settings[name] = +input.value;
    }, { passive: true });

    // append to dom
    this.container.appendChild(node);
  }

  show(): void {
    this.element.style.display = 'flex';
    this.isOpen = true;
  }

  hide(): void {
    this.element.style.display = 'none';
    this.isOpen = false;
  }

  saveSetting(name: string, value: boolean | string): void {
    let settings: { [key: string]: boolean | string } = {};
    const savedSettings: string | null = localStorage.getItem('senpa-mob:settings');

    if (savedSettings !== null) {
      try {
        settings = JSON.parse(savedSettings);
      } catch {
        console.warn('Saved settings data was found corrupt. Cleaning up...');
        localStorage.removeItem('senpa-mob:settings');
      }
    }

    settings[name] = value;
    localStorage.setItem('senpa-mob:settings', JSON.stringify(settings));
  }

  loadSaved(): void {
    let settings: { [key: string]: boolean | string } = {};
    const savedSettings: string | null = localStorage.getItem('senpa-mob:settings');

    if (savedSettings !== null) {
      try {
        settings = JSON.parse(savedSettings);
      } catch {
        console.warn('Saved settings data was found corrupt. Cleaning up...');
        localStorage.removeItem('senpa-mob:settings');
      }
    }

    const keys: string[] = Object.keys(settings);
    for (const key of keys) {
      const value: boolean | string = settings[key];
      Settings[key] = value;
    }
  }
}

function hideEle(ele: HTMLDivElement){
  ele.classList.add('display-none');
}
function showEle(ele: HTMLDivElement){
  while(ele.classList.contains('display-none')){
    ele.classList.remove('display-none');
  }
}

export default new SettingsMenu();
