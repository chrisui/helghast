import {System} from '../../../framework/System';

import * as GamePadsInput from './GamepadsInput';
import * as KeyboardInput from './KeyboardInput';
import * as MouseInput from './MouseInput';

/** A system for capturing and making available user input */
export class InputSystem extends System {
  /** Id unique amongst other systems within the world */
  public static readonly id: string = 'input';
  /** Valid aspects for this system */
  public static readonly aspects = {inputtable: true};
  /** Gamepad state */
  public gamepads: GamePadsInput.GamepadsInput = new GamePadsInput.GamepadsInput();
  /** Mouse state */
  public mouse: MouseInput.MouseInput = new MouseInput.MouseInput();
  /** Keyboard state */
  public keyboard: KeyboardInput.KeyboardInput = new KeyboardInput.KeyboardInput();
}

export function update() {}
