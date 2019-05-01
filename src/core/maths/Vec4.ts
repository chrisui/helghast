/**
 * [ x, y, z, w ]
 */
export class Vec4 {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;
  public w: number = 0;

  public static create(x: number, y: number, z: number, w: number) {
    const out = new Vec4();
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }

  public toTypedArray(out = new Float32Array(4)) {
    out[0] = this.x;
    out[1] = this.y;
    out[2] = this.z;
    out[3] = this.w;
    return out;
  }
}
