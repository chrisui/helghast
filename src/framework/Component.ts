export class Component {
  /**
   * Allow for toggling of component state. Systems will skip the respective
   * entity when updating.
   */
  public active: boolean = true;
  /** An id which identifies this type of component */
  public type: string = '<UNSET>';
}
