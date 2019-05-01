/**
 * [ x, y ]
 */
export class Vec2 {
  public static Up: Immutable<Vec2> = Vec2.create(0, 1);
  public static Right: Immutable<Vec2> = Vec2.create(1, 0);
  public static Down: Immutable<Vec2> = Vec2.create(0, -1);
  public static Left: Immutable<Vec2> = Vec2.create(-1, 0);

  /** 0 = x */
  public x: number = 0;
  /** 1 = y */
  public y: number = 0;

  /**
   * Create a new vector
   *
   * @param x x value
   * @param y y value
   */
  public static create(x: number, y: number) {
    const vec = new Vec2();
    vec.x = x;
    vec.y = y;
    return vec;
  }

  /**
   * Add two vectors
   *
   * @param b the second operand
   * @param out optional target for output
   */
  public add(b: Vec2, out: Vec2 = new Vec2()) {
    const a = this;
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    return out;
  }

  /**
   * Subtract two vectors
   *
   * @param b the second operand
   * @param out optional target for output
   */
  public subtract(b: Vec2, out: Vec2 = new Vec2()) {
    const a = this;
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    return out;
  }

  /**
   * Scale a vector
   *
   * @param scale the second operand
   * @param out optional target for output
   */
  public scale(factor: number, out: Vec2 = new Vec2()) {
    const a = this;
    out.x = a.x * factor;
    out.y = a.y * factor;
    return out;
  }
}
