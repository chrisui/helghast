import {Vec3} from '../Vec3';

// @ts-ignore
import {m4 as Ref} from './reference';

test('initialises empty', () => {
  const a = new Vec3();
  expect(a).toMatchObject({x: 0, y: 0, z: 0});
});

test('subtracts', () => {
  const a = Vec3.create(3, 6, 9);
  const b = Vec3.create(1, 2, 3);
  expect(a.subtract(b).toTypedArray()).toMatchObject(
    Ref.subtractVectors([3, 6, 9], [1, 2, 3]),
  );
});

test('crosses', () => {
  const a = Vec3.create(3, 6, 9);
  const b = Vec3.create(1, 2, 3);
  expect(a.cross(b).toTypedArray()).toMatchObject(
    Ref.cross([3, 6, 9], [1, 2, 3]),
  );
});

test('copies', () => {
  const a = Vec3.create(3, 6, 9);
  const b = a.copy();
  expect(a).not.toBe(b);
});

test('normalizes', () => {
  const a = Vec3.create(3, 6, 15).normalize();
  expect(a.toTypedArray()).toMatchObject(Ref.normalize([3, 6, 15]));
});
