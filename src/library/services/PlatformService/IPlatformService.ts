export interface IPlatformService {
  cancelAnimationFrame(id: number): void;
  requestAnimationFrame(frameRequestCallback: (time: number) => void): number;
  now(): number;
}
