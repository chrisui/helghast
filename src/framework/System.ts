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

/** Offer entities for this system to consume (which should only take those which match it's aspects config) */
export function offerEntities(system: System, entities: Entity[]) {
  const aspects = (system.constructor as typeof System).aspects;
  for (const entity of entities) {
    const hasAspectedComponent = entity.components.find(
      (component) => aspects[(component.constructor as typeof Component).id],
    );
    if (hasAspectedComponent) {
      system.entities.push(entity);
    }
  }
}

/** Remove entities from the system */
export function discardEntities(system: System, entities: Entity[]) {
  for (const entity of entities) {
    const index = system.entities.indexOf(entity);
    if (index >= 0) {
      system.entities.splice(index, 1);
    }
  }
}
