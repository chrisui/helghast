import {ISystem} from './System';
import {Component} from './Component';
import {Accessor} from './Accessor';
import {Entity} from './Entity';

export class World {
  public resources: {[resourceName: string]: object} = {};
  public systems: ISystem[] = [];
  public entityId: number = 0;
  public entities: Entity[] = [];
  public entityComponents: {[entity: string]: Component[]} = {};
  public accessors: {[system: string]: Accessor} = {};
}

export namespace World {
  export function addResource(world: World, resource: any) {
    world.resources[resource.name] = new resource();
  }

  export function addSystem(world: World, system: any) {
    world.systems.push(new system());
  }

  export function setup(world: World) {
    for (const system of world.systems) {
      const accessor = new Accessor(world.resources, world.entityComponents);
      world.accessors[system.constructor.name] = accessor;

      if (!system.constructor.setup) {
        continue;
      }

      system.constructor.setup(system, accessor);
    }
  }

  export function process(world: World) {
    for (const system of world.systems) {
      const accessor = world.accessors[system.constructor.name];
      accessor.process();

      if (!system.constructor.process) {
        continue;
      }

      system.constructor.process(system, accessor);
    }
  }

  export function createEntity(world: World, components: Component[]) {
    const entity = world.entityId++ as Entity;
    world.entities.push(entity);
    addComponents(world, entity, components);

    return entity;
  }

  export function addComponents(
    world: World,
    entity: Entity,
    components: Component[],
  ) {
    world.entityComponents[entity] = components;
  }
}
