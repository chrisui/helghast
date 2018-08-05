import IInputService, {
  TKeyEventHandler,
  TEventBindingID,
  TMouseEventHandler,
} from '../interfaces/IInputService';

export class NullInputService implements IInputService {
  public readonly gamepadDeadzone = 0;
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
  public onKeyDown(handler: TKeyEventHandler) {
    return -1;
  }
  public onKeyUp(handler: TKeyEventHandler) {
    return -1;
  }
  public onMouseMove(handler: TMouseEventHandler) {
    return -1;
  }
  public onMouseWheel(handler: TMouseEventHandler) {
    return -1;
  }
  public onMouseDown(handler: TMouseEventHandler) {
    return -1;
  }
  public onMouseUp(handler: TMouseEventHandler) {
    return -1;
  }
  public removeEventBinding(id: TEventBindingID) {
    return true;
  }
  public getGamepads() {
    return [];
  }
}

export default NullInputService;
