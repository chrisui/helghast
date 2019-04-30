import {IPlatformService} from './IPlatformService';

export class PlatformService implements IPlatformService {
  public cancelAnimationFrame() {
    return;
  }

  public requestAnimationFrame() {
    return 0;
  }

  public now() {
    return 0;
  }
}

export default PlatformService;
