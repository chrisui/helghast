import {Resource} from './Resource';
import {Component} from './Component';

export class Accessor {
  private resources: {[key: string]: Resource};
  private entityCollection: {[key: string]: Component[]};
  private cache: Component[][] = [];
  private cachePointer: number = 0;

  constructor(
    resources: {[key: string]: Resource},
    entityCollection: {[key: string]: Component[]},
  ) {
    this.resources = resources;
    this.entityCollection = entityCollection;
  }

  public process() {
    this.cachePointer = 0;
  }

  public get<T extends Resource>(resource: typeof Resource) {
    return this.resources[resource.name] as T;
  }

  public join<T extends Component[]>(...components: typeof Component[]): T[] {
    if (this.cache[this.cachePointer]) {
      const cache = this.cache[this.cachePointer] as T[];
      this.cachePointer++;
      return cache;
    }

    const bags = [];
    for (const entity in this.entityCollection) {
      if (this.entityCollection.hasOwnProperty(entity)) {
        if (
          !components.every(
            component =>
              !!this.entityCollection[entity].find(
                entityComponent =>
                  entityComponent.constructor.name === component.name,
              ),
          )
        ) {
          continue;
        }

        bags.push(
          components.map(component =>
            this.entityCollection[entity].find(
              entityComponent =>
                entityComponent.constructor.name === component.name,
            ),
          ),
        );
      }
    }
    this.cache[this.cachePointer] = bags;
    this.cachePointer++;
    return bags as T[];
  }
}
