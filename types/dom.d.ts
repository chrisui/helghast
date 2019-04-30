interface Document {
  pointerLockElement: boolean;
  exitPointerLock(): void;
}

interface HtmlElement {
  requestPointerLock(): void;
}
