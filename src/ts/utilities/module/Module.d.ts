declare namespace Module {
  export function authorise(websocket: WebSocket, key: number): void;
  export function run_env_check(): void;
  export const postRun: (() => void)[];
}

export = Module;