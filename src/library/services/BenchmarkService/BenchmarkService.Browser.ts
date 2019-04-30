import {IBenchmarkService} from './IBenchmarkService';
import Services from '../../../runtime/ServiceRegistry';

export class BenchmarkService implements IBenchmarkService {
  private startTimes: {[key: string]: number} = {};
  private timings: [string, number][] = [];
  public start(key: string) {
    this.startTimes[key] = Services.platform.now();
  }
  public end(key: string) {
    this.timings.push([key, Services.platform.now() - this.startTimes[key]]);
  }
  public push(key: string, timing: number) {
    this.timings.push([key, timing]);
  }
  public flush() {
    return this.timings.splice(0);
  }
}

export default BenchmarkService;
