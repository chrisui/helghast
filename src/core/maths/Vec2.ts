/**
 * [ x, y ]
 */
export class Vec2 {
  /** 0 = x */
  public x: number = 0;
  /** 1 = y */
  public y: number = 0;
}

export namespace Vec2 {
  /** Create a new identity Vec2 */
  export function create() {
    return new Vec2();
  }

  /**
   * Add two Vec2's
   *
   * @param a the first operand
   * @param b the second operand
   * @param out optional target for output
   */
  export function add(a: Vec2, b: Vec2, out: Vec2 = a) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    return out;
  }

  /**
   * Subtract two Vec2's
   *
   * @param a the first operand
   * @param b the second operand
   * @param out optional target for output
   */
  export function subtract(a: Vec2, b: Vec2, out: Vec2 = a) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    return out;
  }
}
