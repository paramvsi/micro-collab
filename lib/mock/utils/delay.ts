/**
 * Network delay simulation for realistic mock API behavior
 *
 * Simulates realistic network latency to:
 * - Test loading states accurately
 * - Optimize perceived performance
 * - Ensure smooth transitions
 * - Identify race conditions
 */

/**
 * Simulate network delay with random variance
 * @param ms Base delay in milliseconds
 * @param variance Random variance (0-1, default 0.3 = ±30%)
 * @returns Promise that resolves after delay
 */
export const delay = (ms: number = 150, variance: number = 0.3): Promise<void> => {
  const minDelay = ms * (1 - variance);
  const maxDelay = ms * (1 + variance);
  const actualDelay = Math.random() * (maxDelay - minDelay) + minDelay;

  return new Promise(resolve => setTimeout(resolve, actualDelay));
};

/**
 * Predefined delay presets for different operation types
 */
export const DELAY_PRESETS = {
  /** Fast read operations (100-150ms) */
  FAST: () => delay(100, 0.5),

  /** Normal operations (150-200ms) */
  NORMAL: () => delay(150, 0.3),

  /** Write operations (200-300ms) */
  WRITE: () => delay(200, 0.5),

  /** Complex operations (300-500ms) */
  COMPLEX: () => delay(400, 0.25),

  /** Instant (for testing) */
  INSTANT: () => Promise.resolve()
} as const;

/**
 * Simulate network delay based on operation type
 * @param operation Operation type
 * @returns Promise that resolves after appropriate delay
 */
export const simulateNetworkDelay = async (
  operation: 'read' | 'write' | 'delete' | 'update' = 'read'
): Promise<void> => {
  switch (operation) {
    case 'read':
      return DELAY_PRESETS.FAST();
    case 'write':
    case 'update':
      return DELAY_PRESETS.WRITE();
    case 'delete':
      return DELAY_PRESETS.NORMAL();
    default:
      return DELAY_PRESETS.NORMAL();
  }
};

/**
 * Wrap async function with simulated network delay
 * @param fn Async function to wrap
 * @param delayMs Delay in milliseconds
 * @returns Wrapped function with delay
 */
export const withDelay = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delayMs: number = 150
): T => {
  return (async (...args: Parameters<T>) => {
    await delay(delayMs);
    return fn(...args);
  }) as T;
};
