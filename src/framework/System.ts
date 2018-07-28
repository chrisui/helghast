import {Component} from './Component';
import {Entity} from './Entity';

export class System {
  /** Id unique amongst other systems within the world */
  public id: string = '<UNSET>';
  /** Component ids this system works with (just matches one) */
  public aspects: string[] = [];
  /** A list of all the entities this system is managing (which were matched by aspect) */
  public entities: Entity[] = [];
}
