import {Services} from '../../runtime/Services';
import {IGamepad} from '../services/InputService/IInputService';
import {Gamepads, GamepadAxis, GamepadButton} from '../resources/Gamepads';
import {Accessor} from '../../framework/Accessor';

export class GamepadInputter {
  public static resources = [Gamepads];
}

export namespace GamepadInputter {
  export function process(sys: GamepadInputter, accessor: Accessor) {
    const gamepads: Gamepads = accessor.get(Gamepads);

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
}
