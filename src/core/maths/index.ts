export {Mat3} from './Mat3';
export {Mat4} from './Mat4';
export {Vec2} from './Vec2';
export {Vec3} from './Vec3';
export {Vec4} from './Vec4';
export {Quat} from './Quat';

export function radToDeg(radians: number) {
  return (radians * 180) / Math.PI;
}

export function degToRad(degrees: number) {
  return (degrees * Math.PI) / 180;
}
