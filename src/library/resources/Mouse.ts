export const enum MouseButton {
  Left,
  Middle,
  Right,
  Back, // osx unsupported
  Forward, // osx unsupported
}

export interface IButtonStates {
  [key: number]: boolean;
}

export class Mouse {
  public x: number = 0;
  public y: number = 0;
  public deltaX: number = 0;
  public deltaY: number = 0;
  public wheelDelta: number = 0;
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
  public tmpXDelta: number = 0;
  public tmpYDelta: number = 0;
  public tmpX: number = 0;
  public tmpY: number = 0;
  public tmpWheelDelta: number = 0;
}

export namespace Mouse {
  /** Is given button currently pressed? */
  export function isPressed(mouse: Mouse, button: MouseButton) {
    return mouse.buttonStates[button];
  }

  /** Was a given button pressed in this update? */
  export function wasPressed(mouse: Mouse, button: MouseButton): boolean {
    const isPressedNow = mouse.buttonStates[button];
    const wasPressedLast = mouse.lastButtonStates[button];

    return isPressedNow && !wasPressedLast;
  }
}
