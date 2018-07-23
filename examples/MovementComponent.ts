/** A simple script component for managing movement of an entity based on user input */
export class MovementComponent extends ScriptComponent {
  /** Re-usable vector depicting directional force */
  public force: Vec3 = new Vec3();

  /** Designer-controllable speed multiplier */
  @attribute({
    min: 0.05,
    max: 0.5,
    precision: 2,
    description: 'Controls the movement speed',
  })
  public speed: number = 0.1;
}

/** Update a given MovementComponent instance */
export function update(component: MovementComponent, dt: Number) {
  let forceX = 0;
  let forceZ = 0;
  const {force, game, speed} = component;

  // calculate force based on pressed keys
  if (Input.isPressed(game.input, Input.KEY_LEFT)) {
    forceX = -speed;
  }

  if (Input.isPressed(game.input, Input.KEY_RIGHT)) {
    forceX += speed;
  }

  if (Input.isPressed(game.input, Input.KEY_UP)) {
    forceZ = -speed;
  }

  if (Input.isPressed(game.input, Input.KEY_DOWN)) {
    forceZ += speed;
  }

  force.x = forceX;
  force.z = forceZ;

  // if we have some non-zero force
  if (Vec3.length(force)) {
    // calculate force vector
    let rX = Math.cos(-Math.PI * 0.25);
    let rY = Math.sin(-Math.PI * 0.25);
    Vec3.set(
      force,
      force.x * rX - force.z * rY,
      0,
      force.z * rX + force.x * rY,
    );

    // clamp force to the speed
    if (force.length() > speed) {
      force.normalize().scale(speed);
    }
  }

  // apply impulse to move the entity
  RigidBody.applyImpulse(component.entity.rigidbody, component.force);
}

export default MovementComponent;
