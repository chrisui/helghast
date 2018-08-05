export interface IMouseEvent {
  button: number;
  wheelDelta: number;
  x: number; // todo: relative to what? viewport? screen?
  y: number; // todo: relative to what? viewport? screen?
  xDelta: number;
  yDelta: number;
}

export interface IKeyEvent {
  key: string;
  code: string;
}

export interface IGamepad {
  buttons: {value: number; pressed: boolean}[];
  axes: number[];
}

export type TEventBindingID = number;
export type TKeyEventHandler = (event: IKeyEvent) => void;
export type TMouseEventHandler = (event: IMouseEvent) => void;

export interface IInputService {
  gamepadDeadzone: number;
  isPointerLocked(): boolean;
  lockPointer(): void;
  unlockPointer(): void;
  isContextMenuEnabled(): boolean;
  enableContextMenu(): void;
  disableContextMenu(): void;
  onKeyDown(handler: TKeyEventHandler): TEventBindingID;
  onKeyUp(handler: TKeyEventHandler): TEventBindingID;
  onMouseMove(handler: TMouseEventHandler): TEventBindingID;
  onMouseWheel(handler: TMouseEventHandler): TEventBindingID;
  onMouseDown(handler: TMouseEventHandler): TEventBindingID;
  onMouseUp(handler: TMouseEventHandler): TEventBindingID;
  removeEventBinding(id: TEventBindingID): boolean;
  getGamepads(): IGamepad[];
}

export default IInputService;
