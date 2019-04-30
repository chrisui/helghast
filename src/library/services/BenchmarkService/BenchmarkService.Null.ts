import IBenchmarkService from './IBenchmarkService';

export class BenchmarkService implements IBenchmarkService {
  public start(key: string) {
    return undefined;
  }
  public end(key: string) {
    return undefined;
  }
  public push(key: string, timing: number) {
    return undefined;
  }
  public flush() {
    return [];
  }
}
