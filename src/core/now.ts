/**
 * Get current timestamp as precisely as possible
 * @description Note the returned value should only be used for relative sums over time
 */
export const now =
  typeof window !== 'undefined' && window.performance && window.performance.now
    ? window.performance.now
    : () => Date.now();

export default now;
