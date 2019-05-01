import {Services} from '../runtime/Services';
import {World} from './World';

type Entity = string & {__entity__: void};

const BENCHMARK_UPDATE = 'update';

/** The main application data class */
export class Application {
  /** Track the animation loop by id (allows canceling) */
  public animationFrameId: number = 0;
  /** The application world (container of ecs) */
  public world: World = new World();
}

export namespace Application {
  /** Process a single tick (which will also queue a new tick on next animation frame) */
  export function tick(app: Application) {
    // queue a new tick on next animation frame IMMEDIATELY
    app.animationFrameId = Services.platform.requestAnimationFrame(() =>
      tick(app),
    );

    // allow all systems to update
    update(app);
  }

  /** Stop loop */
  export function stop(app: Application) {
    Services.platform.cancelAnimationFrame(app.animationFrameId);
  }

  /** Update all registered systems */
  export function update(app: Application) {
    Services.benchmark.start(BENCHMARK_UPDATE);
    World.process(app.world);
    Services.benchmark.end(BENCHMARK_UPDATE);
  }
}
