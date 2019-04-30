import ILoggerService from './ILoggerService';

export class LoggerService implements ILoggerService {
  public info(msg: string) {
    // tslint:disable-next-line no-console
    console.log(msg);
  }
  public warn(msg: string) {
    // tslint:disable-next-line no-console
    console.warn(msg);
  }
  public error(msg: string) {
    // tslint:disable-next-line no-console
    console.error(msg);
  }
  public trace() {
    // tslint:disable-next-line no-console
    console.trace();
  }
}
