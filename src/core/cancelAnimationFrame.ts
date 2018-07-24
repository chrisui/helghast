/** Cancel a given animation frame request */
export const cancelAnimationFrame =
  typeof window !== 'undefined' && window.cancelAnimationFrame
    ? window.cancelAnimationFrame
    : clearTimeout;

export default cancelAnimationFrame;
