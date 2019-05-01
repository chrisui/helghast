import {IGraphicsService} from './IGraphicsService';

export class GraphicsService implements IGraphicsService {
  private gl!: WebGL2RenderingContext;

  public bindContext(gl: WebGL2RenderingContext) {
    this.gl = gl;
  }

  public getContext() {
    return this.gl;
  }

  public createProgram(vert: string, frag: string) {
    const prog = this.gl.createProgram() as WebGLProgram;
    const vertShader = this.createShader(this.gl.VERTEX_SHADER, vert);
    const fragShader = this.createShader(this.gl.FRAGMENT_SHADER, frag);
    this.gl.attachShader(prog, vertShader);
    this.gl.attachShader(prog, fragShader);
    this.gl.linkProgram(prog);
    const success = this.gl.getProgramParameter(prog, this.gl.LINK_STATUS);
    if (success) {
      return prog;
    }

    const log = this.gl.getProgramInfoLog(prog);
    this.gl.deleteProgram(prog);
    throw new Error(log || undefined);
  }

  private createShader(shaderType: number, source: string) {
    const shader = this.gl.createShader(shaderType) as WebGLShader;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    const log = this.gl.getShaderInfoLog(shader);
    this.gl.deleteShader(shader);
    throw new Error(log || undefined);
  }
}
