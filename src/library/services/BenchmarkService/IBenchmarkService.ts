export interface IBenchmarkService {
  start(name: string): void;
  end(name: string): void;
  push(name: string, value: number): void;
  flush(): [string, number][];
}

export default IBenchmarkService;
