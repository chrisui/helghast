import {Entity} from './Entity';
import {System} from './System';

export class World {
  /** list of all world entities */
  public entities: Entity[] = [];
  /** list of all systems */
  public systems: System[];

  constructor(systems?: System[]) {
    this.systems = systems || [];
  }
}

export function update(world: World, dt: number) {
  // todo: update systems
}
