declare type Immutable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? ImmutableArray<T[number]>
  : T extends object
  ? ImmutableObject<T>
  : T;
declare interface ImmutableArray<T> extends ReadonlyArray<Immutable<T>> {}
declare type ImmutableObject<T> = {readonly [P in keyof T]: Immutable<T[P]>};
