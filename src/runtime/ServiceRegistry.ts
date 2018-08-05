import IInputService from '../services/interfaces/IInputService';
import NullInputService from '../services/null/NullInputService';

import IBenchmarkService from '../services/interfaces/IBenchmarkService';
import NullBenchmarkService from '../services/null/NullBenchmarkService';

import ILoggerService from '../services/interfaces/ILoggerService';
import NullLoggerService from '../services/null/NullLoggerService';

export class ServiceRegistry {
  public static input: IInputService = new NullInputService();
  public static benchmark: IBenchmarkService = new NullBenchmarkService();
  public static log: ILoggerService = new NullLoggerService();
}

export default ServiceRegistry;
