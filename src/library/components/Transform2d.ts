import {Vec2} from '../../core/maths/Vec2';

/** A component representing a heirarcheal transform in 2d space */
export class Transform2d {
  /** The local 3d position */
  public position: Vec2 = new Vec2();
  /** The local orientation */
  public rotation: number = 0;
  /** The local scale */
  public scale: Vec2 = Vec2.create(1, 1);
}
