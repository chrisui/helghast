const MOUSE_WHEEL_NOTCH = 120;

export const enum MouseButtons {
  Left,
  Middle,
  Right,
  Four,
  Five,
}

interface IButtonStates {
  [key: number]: boolean;
}

export class MouseInput {
  public x: number = 0;
  public y: number = 0;
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

export function update(mouse: MouseInput) {
  for (const i in mouse.tmpButtonStates) {
    if (mouse.lastButtonStates.hasOwnProperty(i)) {
      mouse.lastButtonStates[i] = mouse.buttonStates[i];
      mouse.buttonStates[i] = mouse.tmpButtonStates[i];
    }
  }
  mouse.deltaX = mouse.tmpX - mouse.x;
  mouse.deltaY = mouse.tmpY - mouse.y;
  mouse.x = mouse.tmpX;
  mouse.y = mouse.tmpY;
  mouse.wheelDelta = mouse.tmpWheelDelta;
  mouse.tmpWheelDelta = 0;
}

export function isPressed(mouse: MouseInput, button: MouseButtons) {
  return mouse.buttonStates[button];
}

/** Was a given button pressed in this update? */
export function wasPressed(mouse: MouseInput, button: MouseButtons): boolean {
  const isPressedNow = mouse.buttonStates[button];
  const wasPressedLast = mouse.lastButtonStates[button];

  return isPressedNow && !wasPressedLast;
}

export function attach(mouse: MouseInput, el = window) {
  // todo: create dom event manager
  el.addEventListener('mouseup', (event) => handleMouseUp(mouse, event));
  el.addEventListener('mousedown', (event) => handleMouseDown(mouse, event));
  el.addEventListener('mousemove', (event) => handleMouseMove(mouse, event));
  el.addEventListener('mousewheel', (event) => handleMouseWheel(mouse, event));
}

export function detach(mouse: MouseInput, el = window) {
  // todo: handle removing listeners
}

function handleMouseUp(mouse: MouseInput, event: MouseEvent) {
  mouse.tmpButtonStates[event.button] = false;
}

function handleMouseDown(mouse: MouseInput, event: MouseEvent) {
  mouse.tmpButtonStates[event.button] = true;
}

function handleMouseMove(mouse: MouseInput, event: MouseEvent) {
  // todo: create dom reference manager
  // only works with window attachment for now
  if (isPointerLocked()) {
    mouse.tmpX += event.movementX || 0;
    mouse.tmpY += event.movementY || 0;
  } else {
    const c = getCoords(mouse, event);
    if (c) {
      mouse.tmpX = c.x;
      mouse.tmpY = c.y;
    }
  }
}

function handleMouseWheel(mouse: MouseInput, event: MouseWheelEvent) {
  mouse.tmpWheelDelta += event.wheelDelta / MOUSE_WHEEL_NOTCH;
}

function preventDefault(event: Event) {
  event.preventDefault();
}

export function isPointerLocked() {
  return !!document.pointerLockElement;
}

export function disableContextMenu(el = window) {
  el.addEventListener('contextmenu', preventDefault);
}

export function enableContextMenu(el = window) {
  el.removeEventListener('contextmenu', preventDefault);
}

export function enablePointerLock() {
  document.body.requestPointerLock();
}

export function disablePointerLock() {
  document.exitPointerLock();
}

function getCoords(mouseInput: MouseInput, event: MouseEvent) {
  // todo: lookup from dom element manager
  const el = document.getElementById('app') as HTMLElement;
  const rect = el.getBoundingClientRect();

  // mouse is outside of canvas
  if (
    event.clientX < rect.left ||
    event.clientX >= rect.left + rect.width ||
    event.clientY < rect.top ||
    event.clientY >= rect.top + rect.height
  ) {
    return null;
  }

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export default MouseInput;
