// import framework
import * as App from './framework/Application';

// import runtime
import Services from './runtime/ServiceRegistry';

// import services
import BrowserInputService from './services/BrowserInputService';
import BenchmarkService from './services/BenchmarkService';
import ConsoleLoggerService from './services/ConsoleLoggerService';

// import systems
import * as InputSystem from './systems/InputSystem/InputSystem';

// configure systems
Services.input = new BrowserInputService();
Services.benchmark = new BenchmarkService();
Services.log = new ConsoleLoggerService();

// initialise application
const app = new App.Application();
App.tick(app);
