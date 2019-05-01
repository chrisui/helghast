// @ts-ignore
import {Benchmark} from './core/benchmark';
import {Mat4} from './core/maths';
// @ts-ignore
import m4 from './core/maths/__tests__/reference';

const suite = new Benchmark.Suite();

const identityAA = Mat4.identity();
const identityAB = Mat4.identity();
const identityBA = m4.identity();
const identityBB = m4.identity();
const outA = Mat4.identity();
const outB = m4.identity();

// add tests
suite
  .add('Mat4::constructor', function() {
    identityAA.multiply(identityAB, outA);
  })
  .add('Float32Array::constructor', function() {
    m4.multiply(identityBA, identityBB, outB);
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({async: true});
