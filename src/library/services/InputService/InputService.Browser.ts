import {
  IInputService,
  IKeyEventHandler,
  IMouseEventHandler,
  IGamepad
} from './IInputService';

type IRawEventHandler = (event: Event) => void;

/** An input system which works within the browser environment */
export class InputService implements IInputService {
  private flagIsContextMenuEnabled = true;
  private listeners: {
    [id: number]: {type: string; listener: IRawEventHandler};
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

  public onKeyDown(handler: IKeyEventHandler) {
    return this.createEventBinding('keydown', this.mapKeyEventHandler(handler));
  }

  public onKeyUp(handler: IKeyEventHandler) {
    return this.createEventBinding('keyup', this.mapKeyEventHandler(handler));
  }

  public onMouseDown(handler: IMouseEventHandler) {
    return this.createEventBinding(
      'mousedown',
      this.mapMouseEventHandler(handler)
    );
  }

  public onMouseUp(handler: IMouseEventHandler) {
    return this.createEventBinding(
      'mouseup',
      this.mapMouseEventHandler(handler)
    );
  }

  public onMouseWheel(handler: IMouseEventHandler) {
    return this.createEventBinding(
      'mousescroll',
      this.mapMouseEventHandler(handler)
    );
  }

  public onMouseMove(handler: IMouseEventHandler) {
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
    return (navigator.getGamepads() as unknown) as IGamepad[];
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

  private mapMouseEventHandler(handler: IMouseEventHandler) {
    return (event: MouseEvent) => {
      handler({
        button: event.button,
        wheelDelta:
          event instanceof WheelEvent
            ? event.deltaY / Math.abs(event.deltaY)
            : 0,
        x: event.clientX,
        y: event.clientY,
        xDelta: event.movementX,
        yDelta: event.movementY
      });
    };
  }

  private mapKeyEventHandler(handler: IKeyEventHandler) {
    return (event: KeyboardEvent) => {
      handler({
        key: event.key,
        code: event.code
      });
    };
  }
}
