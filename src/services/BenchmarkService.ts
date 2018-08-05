import now from '../core/platform/now';
import IBenchmarkService from './interfaces/IBenchmarkService';

export class BenchmarkService implements IBenchmarkService {
  private startTimes: {[key: string]: number} = {};
  private timings: [string, number][] = [];
  public start(key: string) {
    this.startTimes[key] = now();
  }
  public end(key: string) {
    this.timings.push([key, now() - this.startTimes[key]]);
  }
  public push(key: string, timing: number) {
    this.timings.push([key, timing]);
  }
  public flush() {
    return this.timings.splice(0);
  }
}

export default BenchmarkService;
