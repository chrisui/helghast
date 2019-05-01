import {Game} from '../resources/Game';
import {Transform} from '../components/Transform';
import {Velocity} from '../components/Velocity';
import {Vec3} from '../../core/maths/Vec3';
import {Accessor} from '../../framework/Accessor';

export class PhysicsManager {
  public static resources = [Game];
  public static components = [Transform, Velocity];
  public tmpVelocity: Vec3 = new Vec3();
}

export namespace PhysicsManager {
  export function process(sys: PhysicsManager, accessor: Accessor) {
    const game = accessor.get<Immutable<Game>>(Game);
    const entities = accessor.join<[Transform, Immutable<Velocity>]>(
      Transform,
      Velocity,
    );

    for (const [transform, velocity] of entities) {
      transform.position.add(
        velocity.velocity.scale(game.deltaTime * 100, sys.tmpVelocity),
        transform.position,
      );
    }
  }
}
