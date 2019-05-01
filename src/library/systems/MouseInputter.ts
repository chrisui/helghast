import {Services} from '../../runtime/Services';
import {IMouseEvent} from '../services/InputService/IInputService';
import {Mouse} from '../resources/Mouse';
import {Accessor} from '../../framework/Accessor';

export class MouseInputter {
  public static resources = [Mouse];
}

export namespace MouseInputter {
  export function setup(sys: MouseInputter, accessor: Accessor) {
    const mouse: Mouse = accessor.get(Mouse);
    Services.input.onMouseUp(event => handleMouseUp(mouse, event));
    Services.input.onMouseDown(event => handleMouseDown(mouse, event));
    Services.input.onMouseMove(event => handleMouseMove(mouse, event));
    Services.input.onMouseWheel(event => handleMouseWheel(mouse, event));
  }

  export function process(sys: MouseInputter, accessor: Accessor) {
    const mouse: Mouse = accessor.get(Mouse);
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
}

function handleMouseUp(mouse: Mouse, event: IMouseEvent) {
  mouse.tmpButtonStates[event.button] = false;
}

function handleMouseDown(mouse: Mouse, event: IMouseEvent) {
  mouse.tmpButtonStates[event.button] = true;
}

function handleMouseMove(mouse: Mouse, event: IMouseEvent) {
  mouse.tmpX = event.x;
  mouse.tmpY = event.y;
  mouse.tmpXDelta += event.xDelta;
  mouse.tmpYDelta += event.yDelta;
}

function handleMouseWheel(mouse: Mouse, event: IMouseEvent) {
  mouse.tmpWheelDelta += event.wheelDelta;
}
