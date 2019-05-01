import {Services} from '../../runtime/Services';
import {IKeyEvent} from '../services/InputService/IInputService';
import {Accessor} from '../../framework/Accessor';
import {Keyboard} from '../resources/Keyboard';

export class KeyboardInputter {
  public static resources = [Keyboard];
}

export namespace KeyboardInputter {
  export function setup(sys: KeyboardInputter, accessor: Accessor) {
    const keyboard: Keyboard = accessor.get(Keyboard);
    Services.input.onKeyDown(event => handleKeyDown(keyboard, event));
    Services.input.onKeyUp(event => handleKeyUp(keyboard, event));
  }

  export function process(sys: KeyboardInputter, accessor: Accessor) {
    const keyboard: Keyboard = accessor.get(Keyboard);
    for (const i in keyboard.tmpKeyStates) {
      if (keyboard.tmpKeyStates.hasOwnProperty(i)) {
        keyboard.lastKeyStates[i] = keyboard.keyStates[i];
        keyboard.keyStates[i] = keyboard.tmpKeyStates[i];
      }
    }
  }
}

function handleKeyDown(keyboardInput: Keyboard, event: IKeyEvent) {
  keyboardInput.tmpKeyStates[event.key] = true;
}

function handleKeyUp(keyboardInput: Keyboard, event: IKeyEvent) {
  keyboardInput.tmpKeyStates[event.key] = false;
}
