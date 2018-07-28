import {Component} from './Component';

export class Entity {
  public guid: string;
  public components: Component[];
  public tags: string[];

  constructor(guid: string, components: Component[], tags: string[]) {
    this.guid = guid;
    this.components = components;
    this.tags = tags;
  }
}
