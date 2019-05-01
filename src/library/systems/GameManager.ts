import {Services} from '../../runtime/Services';
import {Game} from '../resources/Game';
import {Accessor} from '../../framework/Accessor';

export class GameManager {
  public static resources = [Game];
}

export namespace GameManager {
  export function process(sys: GameManager, accessor: Accessor) {
    const game: Game = accessor.get(Game);

    const timestamp = Services.platform.now() / 1000;

    // mark this frame
    game.frame += 1;

    let deltaTime = timestamp - (game.time || timestamp);

    // clamp our deltaTime for usage this frame
    deltaTime = Math.min(Math.max(deltaTime, 0), game.maxDeltaTime);
    deltaTime *= game.timeScale;
    game.time = timestamp;
    game.deltaTime = deltaTime;
  }
}
