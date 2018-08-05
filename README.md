# Helghast

Helghast is a next-gen game engine for the web.

> It is currently a giant playground and highly experimental

## Overview

At this stage of the project these are mostly goals.

- [Data-Oriented Design](http://gamesfromwithin.com/data-oriented-design)
- Mutable functional style programming
- [Entity-component-system](https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system)
- Sub systems parallelised across workers
- Written with [Typescript](https://www.typescriptlang.org/) and [compiled to WebAssembly](https://github.com/AssemblyScript/assemblyscript)
  - Scripting in Javascript or Typescript
- Service boundaries for portability

## What's in the box (aka. todo list)

- [ ] Application. Binds all pieces together and contains the update loop.
- [ ] World. A representation of the game.
  - [ ] Entities. Unique collections of Components.
  - [ ] Components. Purely data. Have no logic.
    - [ ] `InputtableComponent` - Provides entities with access to user input.
    - [ ] `NodeComponent` - A representation of this entity within the world heirarchy.
    - [ ] `RigidBodyComponent` - A physical representation of this entity for physics purposes.
    - [ ] `ScriptComponent` - An extendable component for writing game logic.
    - [ ] `CollisionComponent` - Contains info about an entities collision bounds
    - [ ] ...
  - [ ] Systems. Act on components. Have logic.
    - [ ] `InputSystem` - Consumes user input and provides to entities with `InputtableComponent`.
    - [ ] `ScriptSystem` - Manages user scripts of entities with `ScriptComponent`
    - [ ] `PhysicsSystem` - Manages physics updates of entities with `RigidBodyComponent` & `CollisionComponent`.
    - [ ] ...
- [ ] Services. Provide application boundary access.
  - [ ] `LoggerService` - Allows logging of information.
  - [ ] `BenchmarkService` - Allows benchmarking of application.
  - [ ] `InputService` - Provides interface to user input.
  - [ ] `AudioService` - Provides low latency audio playback.
  - [ ] `DisplayService` - Provides a way to render graphics to screen.
  - [ ] `FileService` - Provides a way to load various files.
  - [ ] ...

## License

MIT
