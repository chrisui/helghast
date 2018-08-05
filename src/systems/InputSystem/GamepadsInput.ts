import Services from '../../runtime/ServiceRegistry';
import {IGamepad} from '../../services/interfaces/IInputService';

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
export class GamepadsInput {
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
}

/** Update gamepad state */
export function update(gamepads: GamepadsInput) {
  let i;

  // move current buttons status into previous array
  // reusing objects where possible
  for (i = 0; i < gamepads.numDevices; i++) {
    if (gamepads.current[i] == null) {
      gamepads.last[i] = null;
      continue;
    }

    const currentPad = gamepads.current[i] as IGamepad;
    const buttons = currentPad.buttons;
    const buttonsLen = buttons.length;
    const pad: IGamepad = gamepads.last[i] || {
      buttons: new Array(buttonsLen),
      axes: [], // axes not important in history checking
    };

    let j;
    for (j = 0; j < buttonsLen; j++) {
      pad.buttons[j] = pad.buttons[j] || {};
      pad.buttons[j].value = currentPad.buttons[j].value;
      pad.buttons[j].pressed = currentPad.buttons[j].pressed;
    }
    gamepads.last[i] = pad;
  }

  // update with new gamepad values
  const padDevices = Services.input.getGamepads();
  const numDevices = padDevices.length;
  for (i = 0; i < numDevices; i++) {
    gamepads.current[i] = padDevices[i];
  }
  gamepads.numDevices = numDevices;
}

/** Is a given button pressed? */
export function isPressed(
  gamepads: GamepadsInput,
  index: number,
  buttonIndex: GamepadButton
): boolean {
  if (!gamepads.current[index]) {
    return false;
  }

  // @ts-ignore need to fix nullable issue
  return gamepads.current[index].buttons[buttonIndex].pressed;
}

/** Was a given button pressed in this update? */
export function wasPressed(
  gamepads: GamepadsInput,
  index: number,
  buttonIndex: GamepadButton
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
  gamepads: GamepadsInput,
  index: number,
  buttonIndex: GamepadButton
): number {
  if (!gamepads.current[index]) {
    return 0;
  }

  // @ts-ignore need to fix nullable issue
  return gamepads.current[index].buttons[buttonIndex].value;
}

/** What is the value for a given axis? */
export function getAxisValue(
  gamepads: GamepadsInput,
  index: number,
  axisIndex: GamepadAxis
): number {
  if (!gamepads.current[index]) {
    return 0;
  }

  // @ts-ignore need to fix nullable issue
  const value = gamepads.current[index].axes[axisIndex];
  if (Math.abs(value) < Services.input.gamepadDeadzone) {
    return 0;
  }

  return value;
}
