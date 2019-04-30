import {Component} from './Component';
import {Entity} from './Entity';

/** Describe a system */
export class System {
  /** Id unique amongst other systems within the world */
  public static readonly id: string = '<UNSET>';
  /** Component ids this system works with (just matches one) */
  public static readonly aspects: {[id: string]: boolean} = {};
  /** A list of all the entities this system is managing (which were matched by aspect) */
  public entities: Entity[] = [];
}
