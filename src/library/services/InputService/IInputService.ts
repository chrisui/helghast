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

export type IEventBindingID = number;
export type IKeyEventHandler = (event: IKeyEvent) => void;
export type IMouseEventHandler = (event: IMouseEvent) => void;

export interface IInputService {
  isPointerLocked(): boolean;
  lockPointer(): void;
  unlockPointer(): void;
  isContextMenuEnabled(): boolean;
  enableContextMenu(): void;
  disableContextMenu(): void;
  onKeyDown(handler: IKeyEventHandler): IEventBindingID;
  onKeyUp(handler: IKeyEventHandler): IEventBindingID;
  onMouseMove(handler: IMouseEventHandler): IEventBindingID;
  onMouseWheel(handler: IMouseEventHandler): IEventBindingID;
  onMouseDown(handler: IMouseEventHandler): IEventBindingID;
  onMouseUp(handler: IMouseEventHandler): IEventBindingID;
  removeEventBinding(id: IEventBindingID): boolean;
  getGamepads(): IGamepad[];
}
