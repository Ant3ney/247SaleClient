import Time from "./utilities/Time";
import HAGE from "./HAGE";
import UI from "./UI";
import World from "./game/World";
import Camera from "./game/Camera";
import Player from "./game/Player";
import Huds from "./ui/Huds";
import Events from "./game/Events";
import * as Module from "./utilities/module/Module";

if (Module.run_env_check) Module.run_env_check();
else (<any>Module).postRun = [() => { Module.run_env_check() }];

class Engine {
  static start(): void {
    UI.initialise();
    Camera.initialise();
    Events.initialise();
    HAGE.initialise();

    requestAnimationFrame(() => { this.run() });
  }

  static run(): void {
    Time.update();
    Camera.update();
    World.update();
    Player.update();
    HAGE.run();
    Huds.update();

    requestAnimationFrame(() => { this.run() });
  }
}

Engine.start();
