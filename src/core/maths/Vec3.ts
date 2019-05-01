/**
 * [ x, y, z ]
 */
export class Vec3 {
  public static Left: Immutable<Vec3> = Vec3.create(-1, 0, 0);
  public static Right: Immutable<Vec3> = Vec3.create(1, 0, 0);
  public static Up: Immutable<Vec3> = Vec3.create(0, 1, 0);
  public static Down: Immutable<Vec3> = Vec3.create(0, -1, 0);
  public static Forward: Immutable<Vec3> = Vec3.create(0, 0, 1);
  public static Backward: Immutable<Vec3> = Vec3.create(0, 0, -1);

  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public static create(x: number, y: number, z: number) {
    const out = new Vec3();
    out.x = x;
    out.y = y;
    out.z = z;
    return out;
  }

  /**
   * copies values of vector
   *
   * @param out target for output
   */
  public copy(out: Vec3 = new Vec3()) {
    out.x = this.x;
    out.y = this.y;
    out.z = this.z;
    return out;
  }

  /**
   * Add two vectors
   *
   * @param b the second operand
   * @param out optional target for output
   */
  public add(b: Vec3, out: Vec3 = new Vec3()) {
    const a = this;
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    out.z = a.z + b.z;
    return out;
  }

  /**
   * Subtract two vectors
   *
   * @param b the second operand
   * @param out optional target for output
   */
  public subtract(b: Vec3, out: Vec3 = new Vec3()) {
    const a = this;
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    out.z = a.z - b.z;
    return out;
  }

  /**
   * Scale a vector
   *
   * @param scale the second operand
   * @param out optional target for output
   */
  public scale(factor: number, out = new Vec3()) {
    const a = this;
    out.x = a.x * factor;
    out.y = a.y * factor;
    out.z = a.z * factor;
    return out;
  }

  /**
   * normalizes a vector.
   *
   * @param out optional vector3 to store result
   * @return out or new vector if not provided
   */
  public normalize(out = new Vec3()) {
    const length = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z,
    );
    // make sure we don't divide by 0.
    if (length > 0.00001) {
      out.x = this.x / length;
      out.y = this.y / length;
      out.z = this.z / length;
    }
    return out;
  }

  /**
   * Computes the cross product of 2 vectors3s
   *
   * @param b vector to cross with
   * @param out  optional vector3 to store result
   * @return out or new if not provided
   */
  public cross(b: Vec3, out = new Vec3()) {
    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    out.x = ay * b.z - az * b.y;
    out.y = az * b.x - ax * b.z;
    out.z = ax * b.y - ay * b.x;
    return out;
  }

  public toTypedArray(out = new Float32Array(3)) {
    out[0] = this.x;
    out[1] = this.y;
    out[2] = this.z;
    return out;
  }
}
