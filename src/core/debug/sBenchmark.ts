import now from '../platform/now';

export class Benchmark {
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
  public flushTimings() {
    return this.timings.splice(0);
  }
}

export default new Benchmark();
