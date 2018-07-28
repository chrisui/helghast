import {Entity} from './Entity';
import {System} from './System';

import * as MouseInput from '../systems/input/MouseInput';
import * as GamePadsInput from '../systems/input/GamePadsInput';
import * as KeyboardInput from '../systems/input/KeyboardInput';

export class World {
  /** list of all world entities */
  public entities: Entity[] = [];
  /** list of all systems */
  public systems: System[];

  constructor(systems: System[]) {
    this.systems = systems;
  }
}

const m = new MouseInput.MouseInput();
const g = new GamePadsInput.GamePadsInput();
const k = new KeyboardInput.KeyboardInput();

export function update(world: World, dt: number) {
  MouseInput.update(m);
  GamePadsInput.update(g);
  KeyboardInput.update(k);
}
