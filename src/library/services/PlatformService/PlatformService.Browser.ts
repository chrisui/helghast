import {IPlatformService} from './IPlatformService';

export class PlatformService implements IPlatformService {
  public cancelAnimationFrame(id: number) {
    return cancelAnimationFrame(id);
  }

  public requestAnimationFrame(frameRequestCallback: (time: number) => void) {
    return requestAnimationFrame(frameRequestCallback);
  }

  public now() {
    return performance.now();
  }
}
