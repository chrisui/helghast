export class Mat4 {
  public xx: number;
  public xy: number;
  public xz: number;
  public xw: number;
  public yx: number;
  public yy: number;
  public yz: number;
  public yw: number;
  public zx: number;
  public zy: number;
  public zz: number;
  public zw: number;
  public wx: number;
  public wy: number;
  public wz: number;
  public ww: number;

  constructor(
    xx?: number,
    xy?: number,
    xz?: number,
    xw?: number,
    yx?: number,
    yy?: number,
    yz?: number,
    yw?: number,
    zx?: number,
    zy?: number,
    zz?: number,
    zw?: number,
    wx?: number,
    wy?: number,
    wz?: number,
    ww?: number,
  ) {
    this.xx = xx || 0;
    this.xy = xy || 0;
    this.xz = xz || 0;
    this.xw = xw || 0;
    this.yx = yx || 0;
    this.yy = yy || 0;
    this.yz = yz || 0;
    this.yw = yw || 0;
    this.zx = zx || 0;
    this.zy = zy || 0;
    this.zz = zz || 0;
    this.zw = zw || 0;
    this.wx = wx || 0;
    this.wy = wy || 0;
    this.wz = wz || 0;
    this.ww = ww || 0;
  }
}
