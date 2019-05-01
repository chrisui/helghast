import {Keyboard, Key} from '../resources/Keyboard';
import {Accessor} from '../../framework/Accessor';
import {Velocity} from '../components/Velocity';
import {Transform} from '../components/Transform';
import {Vec3} from '../../core/maths/Vec3';
import {Game} from '../resources/Game';
import {Player} from '../components/Player';

export class Tester {
  public static resources = [Keyboard, Game];
  public static components = [Velocity, Transform, Player];
}

export namespace Tester {
  export function process(sys: Tester, accessor: Accessor) {
    const keyboard = accessor.get<Immutable<Keyboard>>(Keyboard);
    const game = accessor.get<Immutable<Game>>(Game);
    const playerEntities = accessor.join<[Velocity, Transform, Player]>(
      Velocity,
      Transform,
      Player,
    );
    for (const [velocity, transform] of playerEntities) {
      velocity.velocity.x = 0;
      velocity.velocity.y = 0;
      velocity.velocity.z = 0;

      if (Keyboard.isPressed(keyboard, Key.ArrowRight)) {
        velocity.velocity.add(Vec3.Right, velocity.velocity);
      }

      if (Keyboard.isPressed(keyboard, Key.ArrowDown)) {
        velocity.velocity.add(Vec3.Backward, velocity.velocity);
      }

      if (Keyboard.isPressed(keyboard, Key.ArrowLeft)) {
        velocity.velocity.add(Vec3.Left, velocity.velocity);
      }

      if (Keyboard.isPressed(keyboard, Key.ArrowUp)) {
        velocity.velocity.add(Vec3.Forward, velocity.velocity);
      }

      if (Keyboard.isPressed(keyboard, Key.Home)) {
        velocity.velocity.add(Vec3.Up, velocity.velocity);
      }

      if (Keyboard.isPressed(keyboard, Key.End)) {
        velocity.velocity.add(Vec3.Down, velocity.velocity);
      }

      if (Keyboard.isPressed(keyboard, Key.Delete)) {
        transform.rotation.y = (transform.rotation.y - 1 + 360) % 360;
      }

      if (Keyboard.isPressed(keyboard, Key.PageDown)) {
        transform.rotation.y = (transform.rotation.y + 1) % 360;
      }
    }

    const entities = accessor.join<[Transform, Player]>(Transform);
    for (const [transform] of entities) {
      transform.position.y += Math.sin(game.time) * 1;

      transform.rotation.y =
        (transform.rotation.y + 1 * game.deltaTime * 10) % 360;
    }
  }
}
