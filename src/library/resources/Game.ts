/** Core game state resource */
export class Game {
  /** The current frame (0-indexed) */
  public frame: number = 0;
  /** Time multiplyer (ie. 0.5 = half speed updates) */
  public timeScale: number = 1;
  /** Time running in seconds */
  public time: number = 0;
  /** A maximum time for between updates, ignoring lag (before timeScale), in seconds */
  public maxDeltaTime: number = 0.1;
  /** Delta time since last frame in seconds */
  public deltaTime: number = 0;
}
