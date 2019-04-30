// import framework
import * as App from './framework/Application';

// import runtime
import Services from './runtime/ServiceRegistry';

// import services
import * as InputService from './library/services/InputService';
import * as BenchmarkService from './library/services/BenchmarkService';
import * as LoggerService from './library/services/LoggerService';
import * as PlatformService from './library/services/PlatformService';

// import systems
import * as InputSystem from './library/systems/InputSystem/InputSystem';

// configure systems
Services.input = new InputService.Browser();
Services.benchmark = new BenchmarkService.Browser();
Services.log = new LoggerService.Browser();
Services.platform = new PlatformService.Browser();

// initialise application
const app = new App.Application();
App.tick(app);
