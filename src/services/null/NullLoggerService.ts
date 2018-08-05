import ILoggerService from '../interfaces/ILoggerService';

export class NullLoggerService implements ILoggerService {
  public info(msg: string) {
    return undefined;
  }
  public warn(msg: string) {
    return undefined;
  }
  public error(msg: string) {
    return undefined;
  }
  public trace() {
    return undefined;
  }
}

export default NullLoggerService;
