import {Resource} from './Resource';

export interface ISystem {
  constructor: ISystemConstructor;
}

interface ISystemConstructor {
  resources: Resource[];
  new (): ISystem;
  process(sys: ISystem, ...args: any[]): void;
  setup?(sys: ISystem, ...args: any[]): void;
}
