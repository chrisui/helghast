import Services from '../../../runtime/ServiceRegistry';
import {IMouseEvent} from '../../services/InputService/IInputService';

export const enum MouseButton {
  Left,
  Middle,
  Right,
  Back, // osx unsupported
  Forward, // osx unsupported
}

interface IButtonStates {
  [key: number]: boolean;
}

export class MouseInput {
  public x: number = 0;
  public y: number = 0;
  public tmpXDelta: number = 0;
  public tmpYDelta: number = 0;
  public tmpX: number = 0;
  public tmpY: number = 0;
  public deltaX: number = 0;
  public deltaY: number = 0;
  public wheelDelta: number = 0;
  public tmpWheelDelta: number = 0;
  public buttonStates: IButtonStates = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };
  public lastButtonStates: IButtonStates = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };
  public tmpButtonStates: IButtonStates = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };
}

/** Setup */
export function attach(mouse: MouseInput) {
  Services.input.onMouseUp(event => handleMouseUp(mouse, event));
  Services.input.onMouseDown(event => handleMouseDown(mouse, event));
  Services.input.onMouseMove(event => handleMouseMove(mouse, event));
  Services.input.onMouseWheel(event => handleMouseWheel(mouse, event));
}

/** Update within loop */
export function update(mouse: MouseInput) {
  for (const i in mouse.tmpButtonStates) {
    if (mouse.lastButtonStates.hasOwnProperty(i)) {
      mouse.lastButtonStates[i] = mouse.buttonStates[i];
      mouse.buttonStates[i] = mouse.tmpButtonStates[i];
    }
  }
  mouse.deltaX = mouse.tmpXDelta;
  mouse.deltaY = mouse.tmpYDelta;
  mouse.x = mouse.tmpX;
  mouse.y = mouse.tmpY;
  mouse.wheelDelta = mouse.tmpWheelDelta;

  // reset incremental temp values
  mouse.tmpWheelDelta = 0;
  mouse.tmpXDelta = 0;
  mouse.tmpYDelta = 0;
}

/** Is given button currently pressed? */
export function isPressed(mouse: MouseInput, button: MouseButton) {
  return mouse.buttonStates[button];
}

/** Was a given button pressed in this update? */
export function wasPressed(mouse: MouseInput, button: MouseButton): boolean {
  const isPressedNow = mouse.buttonStates[button];
  const wasPressedLast = mouse.lastButtonStates[button];

  return isPressedNow && !wasPressedLast;
}

function handleMouseUp(mouse: MouseInput, event: IMouseEvent) {
  mouse.tmpButtonStates[event.button] = false;
}

function handleMouseDown(mouse: MouseInput, event: IMouseEvent) {
  mouse.tmpButtonStates[event.button] = true;
}

function handleMouseMove(mouse: MouseInput, event: IMouseEvent) {
  mouse.tmpX = event.x;
  mouse.tmpY = event.y;
  mouse.tmpXDelta += event.xDelta;
  mouse.tmpYDelta += event.yDelta;
}

function handleMouseWheel(mouse: MouseInput, event: IMouseEvent) {
  mouse.tmpWheelDelta += event.wheelDelta;
}
