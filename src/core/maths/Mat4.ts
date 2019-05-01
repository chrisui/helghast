import {Vec3} from './Vec3';
import {Vec4} from './Vec4';

/**
 * [ xx, xy, xz, xw,
 *   yx, yy, yz, yw,
 *   zx, zy, zz, zw,
 *   wx, wy, wz, ww ]
 */
export class Mat4 {
  public xx: number = 0;
  public xy: number = 0;
  public xz: number = 0;
  public xw: number = 0;
  public yx: number = 0;
  public yy: number = 0;
  public yz: number = 0;
  public yw: number = 0;
  public zx: number = 0;
  public zy: number = 0;
  public zz: number = 0;
  public zw: number = 0;
  public wx: number = 0;
  public wy: number = 0;
  public wz: number = 0;
  public ww: number = 0;

  /**
   * Create a new identity matrix
   *
   * @param out optional matrix to write to
   */
  public static identity(out = new Mat4()) {
    out.xx = 1;
    out.xy = 0;
    out.xz = 0;
    out.xw = 0;
    out.yx = 0;
    out.yy = 1;
    out.yz = 0;
    out.yw = 0;
    out.zx = 0;
    out.zy = 0;
    out.zz = 1;
    out.zw = 0;
    out.wx = 0;
    out.wy = 0;
    out.wz = 0;
    out.ww = 1;
    return out;
  }

  /**
   * Makes a translation matrix
   *
   * @param translation translation as vector.
   * @param out optional matrix to store result
   * @return out or a new matrix if none provided
   */
  public static translation(translation: Vec3, out = new Mat4()) {
    out.xx = 1;
    out.xy = 0;
    out.xz = 0;
    out.xw = 0;
    out.yx = 0;
    out.yy = 1;
    out.yz = 0;
    out.yw = 0;
    out.zx = 0;
    out.zy = 0;
    out.zz = 1;
    out.zw = 0;
    out.wx = translation.x;
    out.wy = translation.y;
    out.wz = translation.z;
    out.ww = 1;

    return out;
  }

  /**
   * Computes a 4-by-4 perspective transformation matrix given the angular height
   * of the frustum, the aspect ratio, and the near and far clipping planes.  The
   * arguments define a frustum extending in the negative z direction.  The given
   * angle is the vertical angle of the frustum, and the horizontal angle is
   * determined to produce the given aspect ratio.  The arguments near and far are
   * the distances to the near and far clipping planes.  Note that near and far
   * are not z coordinates, but rather they are distances along the negative
   * z-axis.  The matrix generated sends the viewing frustum to the unit box.
   * We assume a unit box extending from -1 to 1 in the x and y dimensions and
   * from -1 to 1 in the z dimension.
   *
   * @param fieldOfView field of view, in y axis, in radians.
   * @param aspect aspect of viewport (width / height)
   * @param near near Z clipping plane
   * @param far far Z clipping plane
   * @param out optional matrix to store result
   * @return out or a new matrix if none provided
   */
  public static perspective(
    fieldOfView: number,
    aspect: number,
    near: number,
    far: number,
    out = new Mat4(),
  ) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfView);
    const rangeInv = 1.0 / (near - far);

    out.xx = f / aspect;
    out.xy = 0;
    out.xz = 0;
    out.xw = 0;
    out.yx = 0;
    out.yy = f;
    out.yz = 0;
    out.yw = 0;
    out.zx = 0;
    out.zy = 0;
    out.zz = (near + far) * rangeInv;
    out.zw = -1;
    out.wx = 0;
    out.wy = 0;
    out.wz = near * far * rangeInv * 2;
    out.ww = 0;

    return out;
  }

  /**
   * Creates a lookAt matrix.
   * This is a world matrix for a camera. In other words it will transform
   * from the origin to a place and orientation in the world. For a view
   * matrix take the inverse of this.
   *
   * @param cameraPosition position of the camera
   * @param target position of the target
   * @param up direction
   * @param out optional matrix to store result
   * @return out or a new matrix if none provided
   */
  public static lookAt(
    cameraPosition: Vec3,
    target: Vec3,
    up: Vec3,
    out = new Mat4(),
  ) {
    const zAxis = cameraPosition
      .copy()
      .subtract(target)
      .normalize();
    const xAxis = up
      .copy()
      .cross(zAxis)
      .normalize();
    const yAxis = zAxis
      .copy()
      .cross(xAxis)
      .normalize();

    out.xx = xAxis.x;
    out.xy = xAxis.y;
    out.xz = xAxis.z;
    out.xw = 0;
    out.yx = yAxis.x;
    out.yy = yAxis.y;
    out.yz = yAxis.z;
    out.yw = 0;
    out.zx = zAxis.x;
    out.zy = zAxis.y;
    out.zz = zAxis.z;
    out.zw = 0;
    out.wx = cameraPosition.x;
    out.wy = cameraPosition.y;
    out.wz = cameraPosition.z;
    out.ww = 1;

    return out;
  }

  /**
   * Makes a y rotation matrix
   *
   * @param angle amount to rotate in radians
   * @param out optional matrix to store result
   * @return out or a new matrix if none provided
   */
  public static yRotation(angle: number, out = new Mat4()) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    out.xx = c;
    out.xy = 0;
    out.xz = -s;
    out.xw = 0;
    out.yx = 0;
    out.yy = 1;
    out.yz = 0;
    out.yw = 0;
    out.zx = s;
    out.zy = 0;
    out.zz = c;
    out.zw = 0;
    out.wx = 0;
    out.wy = 0;
    out.wz = 0;
    out.ww = 1;

    return out;
  }

  /**
   * Makes a x rotation matrix
   *
   * @param angle amount to rotate in radians
   * @param out optional matrix to store result
   * @return out or a new matrix if none provided
   */
  public static xRotation(angle: number, out = new Mat4()) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    out.xx = 1;
    out.xy = 0;
    out.xz = 0;
    out.xw = 0;
    out.yx = 0;
    out.yy = c;
    out.yz = s;
    out.yw = 0;
    out.zx = 0;
    out.zy = -s;
    out.zz = c;
    out.zw = 0;
    out.wx = 0;
    out.wy = 0;
    out.wz = 0;
    out.ww = 1;

    return out;
  }

  /**
   * Computes the inverse of a matrix.
   *
   * @param out optional matrix to store result
   * @return out or this matrix
   */
  public inverse(out = new Mat4()) {
    const m00 = this.xx;
    const m01 = this.xy;
    const m02 = this.xz;
    const m03 = this.xw;
    const m10 = this.yx;
    const m11 = this.yy;
    const m12 = this.yz;
    const m13 = this.yw;
    const m20 = this.zx;
    const m21 = this.zy;
    const m22 = this.zz;
    const m23 = this.zw;
    const m30 = this.wx;
    const m31 = this.wy;
    const m32 = this.wz;
    const m33 = this.ww;
    const tmp0 = m22 * m33;
    const tmp1 = m32 * m23;
    const tmp2 = m12 * m33;
    const tmp3 = m32 * m13;
    const tmp4 = m12 * m23;
    const tmp5 = m22 * m13;
    const tmp6 = m02 * m33;
    const tmp7 = m32 * m03;
    const tmp8 = m02 * m23;
    const tmp9 = m22 * m03;
    const tmp10 = m02 * m13;
    const tmp11 = m12 * m03;
    const tmp12 = m20 * m31;
    const tmp13 = m30 * m21;
    const tmp14 = m10 * m31;
    const tmp15 = m30 * m11;
    const tmp16 = m10 * m21;
    const tmp17 = m20 * m11;
    const tmp18 = m00 * m31;
    const tmp19 = m30 * m01;
    const tmp20 = m00 * m21;
    const tmp21 = m20 * m01;
    const tmp22 = m00 * m11;
    const tmp23 = m10 * m01;

    const t0 =
      tmp0 * m11 +
      tmp3 * m21 +
      tmp4 * m31 -
      (tmp1 * m11 + tmp2 * m21 + tmp5 * m31);
    const t1 =
      tmp1 * m01 +
      tmp6 * m21 +
      tmp9 * m31 -
      (tmp0 * m01 + tmp7 * m21 + tmp8 * m31);
    const t2 =
      tmp2 * m01 +
      tmp7 * m11 +
      tmp10 * m31 -
      (tmp3 * m01 + tmp6 * m11 + tmp11 * m31);
    const t3 =
      tmp5 * m01 +
      tmp8 * m11 +
      tmp11 * m21 -
      (tmp4 * m01 + tmp9 * m11 + tmp10 * m21);

    const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    out.xx = d * t0;
    out.xy = d * t1;
    out.xz = d * t2;
    out.xw = d * t3;
    out.yx =
      d *
      (tmp1 * m10 +
        tmp2 * m20 +
        tmp5 * m30 -
        (tmp0 * m10 + tmp3 * m20 + tmp4 * m30));
    out.yy =
      d *
      (tmp0 * m00 +
        tmp7 * m20 +
        tmp8 * m30 -
        (tmp1 * m00 + tmp6 * m20 + tmp9 * m30));
    out.yz =
      d *
      (tmp3 * m00 +
        tmp6 * m10 +
        tmp11 * m30 -
        (tmp2 * m00 + tmp7 * m10 + tmp10 * m30));
    out.yw =
      d *
      (tmp4 * m00 +
        tmp9 * m10 +
        tmp10 * m20 -
        (tmp5 * m00 + tmp8 * m10 + tmp11 * m20));
    out.zx =
      d *
      (tmp12 * m13 +
        tmp15 * m23 +
        tmp16 * m33 -
        (tmp13 * m13 + tmp14 * m23 + tmp17 * m33));
    out.zy =
      d *
      (tmp13 * m03 +
        tmp18 * m23 +
        tmp21 * m33 -
        (tmp12 * m03 + tmp19 * m23 + tmp20 * m33));
    out.zz =
      d *
      (tmp14 * m03 +
        tmp19 * m13 +
        tmp22 * m33 -
        (tmp15 * m03 + tmp18 * m13 + tmp23 * m33));
    out.zw =
      d *
      (tmp17 * m03 +
        tmp20 * m13 +
        tmp23 * m23 -
        (tmp16 * m03 + tmp21 * m13 + tmp22 * m23));
    out.wx =
      d *
      (tmp14 * m22 +
        tmp17 * m32 +
        tmp13 * m12 -
        (tmp16 * m32 + tmp12 * m12 + tmp15 * m22));
    out.wy =
      d *
      (tmp20 * m32 +
        tmp12 * m02 +
        tmp19 * m22 -
        (tmp18 * m22 + tmp21 * m32 + tmp13 * m02));
    out.wz =
      d *
      (tmp18 * m12 +
        tmp23 * m32 +
        tmp15 * m02 -
        (tmp22 * m32 + tmp14 * m02 + tmp19 * m12));
    out.ww =
      d *
      (tmp22 * m22 +
        tmp16 * m02 +
        tmp21 * m12 -
        (tmp20 * m12 + tmp23 * m22 + tmp17 * m02));

    return out;
  }

  /**
   * Copy matrix values into a new matrix
   *
   * @param out optional matrix to store result
   * @return out or new matrix
   */
  public copy(out = new Mat4()) {
    out.xx = this.xx;
    out.xy = this.xy;
    out.xz = this.xz;
    out.xw = this.xw;
    out.yx = this.yx;
    out.yy = this.yy;
    out.yz = this.yz;
    out.yw = this.yw;
    out.zx = this.zx;
    out.zy = this.zy;
    out.zz = this.zz;
    out.zw = this.zw;
    out.wx = this.wx;
    out.wy = this.wy;
    out.wz = this.wz;
    out.ww = this.ww;

    return out;
  }

  /**
   * Takes two 4-by-4 matrices, a and b, and computes the product in the order
   * that pre-composes b with a.  In other words, the matrix returned will
   * transform by b first and then a.  Note this is subtly different from just
   * multiplying the matrices together.  For given a and b, this function returns
   * the same object in both row-major and column-major mode.
   *
   * @param b A matrix.
   * @param out optional matrix to store result
   * @return out or a new matrix if none provided
   */
  public multiply(b: Mat4, out = new Mat4()) {
    const b00 = b.xx;
    const b01 = b.xy;
    const b02 = b.xz;
    const b03 = b.xw;
    const b10 = b.yx;
    const b11 = b.yy;
    const b12 = b.yz;
    const b13 = b.yw;
    const b20 = b.zx;
    const b21 = b.zy;
    const b22 = b.zz;
    const b23 = b.zw;
    const b30 = b.wx;
    const b31 = b.wy;
    const b32 = b.wz;
    const b33 = b.ww;
    const a00 = this.xx;
    const a01 = this.xy;
    const a02 = this.xz;
    const a03 = this.xw;
    const a10 = this.yx;
    const a11 = this.yy;
    const a12 = this.yz;
    const a13 = this.yw;
    const a20 = this.zx;
    const a21 = this.zy;
    const a22 = this.zz;
    const a23 = this.zw;
    const a30 = this.wx;
    const a31 = this.wy;
    const a32 = this.wz;
    const a33 = this.ww;
    out.xx = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    out.xy = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    out.xz = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    out.xw = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    out.yx = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    out.yy = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    out.yz = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    out.yw = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    out.zx = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    out.zy = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    out.zz = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    out.zw = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    out.wx = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    out.wy = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    out.wz = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    out.ww = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

    return out;
  }

  /**
   * Transposes a matrix.
   * @param m matrix to transpose.
   * @param out optional matrix to store result
   * @return out or a new matrix if none provided
   */
  public transpose(out = new Mat4()) {
    const xx = this.xx;
    const xy = this.xy;
    const xz = this.xz;
    const xw = this.xw;
    const yx = this.yx;
    const yy = this.yy;
    const yz = this.yz;
    const yw = this.yw;
    const zx = this.zx;
    const zy = this.zy;
    const zz = this.zz;
    const zw = this.zw;
    const wx = this.wx;
    const wy = this.wy;
    const wz = this.wz;
    const ww = this.ww;
    out.xx = xx;
    out.xy = yx;
    out.xz = zx;
    out.xw = wx;
    out.yx = xy;
    out.yy = yy;
    out.yz = zy;
    out.yw = wy;
    out.zx = xz;
    out.zy = yz;
    out.zz = zz;
    out.zw = wz;
    out.wx = xw;
    out.wy = yw;
    out.wz = zw;
    out.ww = ww;

    return out;
  }

  public toTypedArray(out = new Float32Array(16)) {
    out[0] = this.xx;
    out[1] = this.xy;
    out[2] = this.xz;
    out[3] = this.xw;
    out[4] = this.yx;
    out[5] = this.yy;
    out[6] = this.yz;
    out[7] = this.yw;
    out[8] = this.zx;
    out[9] = this.zy;
    out[10] = this.zz;
    out[11] = this.zw;
    out[12] = this.wx;
    out[13] = this.wy;
    out[14] = this.wz;
    out[15] = this.ww;
    return out;
  }

  /**
   * Mutliply by translation matrix.
   *
   * @param translation the translation in a vector.
   * @param out optional matrix to store result
   * @return out or a current matrix if none provided
   */
  public translate(translation: Vec3, out = new Mat4()) {
    const m00 = this.xx;
    const m01 = this.xy;
    const m02 = this.xz;
    const m03 = this.xw;
    const m10 = this.yx;
    const m11 = this.yy;
    const m12 = this.yz;
    const m13 = this.yw;
    const m20 = this.zx;
    const m21 = this.zy;
    const m22 = this.zz;
    const m23 = this.zw;
    const m30 = this.wx;
    const m31 = this.wy;
    const m32 = this.wz;
    const m33 = this.ww;

    if (this !== out) {
      out.xx = m00;
      out.xy = m01;
      out.xz = m02;
      out.xw = m03;
      out.yx = m10;
      out.yy = m11;
      out.yz = m12;
      out.yw = m13;
      out.zx = m20;
      out.zy = m21;
      out.zz = m22;
      out.zw = m23;
    }

    out.wx =
      m00 * translation.x + m10 * translation.y + m20 * translation.z + m30;
    out.wy =
      m01 * translation.x + m11 * translation.y + m21 * translation.z + m31;
    out.wz =
      m02 * translation.x + m12 * translation.y + m22 * translation.z + m32;
    out.ww =
      m03 * translation.x + m13 * translation.y + m23 * translation.z + m33;

    return out;
  }

  /**
   * Takes a  matrix and a vector with 4 entries, transforms that vector by
   * the matrix, and returns the result as a vector with 4 entries.
   *
   * @param v The point in homogenous coordinates.
   * @param out optional vector4 to store result
   * @return out or new Vector4 if not provided
   */
  public transformVector(v: Vec4, out = new Vec4()) {
    out.x = 0;
    out.x += v.x * this.xx;
    out.x += v.y * this.yx;
    out.x += v.z * this.zx;
    out.x += v.w * this.wx;
    out.y = 0;
    out.y += v.x * this.xy;
    out.y += v.y * this.yy;
    out.y += v.z * this.zy;
    out.y += v.w * this.wy;
    out.z = 0;
    out.z += v.x * this.xz;
    out.z += v.y * this.yz;
    out.z += v.z * this.zz;
    out.z += v.w * this.wz;
    out.w = 0;
    out.w += v.x * this.xw;
    out.w += v.y * this.yw;
    out.w += v.z * this.zw;
    out.w += v.w * this.ww;

    return out;
  }
}
