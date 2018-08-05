import IInputService, {
  TKeyEventHandler,
  TMouseEventHandler,
} from './interfaces/IInputService';

type TRawEventHandler = (event: Event) => void;

/** Multiplier so we can normalise MouseWheelEvent.wheelDelta */
const MOUSE_WHEEL_NOTCH = 120;

/** An input system which works within the browser environment */
export class BrowserInputService implements IInputService {
  public readonly gamepadDeadzone = 0.25;
  private flagIsContextMenuEnabled = true;
  private listeners: {
    [id: number]: {type: string; listener: TRawEventHandler};
  } = {};
  private lastListenerId: number = -1;

  public isPointerLocked() {
    return !document.pointerLockElement;
  }

  public lockPointer() {
    document.body.requestPointerLock();
  }

  public unlockPointer() {
    document.exitPointerLock();
  }

  public isContextMenuEnabled() {
    return this.flagIsContextMenuEnabled;
  }

  public disableContextMenu() {
    this.flagIsContextMenuEnabled = false;
    window.addEventListener('contextmenu', this.preventDefaultHandler);
  }

  public enableContextMenu() {
    this.flagIsContextMenuEnabled = true;
    window.removeEventListener('contextmenu', this.preventDefaultHandler);
  }

  public onKeyDown(handler: TKeyEventHandler) {
    return this.createEventBinding('keydown', this.mapKeyEventHandler(handler));
  }

  public onKeyUp(handler: TKeyEventHandler) {
    return this.createEventBinding('keyup', this.mapKeyEventHandler(handler));
  }

  public onMouseDown(handler: TMouseEventHandler) {
    return this.createEventBinding(
      'mousedown',
      this.mapMouseEventHandler(handler)
    );
  }

  public onMouseUp(handler: TMouseEventHandler) {
    return this.createEventBinding(
      'mouseup',
      this.mapMouseEventHandler(handler)
    );
  }

  public onMouseWheel(handler: TMouseEventHandler) {
    return this.createEventBinding(
      'mousescroll',
      this.mapMouseEventHandler(handler)
    );
  }

  public onMouseMove(handler: TMouseEventHandler) {
    return this.createEventBinding(
      'mousemove',
      this.mapMouseEventHandler(handler)
    );
  }

  public removeEventBinding(id: number) {
    window.removeEventListener(
      this.listeners[id].type,
      this.listeners[id].listener
    );
    delete this.listeners[id];
    return true;
  }

  public getGamepads() {
    return navigator.getGamepads().filter((gamepad) => !!gamepad) as Gamepad[];
  }

  private createEventBinding(
    type: string,
    listener: any /* RawEventListener */
  ) {
    const id = ++this.lastListenerId;
    this.listeners[id] = {type, listener};
    window.addEventListener(type, listener);
    return id;
  }

  private preventDefaultHandler(event: Event) {
    event.preventDefault();
  }

  private mapMouseEventHandler(handler: TMouseEventHandler) {
    return (event: MouseEvent) => {
      handler({
        button: event.button,
        wheelDelta:
          (event as MouseWheelEvent).wheelDelta || 0 / MOUSE_WHEEL_NOTCH,
        x: event.clientX,
        y: event.clientY,
        xDelta: event.movementX,
        yDelta: event.movementY,
      });
    };
  }

  private mapKeyEventHandler(handler: TKeyEventHandler) {
    return (event: KeyboardEvent) => {
      handler({
        key: event.key,
        code: event.code,
      });
    };
  }
}

export default BrowserInputService;
