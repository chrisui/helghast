import Application, {tick} from './framework/Application';
import * as MouseInput from './systems/input/MouseInput';
import * as GamePadsInput from './systems/input/GamePadsInput';
import * as KeyboardInput from './systems/input/KeyboardInput';

const app = new Application();
const mouseInput = new MouseInput.MouseInput();
const gamePadsInput = new GamePadsInput.GamePadsInput();
const keyboardInput = new KeyboardInput.KeyboardInput();

MouseInput.attach(mouseInput);
KeyboardInput.attach(keyboardInput);

function testUpdate() {
  MouseInput.update(mouseInput);
  GamePadsInput.update(gamePadsInput);
  KeyboardInput.update(keyboardInput);
}

tick(app, undefined, testUpdate);
