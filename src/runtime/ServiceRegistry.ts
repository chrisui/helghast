import * as InputService from '../library/services/InputService';
import * as BenchmarkService from '../library/services/BenchmarkService';
import * as LoggerService from '../library/services/LoggerService';
import * as PlatformService from '../library/services/PlatformService';

export class ServiceRegistry {
  public static input: InputService.Interface = new InputService.Null();
  public static benchmark: BenchmarkService.Interface = new BenchmarkService.Null();
  public static log: LoggerService.Interface = new LoggerService.Null();
  public static platform: PlatformService.Interface = new PlatformService.Null();
}

export default ServiceRegistry;
