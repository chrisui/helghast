export class Component {
  /** An id which identifies this type of component */
  public static readonly id: string = '<UNSET>';
  /**
   * Allow for toggling of component state. Systems will skip the respective
   * entity when updating.
   */
  public active: boolean = true;
}
