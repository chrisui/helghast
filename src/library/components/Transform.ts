import {Vec3} from '../../core/maths/Vec3';
import {Quat} from '../../core/maths/Quat';

/** A component representing a heirarcheal transform in 3d space */
export class Transform {
  /** The local 3d position */
  public position: Vec3 = new Vec3();
  /** The local orientation */
  public orientation: Quat = new Quat();
  /** The local scale */
  public scale: Vec3 = new Vec3();
}
