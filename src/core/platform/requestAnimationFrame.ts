import now from './now';

/** Optimal frame rate */
const FRAME_RATE = 1000 / 60;

/** Provide fallback to native requestAnimationFrame locked at optimal frame rate */
export function fallbackRequestAnimationFrame(
  callback: (timestamp: number) => void,
) {
  return setTimeout(() => callback(now()), FRAME_RATE);
}

/** request a callback on the next available frame */
export const requestAnimationFrame =
  (typeof window !== 'undefined' &&
    window.requestAnimationFrame.bind(window)) ||
  fallbackRequestAnimationFrame;

export default requestAnimationFrame;
