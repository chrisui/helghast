import {
  IInputService,
  IKeyEventHandler,
  IEventBindingID,
  IMouseEventHandler
} from './IInputService';

export class InputService implements IInputService {
  public isPointerLocked() {
    return false;
  }
  public lockPointer() {
    return undefined;
  }
  public unlockPointer() {
    return undefined;
  }
  public isContextMenuEnabled() {
    return false;
  }
  public enableContextMenu() {
    return undefined;
  }
  public disableContextMenu() {
    return undefined;
  }
  public onKeyDown(handler: IKeyEventHandler) {
    return -1;
  }
  public onKeyUp(handler: IKeyEventHandler) {
    return -1;
  }
  public onMouseMove(handler: IMouseEventHandler) {
    return -1;
  }
  public onMouseWheel(handler: IMouseEventHandler) {
    return -1;
  }
  public onMouseDown(handler: IMouseEventHandler) {
    return -1;
  }
  public onMouseUp(handler: IMouseEventHandler) {
    return -1;
  }
  public removeEventBinding(id: IEventBindingID) {
    return true;
  }
  public getGamepads() {
    return [];
  }
}
