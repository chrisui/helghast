// todo: use KeyboardEvent.code instead of .key
//       https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
export enum Key {
  Backspace = 'Backspace',
  Tab = 'Tab',
  Enter = 'Enter',
  Shift = 'Shift',
  Control = 'Control',
  Alt = 'Alt',
  CapsLock = 'CapsLock',
  Escape = 'Escape',
  Space = ' ',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
  End = 'End',
  Home = 'Home',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  Left = 'Left',
  Up = 'Up',
  Right = 'Right',
  Down = 'Down',
  Insert = 'Insert',
  Delete = 'Delete',
  Zero = '0',
  ClosedParen = ')',
  One = '1',
  ExclamationMark = '!',
  Two = '2',
  AtSign = '@',
  Three = '3',
  PoundSign = '#',
  Hash = '#',
  Four = '4',
  DollarSign = '$',
  Five = '5',
  PercentSign = '%',
  Six = '6',
  Caret = '^',
  Hat = '^',
  Seven = '7',
  Ampersand = '&',
  Eight = '8',
  Star = '*',
  Asterik = '*',
  Nine = '9',
  OpenParen = '(',
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
  e = 'e',
  f = 'f',
  g = 'g',
  h = 'h',
  i = 'i',
  j = 'j',
  k = 'k',
  l = 'l',
  m = 'm',
  n = 'n',
  o = 'o',
  p = 'p',
  q = 'q',
  r = 'r',
  s = 's',
  t = 't',
  u = 'u',
  v = 'v',
  w = 'w',
  x = 'x',
  y = 'y',
  z = 'z',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  T = 'T',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
  Meta = 'Meta',
  LeftWindowKey = 'Meta',
  RightWindowKey = 'Meta',
  Numpad0 = '0',
  Numpad1 = '1',
  Numpad2 = '2',
  Numpad3 = '3',
  Numpad4 = '4',
  Numpad5 = '5',
  Numpad6 = '6',
  Numpad7 = '7',
  Numpad8 = '8',
  Numpad9 = '9',
  Multiply = '*',
  Add = '+',
  Subtract = '-',
  DecimalPoint = '.',
  Divide = '/',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12',
  NumLock = 'NumLock',
  ScrollLock = 'ScrollLock',
  SemiColon = ';',
  Equals = '=',
  Comma = ',',
  Dash = '-',
  Period = '.',
  UnderScore = '_',
  PlusSign = '+',
  ForwardSlash = '/',
  Tilde = '~',
  GraveAccent = '`',
  OpenBracket = '[',
  ClosedBracket = ']',
  Quote = "'",
}

interface IKeyStates {
  [key: string]: boolean;
}

export class KeyboardInput {
  public keyStates: IKeyStates = {};
  public tmpKeyStates: IKeyStates = {};
  public lastKeyStates: IKeyStates = {};
}

export function update(keyboardInput: KeyboardInput) {
  for (const i in keyboardInput.tmpKeyStates) {
    if (keyboardInput.tmpKeyStates.hasOwnProperty(i)) {
      keyboardInput.lastKeyStates[i] = keyboardInput.keyStates[i];
      keyboardInput.keyStates[i] = keyboardInput.tmpKeyStates[i];
    }
  }
}

export function isPressed(keyboardInput: KeyboardInput, key: Key) {
  return !!keyboardInput.keyStates[key];
}

/** Was a given button pressed in this update? */
export function wasPressed(keyboardInput: KeyboardInput, key: Key): boolean {
  const isPressedNow = !!keyboardInput.keyStates[key];
  const wasPressedLast = !!keyboardInput.lastKeyStates[key];

  return isPressedNow && !wasPressedLast;
}

export function attach(keyboardInput: KeyboardInput, el = window) {
  // todo: create dom event manager
  el.addEventListener('keydown', (event) =>
    handleKeyDown(keyboardInput, event)
  );
  el.addEventListener('keyup', (event) => handleKeyUp(keyboardInput, event));
}

export function detach(keyboardInput: KeyboardInput, el = window) {
  // todo: handle removing listeners
}

function handleKeyDown(keyboardInput: KeyboardInput, event: KeyboardEvent) {
  keyboardInput.tmpKeyStates[event.key] = true;
}

function handleKeyUp(keyboardInput: KeyboardInput, event: KeyboardEvent) {
  keyboardInput.tmpKeyStates[event.key] = false;
}
