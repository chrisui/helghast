import {Services} from '../../runtime/Services';
import {Transform} from '../components/Transform';
import {Rect2d} from '../components/Rect2d';
import {Game} from '../resources/Game';
import {Accessor} from '../../framework/Accessor';
import {Mat4, Vec3, Vec4, degToRad} from '../../core/maths';

import objVert from './Renderer/shaders/obj.vert';
import objFrag from './Renderer/shaders/obj.frag';
import skyboxVert from './Renderer/shaders/skybox.vert';
import skyboxFrag from './Renderer/shaders/skybox.frag';

const BENCHMARK_RENDER = 'render';

export class Renderer {
  public static resources = [Game];
  public static components = [Transform, Rect2d];
  public objProgram!: WebGLProgram;
  public objVao!: any;
  public uWorldViewProjectionLocation!: WebGLUniformLocation;
  public uWorldInverseTransposeLocation!: WebGLUniformLocation;
  public uColorLocation!: WebGLUniformLocation;
  public uReverseLightDirectionLocation!: WebGLUniformLocation;
  public skyboxProgram!: WebGLProgram;
  public skyboxVao!: any;
  public uSkyboxLocation!: WebGLUniformLocation;
  public uSkyboxViewDirectionProjectionInverseLocation!: WebGLUniformLocation;
}

export namespace Renderer {
  export function setup(renderer: Renderer) {
    const gl = Services.graphics.getContext() as WebGL2RenderingContext;
    setupSkybox(renderer, gl);
    setupObj(renderer, gl);
  }

  function setupSkybox(renderer: Renderer, gl: WebGL2RenderingContext) {
    const program = Services.graphics.createProgram(
      skyboxVert,
      skyboxFrag,
    ) as WebGLProgram;
    renderer.skyboxProgram = program;
    // look up where the vertex data needs to go.
    const positionLocation = gl.getAttribLocation(program, 'a_position');

    // lookup uniforms
    renderer.uSkyboxLocation = gl.getUniformLocation(
      program,
      'u_skybox',
    ) as WebGLUniformLocation;
    renderer.uSkyboxViewDirectionProjectionInverseLocation = gl.getUniformLocation(
      program,
      'u_viewDirectionProjectionInverse',
    ) as WebGLUniformLocation;

    // Create a vertex array object (attribute state)
    const vao = gl.createVertexArray();
    renderer.skyboxVao = vao;

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);

    // Create a buffer for positions
    const positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Put the positions in the buffer
    const positions = getSkyboxGeometry();
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Turn on the position attribute
    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Create a texture.
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    const faceInfos = [
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: require('../../assets/skyboxes/cloud/pos-x.jpg'),
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: require('../../assets/skyboxes/cloud/neg-x.jpg'),
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: require('../../assets/skyboxes/cloud/pos-y.jpg'),
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: require('../../assets/skyboxes/cloud/neg-y.jpg'),
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: require('../../assets/skyboxes/cloud/pos-z.jpg'),
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: require('../../assets/skyboxes/cloud/neg-z.jpg'),
      },
    ];
    faceInfos.forEach(faceInfo => {
      const {target, url} = faceInfo;

      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 1024;
      const height = 1024;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;

      // setup each face so it's immediately renderable
      gl.texImage2D(
        target,
        level,
        internalFormat,
        width,
        height,
        0,
        format,
        type,
        null,
      );

      // Asynchronously load an image
      const image = new Image();
      image.src = url;
      image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(target, level, internalFormat, format, type, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      });
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(
      gl.TEXTURE_CUBE_MAP,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR,
    );
  }

  function setupObj(renderer: Renderer, gl: WebGL2RenderingContext) {
    const program = Services.graphics.createProgram(
      objVert,
      objFrag,
    ) as WebGLProgram;
    renderer.objProgram = program;

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position',
    );
    const normalAttributeLocation = gl.getAttribLocation(program, 'a_normal');

    // look up uniform locations
    renderer.uWorldViewProjectionLocation = gl.getUniformLocation(
      program,
      'u_worldViewProjection',
    ) as WebGLUniformLocation;
    renderer.uWorldInverseTransposeLocation = gl.getUniformLocation(
      program,
      'u_worldInverseTranspose',
    ) as WebGLUniformLocation;
    renderer.uColorLocation = gl.getUniformLocation(
      program,
      'u_color',
    ) as WebGLUniformLocation;
    renderer.uReverseLightDirectionLocation = gl.getUniformLocation(
      program,
      'u_reverseLightDirection',
    ) as WebGLUniformLocation;

    // Create a buffer
    const positionBuffer = gl.createBuffer();

    // Create a vertex array object (attribute state)
    const vao = gl.createVertexArray();
    renderer.objVao = vao;

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Set Geometry.
    const positions = getFGeometry();
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(
      positionAttributeLocation,
      3, // 3 components per iteration
      gl.FLOAT, // the data is 32bit floats
      false, // don't normalize the data
      0, // 0 = move forward size * sizeof(type) each iteration to get the next position
      0, // start at the beginning of the buffer
    );

    // create the normalr buffer, make it the current ARRAY_BUFFER
    // and copy in the normal values
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    const normals = getFNormals();
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    // Turn on the attribute
    gl.enableVertexAttribArray(normalAttributeLocation);

    // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(
      normalAttributeLocation,
      3, // 3 components per iteration
      gl.FLOAT, // the data is 32bit floats
      false, // don't normalize the data
      0, // 0 = move forward size * sizeof(type) each iteration to get the next position
      0, // start at the beginning of the buffer
    );
  }

  const projectionMatrix = new Mat4();
  const viewProjectionMatrix = new Mat4();
  const skyboxViewDirectionProjectionInverseMatrix = new Mat4();
  const worldMatrix = new Mat4();
  const translationMatrix = new Mat4();
  const worldViewProjectionMatrix = new Mat4();
  const worldInverseMatrix = new Mat4();
  const worldInverseTransposeMatrix = new Mat4();
  const viewMatrixForSkybox = new Mat4();
  const lightDirection = Vec3.create(0.5, 0.7, 1)
    .normalize()
    .toTypedArray();
  const color = Vec4.create(0.2, 1, 0.2, 1).toTypedArray();

  const tmpMatrixArray = new Mat4().toTypedArray();
  let hasDrawn = false;

  export function process(renderer: Renderer, accessor: Accessor) {
    Services.benchmark.start(BENCHMARK_RENDER);
    const game: Game = accessor.get<Immutable<Game>>(Game);
    const entities = accessor.join<[Immutable<Transform>]>(Transform);

    const gl = Services.graphics.getContext() as WebGL2RenderingContext;
    const objProgram = renderer.objProgram;
    const vao = renderer.objVao;
    resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    // gl.clearColor(0, 0, 0, 0);
    // // tslint:disable-next-line no-bitwise
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Compute the matrix
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 1;
    const zFar = 2000;
    const fieldOfViewRadians = degToRad(60);
    Mat4.perspective(fieldOfViewRadians, aspect, zNear, zFar, projectionMatrix);

    // Compute the camera's matrix
    const camera = Vec3.create(100, 150, 200);
    const target = entities[0][0].position;
    const up = Vec3.create(0, 1, 0);
    const cameraMatrix = Mat4.lookAt(camera, target, up);

    // Make a view matrix from the camera matrix.
    const viewMatrix = cameraMatrix.inverse();

    // We only care about direciton so remove the translation
    viewMatrix.copy(viewMatrixForSkybox);
    viewMatrixForSkybox.wx = 0;
    viewMatrixForSkybox.wy = 0;
    viewMatrixForSkybox.wz = 0;

    // create a viewProjection matrix. This will both apply perspective
    // AND move the world so that the camera is effectively the origin
    projectionMatrix.multiply(viewMatrix, viewProjectionMatrix);

    projectionMatrix
      .multiply(viewMatrixForSkybox, skyboxViewDirectionProjectionInverseMatrix)
      .inverse(skyboxViewDirectionProjectionInverseMatrix);

    // -----
    // draw skybox

    // turn on depth testing
    gl.disable(gl.DEPTH_TEST);

    // tell webgl to cull faces
    gl.disable(gl.CULL_FACE);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(renderer.skyboxProgram);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(renderer.skyboxVao);

    // Set the uniforms
    gl.uniformMatrix4fv(
      renderer.uSkyboxViewDirectionProjectionInverseLocation,
      false,
      skyboxViewDirectionProjectionInverseMatrix.toTypedArray(tmpMatrixArray),
    );

    // Tell the shader to use texture unit 0 for u_skybox
    gl.uniform1i(renderer.uSkyboxLocation, 0);

    // Draw the geometry.
    gl.drawArrays(gl.TRIANGLES, 0, 1 * 6);

    // ----
    // draw objects

    // turn on depth testing
    gl.enable(gl.DEPTH_TEST);

    // tell webgl to cull faces
    gl.enable(gl.CULL_FACE);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(objProgram);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);

    for (const [transform] of entities) {
      // Draw a F at the origin with rotation
      Mat4.yRotation(degToRad(transform.rotation.y), worldMatrix);
      Mat4.translation(transform.position, translationMatrix);
      translationMatrix.multiply(worldMatrix, worldMatrix);
      viewProjectionMatrix.multiply(worldMatrix, worldViewProjectionMatrix);
      worldMatrix.inverse(worldInverseMatrix);
      worldInverseMatrix.transpose(worldInverseTransposeMatrix);

      // Set the matrices
      gl.uniformMatrix4fv(
        renderer.uWorldViewProjectionLocation,
        false,
        worldViewProjectionMatrix.toTypedArray(tmpMatrixArray),
      );
      gl.uniformMatrix4fv(
        renderer.uWorldInverseTransposeLocation,
        false,
        worldInverseTransposeMatrix.toTypedArray(tmpMatrixArray),
      );

      // this caching is just for testing, itll never work as is for anything dynamic (much like most of this code atm)
      if (!hasDrawn) {
        // Set the color to use
        gl.uniform4fv(renderer.uColorLocation, color); // green

        // set the light direction.
        gl.uniform3fv(renderer.uReverseLightDirectionLocation, lightDirection);
      }

      // Draw the geometry.
      gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
    }

    hasDrawn = true;
    Services.benchmark.end(BENCHMARK_RENDER);
  }
}

function getFGeometry() {
  // prettier-ignore
  const positions = new Float32Array([
    // left column front
    0,   0,  0,
    0, 150,  0,
    30,   0,  0,
    0, 150,  0,
    30, 150,  0,
    30,   0,  0,

    // top rung front
    30,   0,  0,
    30,  30,  0,
    100,   0,  0,
    30,  30,  0,
    100,  30,  0,
    100,   0,  0,

    // middle rung front
    30,  60,  0,
    30,  90,  0,
    67,  60,  0,
    30,  90,  0,
    67,  90,  0,
    67,  60,  0,

    // left column back
      0,   0,  30,
      30,   0,  30,
      0, 150,  30,
      0, 150,  30,
      30,   0,  30,
      30, 150,  30,

    // top rung back
      30,   0,  30,
    100,   0,  30,
      30,  30,  30,
      30,  30,  30,
    100,   0,  30,
    100,  30,  30,

    // middle rung back
      30,  60,  30,
      67,  60,  30,
      30,  90,  30,
      30,  90,  30,
      67,  60,  30,
      67,  90,  30,

    // top
      0,   0,   0,
    100,   0,   0,
    100,   0,  30,
      0,   0,   0,
    100,   0,  30,
      0,   0,  30,

    // top rung right
    100,   0,   0,
    100,  30,   0,
    100,  30,  30,
    100,   0,   0,
    100,  30,  30,
    100,   0,  30,

    // under top rung
    30,   30,   0,
    30,   30,  30,
    100,  30,  30,
    30,   30,   0,
    100,  30,  30,
    100,  30,   0,

    // between top rung and middle
    30,   30,   0,
    30,   60,  30,
    30,   30,  30,
    30,   30,   0,
    30,   60,   0,
    30,   60,  30,

    // top of middle rung
    30,   60,   0,
    67,   60,  30,
    30,   60,  30,
    30,   60,   0,
    67,   60,   0,
    67,   60,  30,

    // right of middle rung
    67,   60,   0,
    67,   90,  30,
    67,   60,  30,
    67,   60,   0,
    67,   90,   0,
    67,   90,  30,

    // bottom of middle rung.
    30,   90,   0,
    30,   90,  30,
    67,   90,  30,
    30,   90,   0,
    67,   90,  30,
    67,   90,   0,

    // right of bottom
    30,   90,   0,
    30,  150,  30,
    30,   90,  30,
    30,   90,   0,
    30,  150,   0,
    30,  150,  30,

    // bottom
    0,   150,   0,
    0,   150,  30,
    30,  150,  30,
    0,   150,   0,
    30,  150,  30,
    30,  150,   0,

    // left side
    0,   0,   0,
    0,   0,  30,
    0, 150,  30,
    0,   0,   0,
    0, 150,  30,
    0, 150,   0,
  ]);

  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  let matrix = Mat4.xRotation(Math.PI);
  matrix = matrix.translate(Vec3.create(-50, -75, -15));

  for (let ii = 0; ii < positions.length; ii += 3) {
    const vector = matrix.transformVector(
      Vec4.create(positions[ii + 0], positions[ii + 1], positions[ii + 2], 1),
    );
    positions[ii + 0] = vector.x;
    positions[ii + 1] = vector.y;
    positions[ii + 2] = vector.z;
  }

  return positions;
}

function getFNormals() {
  // prettier-ignore
  return new Float32Array([
    // left column front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // top rung front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // middle rung front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // left column back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // top rung back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // middle rung back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // top rung right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // under top rung
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // between top rung and middle
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // top of middle rung
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // right of middle rung
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // bottom of middle rung.
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // right of bottom
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    // left side
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
  ]);
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const width = canvas.clientWidth | 0; // tslint:disable-line no-bitwise
  const height = canvas.clientHeight | 0; // tslint:disable-line no-bitwise
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

// Fill the buffer with the values that define a quad.
function getSkyboxGeometry() {
  // prettier-ignore
  return new Float32Array(
    [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
  ]);
}
