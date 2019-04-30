import {Vec2} from '../../core/maths/Vec2';
import {Vec3} from '../../core/maths/Vec3';

/** Component representing a rectangle drawn on a 2d canvas */
export class Rect2d {
  /** 2d Position x,y */
  public position: Vec2 = Vec2.create();
  /** 2d dimensions w,h */
  public dimensions: Vec2 = Vec2.create();
  /** fill color r,g,b */
  public fillColor: Vec3 = Vec3.create();
}
