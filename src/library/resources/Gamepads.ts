import {IGamepad} from '../services/InputService/IInputService';

/** Available buttons on a gamepad */
export const enum GamepadButton {
  // Face buttons
  Face1,
  Face2,
  Face3,
  Face4,
  // Shoulder buttons
  LShoulder1,
  RShoulder1,
  LShoulder2,
  RShoulder2,
  // Other buttons
  Select,
  Start,
  LStick,
  RStick,
  // D Pad
  Up,
  Down,
  Left,
  Right,
  // Vendor specific button
  Vendor,
}

/** Available axes on a gamepad */
export const enum GamepadAxis {
  LStickX,
  LStickY,
  RStickX,
  RStickY,
}

interface IGamepads {
  [key: number]: IGamepad | null;
}

/** Current gamepad state */
export class Gamepads {
  public current: IGamepads = {
    0: null,
    1: null,
    2: null,
    3: null,
  };
  public last: IGamepads = {
    0: null,
    1: null,
    2: null,
    3: null,
  };
  public numDevices = 0;
  public deadzone = 0.25;
}

export namespace Gamepads {
  /** Is a given button pressed? */
  export function isPressed(
    gamepads: Gamepads,
    index: number,
    buttonIndex: GamepadButton,
  ): boolean {
    if (!gamepads.current[index]) {
      return false;
    }

    // @ts-ignore need to fix nullable issue
    return gamepads.current[index].buttons[buttonIndex].pressed;
  }

  /** Was a given button pressed in this update? */
  export function wasPressed(
    gamepads: Gamepads,
    index: number,
    buttonIndex: GamepadButton,
  ): boolean {
    if (!gamepads.current[index]) {
      return false;
    }

    const isPressedNow =
      // @ts-ignore need to fix nullable issue
      gamepads.current[index].buttons[buttonIndex].pressed;

    const wasPressedLast =
      gamepads.last[index] &&
      // @ts-ignore need to fix nullable issue
      gamepads.last[index].buttons[buttonIndex].pressed;

    return isPressedNow && !wasPressedLast;
  }

  /** What is the value of a given button press? Useful for triggers. */
  export function getButtonValue(
    gamepads: Gamepads,
    index: number,
    buttonIndex: GamepadButton,
  ): number {
    if (!gamepads.current[index]) {
      return 0;
    }

    // @ts-ignore need to fix nullable issue
    return gamepads.current[index].buttons[buttonIndex].value;
  }

  /** What is the value for a given axis? */
  export function getAxisValue(
    gamepads: Gamepads,
    index: number,
    axisIndex: GamepadAxis,
  ): number {
    if (!gamepads.current[index]) {
      return 0;
    }

    // @ts-ignore need to fix nullable issue
    const value = gamepads.current[index].axes[axisIndex];
    if (Math.abs(value) < gamepads.deadzone) {
      return 0;
    }

    return value;
  }
}
