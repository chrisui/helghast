export interface IGraphicsService {
  createProgram(vert: string, frag: string): WebGLProgram | null;
  getContext(): WebGL2RenderingContext | null;
  bindContext(gl: WebGL2RenderingContext): void;
}
