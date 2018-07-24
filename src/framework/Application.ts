import now from '../core/now';
import requestAnimationFrame from '../core/requestAnimationFrame';

export class Application {
  /** The current frame (0-indexed) */
  public frame: number = 0;
  /** Time multiplyer (ie. 0.5 = half speed updates) */
  public timeScale: number = 1;
  /** Last tracked timestamp */
  public time: number = 0;
  /** Timestamp of when the update loop completed this frame */
  public frameUpdateTime: number = 0;
  /** Timestamp once update and render loop have completed */
  public frameEndTime: number = 0;
  /** Track the animation loop by id (allows canceling) */
  public animationFrameId: number = 0;
  /** Flag to determine whether rendering should occur for frame */
  public renderFrame: boolean = false;
  /** A maximum time for between updates, ignoring lag (before timeScale) */
  public maxDeltaTime: number = 100;
}

export function tick(app: Application, timestamp = now()) {
  let delta = timestamp - (app.time || timestamp);
  delta = Math.min(Math.max(delta, 0), app.maxDeltaTime);
  delta *= app.timeScale;
  app.time = timestamp;

  // queue a new tick on next animation frame IMMEDIATELY
  app.animationFrameId = requestAnimationFrame((ts) => tick(app, ts));

  // allow all systems to update
  update(app, delta);
  app.frameUpdateTime = now();

  // render, only if there is something to render
  if (app.renderFrame) {
    render(app);
    app.renderFrame = false;
  }

  // wrap up this tick
  app.frame += 1;
  app.frameEndTime = now();
}

export function update(app: Application, delta: number) {
  // todo: loop through registered systems and update
}

export function render(app: Application) {
  // todo: loop through registered renderers and render
}

export default Application;
