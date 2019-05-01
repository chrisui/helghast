import {Mat4} from '../Mat4';
import {degToRad, Vec3, Vec4} from '../../maths';

// @ts-ignore
import {m4 as Ref} from './reference';

test('initialises empty', () => {
  const a = new Mat4();
  expect(a).toMatchObject({xx: 0});
});

test('initialises an identity', () => {
  const a = Mat4.identity();
  const b = Ref.identity();
  expect(a.toTypedArray()).toMatchObject(b);
});

test('initialises a translation', () => {
  const a = Mat4.translation(Vec3.create(1, 2, 3));
  const b = Ref.translation(1, 2, 3);
  expect(a.toTypedArray()).toMatchObject(b);
});

test('initialises a perspective', () => {
  const a = Mat4.perspective(degToRad(60), 1000 / 500, 1, 2000);
  const b = Ref.perspective(degToRad(60), 1000 / 500, 1, 2000);
  expect(a.toTypedArray()).toMatchObject(b);
});

test('initialises a lookAt', () => {
  const a = Mat4.lookAt(
    Vec3.create(1, 2, 3),
    Vec3.create(4, 5, 6),
    Vec3.create(0, 1, 0),
  );
  const b = Ref.lookAt([1, 2, 3], [4, 5, 6], [0, 1, 0]);
  expect(a.toTypedArray()).toMatchObject(b);
});

test('initialises a yRotation', () => {
  const a = Mat4.yRotation(degToRad(145));
  const b = Ref.yRotation(degToRad(145));
  expect(a.toTypedArray()).toMatchObject(b);
});

test('initialises a xRotation', () => {
  const a = Mat4.xRotation(degToRad(145));
  const b = Ref.xRotation(degToRad(145));
  expect(a.toTypedArray()).toMatchObject(b);
});

test('inverses', () => {
  const a = Mat4.xRotation(degToRad(45)).inverse();
  const b = Ref.inverse(Ref.xRotation(degToRad(45)));
  expect(a.toTypedArray()).toMatchObject(b);
});

test('copies', () => {
  const a = Mat4.identity();
  const b = a.copy();
  expect(a).not.toBe(b);
});

test('multiplies', () => {
  const a = Mat4.xRotation(degToRad(45)).multiply(
    Mat4.translation(Vec3.create(3, 6, 9)),
  );
  const b = Ref.multiply(Ref.xRotation(degToRad(45)), Ref.translation(3, 6, 9));
  expect(a.toTypedArray()).toMatchObject(b);
});

test('transposes', () => {
  const a = Mat4.xRotation(degToRad(45)).transpose();
  const b = Ref.transpose(Ref.xRotation(degToRad(45)));
  expect(a.toTypedArray()).toMatchObject(b);
});

test('translates', () => {
  const a = Mat4.identity().translate(Vec3.create(3, 6, 9));
  const b = Ref.translate(Ref.identity(), 3, 6, 9);
  expect(a.toTypedArray()).toMatchObject(b);
});

test('transforms vectors', () => {
  const a = Mat4.xRotation(degToRad(45))
    .translate(Vec3.create(3, 6, 9))
    .transformVector(Vec4.create(1, 2, 3, 1));
  const b = Ref.transformVector(
    Ref.translate(Ref.xRotation(degToRad(45)), 3, 6, 9),
    [1, 2, 3, 1],
  );
  expect(a.toTypedArray()).toMatchObject(b);
});
