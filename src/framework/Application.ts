import now from '../core/platform/now';
import requestAnimationFrame from '../core/platform/requestAnimationFrame';
import cancelAnimationFrame from '../core/platform/cancelAnimationFrame';

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
}

/** Process a single tick (which will also queue a new tick on next animation frame so dont overuse) */
export function tick(
  app: Application,
  timestamp = now(),
  // todo: remove updateCallback (just here for quick testing)
  updateCallback: (app: Application, delta: number) => void,
) {
  let delta = timestamp - (app.time || timestamp);
  delta = Math.min(Math.max(delta, 0), app.maxDeltaTime);
  delta *= app.timeScale;
  app.time = timestamp;

  // queue a new tick on next animation frame IMMEDIATELY
  app.animationFrameId = requestAnimationFrame(
    // todo: remove updateCallback (just here for quick testing)
    (ts: number) => tick(app, ts, updateCallback),
  );

  // allow all systems to update
  update(app, delta);
  // todo: remove updateCallback (just here for quick testing)
  updateCallback(app, delta);

  // pass off rendering to our renderers
  render(app);

  // wrap up this tick
  app.frame += 1;
}

/** Update all registered systems */
export function update(app: Application, delta: number) {
  // todo: loop through registered systems and update
}

/** Render via all registered renderers */
export function render(app: Application) {
  // todo: loop through registered renderers and render
}

export default Application;
