import now from '../core/platform/now';
import benchmark from '../core/debug/sBenchmark';
import debug from '../core/debug/sDebug';
import requestAnimationFrame from '../core/platform/requestAnimationFrame';
import cancelAnimationFrame from '../core/platform/cancelAnimationFrame';
import {World, update as updateWorld} from './World';
import {System} from './System';

/** The main application data class */
export class Application {
  /** The current frame (0-indexed) */
  public frame: number = 0;
  /** Time multiplyer (ie. 0.5 = half speed updates) */
  public timeScale: number = 1;
  /** Last tracked timestamp */
  public time: number = 0;
  /** Track the animation loop by id (allows canceling) */
  public animationFrameId: number = 0;
  /** Flag to determine whether rendering should occur for frame */
  public renderFrame: boolean = false;
  /** A maximum time for between updates, ignoring lag (before timeScale) */
  public maxDeltaTime: number = 100;
  /** The active world (contains entities) */
  public world: World;

  constructor(systems: System[]) {
    this.world = new World(systems);
  }
}

/** Process a single tick (which will also queue a new tick on next animation frame so dont overuse) */
export function tick(app: Application, timestamp = now()) {
  let delta = timestamp - (app.time || timestamp);

  // first thing is to allow debug to handle everything since the last frame
  debug.update(app, delta);

  // clamp our delta for usage this frame
  delta = Math.min(Math.max(delta, 0), app.maxDeltaTime);
  delta *= app.timeScale;
  app.time = timestamp;

  // queue a new tick on next animation frame IMMEDIATELY
  app.animationFrameId = requestAnimationFrame((ts: number) => tick(app, ts));

  // allow all systems to update
  update(app, delta);

  // pass off rendering to our renderers
  render(app);

  // wrap up this tick
  app.frame += 1;
}

/** Update all registered systems */
export function update(app: Application, delta: number) {
  benchmark.start('update');
  updateWorld(app.world, delta);
  benchmark.end('update');
}

/** Render via all registered renderers */
export function render(app: Application) {
  // todo: loop through registered renderers and render
  benchmark.start('render');
  benchmark.end('render');
}
