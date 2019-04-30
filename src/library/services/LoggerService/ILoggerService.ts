export interface ILoggerService {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
  trace(): void;
}

export default ILoggerService;
