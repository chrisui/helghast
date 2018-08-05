/**
 * [ xx, xy, xz,
 *   yx, yy, yz,
 *   zx, zy, zz, ]
 */
export class Mat3 {
  public xx: number;
  public xy: number;
  public xz: number;
  public yx: number;
  public yy: number;
  public yz: number;
  public zx: number;
  public zy: number;
  public zz: number;

  constructor(
    xx?: number,
    xy?: number,
    xz?: number,
    yx?: number,
    yy?: number,
    yz?: number,
    zx?: number,
    zy?: number,
    zz?: number
  ) {
    this.xx = xx || 0;
    this.xy = xy || 0;
    this.xz = xz || 0;
    this.yx = yx || 0;
    this.yy = yy || 0;
    this.yz = yz || 0;
    this.zx = zx || 0;
    this.zy = zy || 0;
    this.zz = zz || 0;
  }
}
