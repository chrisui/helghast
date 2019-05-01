// import framework
import {Application} from './framework/Application';
import {World} from './framework/World';

// import runtime
import {Services} from './runtime/Services';

// import services
import * as InputService from './library/services/InputService';
import * as BenchmarkService from './library/services/BenchmarkService';
import * as LoggerService from './library/services/LoggerService';
import * as PlatformService from './library/services/PlatformService';
import * as GraphicsService from './library/services/GraphicsService';

// import systems
import {GameManager} from './library/systems/GameManager';
import {DebugManager} from './library/systems/DebugManager';
import {GamepadInputter} from './library/systems/GamepadInputter';
import {KeyboardInputter} from './library/systems/KeyboardInputter';
import {MouseInputter} from './library/systems/MouseInputter';
import {Tester} from './library/systems/Tester';
import {Renderer} from './library/systems/Renderer';
import {PhysicsManager} from './library/systems/PhysicsManager';

// import resources
import {Game} from './library/resources/Game';
import {DebugFrames} from './library/resources/DebugFrames';
import {Keyboard} from './library/resources/Keyboard';
import {Mouse} from './library/resources/Mouse';
import {Gamepads} from './library/resources/Gamepads';

// import components
import {Transform} from './library/components/Transform';
import {Velocity} from './library/components/Velocity';
import {Player} from './library/components/Player';

// configure services
Services.input = new InputService.Browser();
// Services.benchmark = new BenchmarkService.Browser();
Services.log = new LoggerService.Browser();
Services.platform = new PlatformService.Browser();
Services.graphics = new GraphicsService.Browser();
const canvas = document.querySelector('#app') as HTMLCanvasElement;
const gl = canvas.getContext('webgl2', {
  desynchronized: true,
  // preserveDrawingBuffer: true
}) as WebGL2RenderingContext;
Services.graphics.bindContext(gl);

// setup application with resources, systems and entities
const app = new Application();
World.addResource(app.world, Game);
World.addResource(app.world, DebugFrames);
World.addResource(app.world, Keyboard);
World.addResource(app.world, Mouse);
World.addResource(app.world, Gamepads);
World.addSystem(app.world, GameManager);
World.addSystem(app.world, MouseInputter);
World.addSystem(app.world, KeyboardInputter);
World.addSystem(app.world, GamepadInputter);
World.addSystem(app.world, Tester);
World.addSystem(app.world, PhysicsManager);
World.addSystem(app.world, Renderer);
// World.addSystem(app.world, DebugManager);

for (let i = 0; i < 5000; i++) {
  const transform = new Transform();
  transform.position.x = i * 10;
  transform.position.y = 0;
  transform.position.z = -300 - i * 10;
  const components =
    i === 0
      ? [transform, new Velocity(), new Player()]
      : [transform, new Velocity()];
  World.createEntity(app.world, components);
}
World.setup(app.world);

// step on button click
(document.getElementById('step') as HTMLButtonElement).addEventListener(
  'click',
  () => {
    Application.update(app);
  },
);

Application.tick(app);
