// path: src/utils/envHelper.ts

/**
 * Retrieves an environment variable value.
 * Falls back to a default value if the variable is not set.
 * Throws if no default is provided and the variable is missing.
 *
 * @param key - The environment variable name.
 * @param defaultValue - Optional fallback value.
 * @returns The resolved environment variable value.
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: "${key}"`);
  }
  return value;
}

/** SauceDemo test user credentials. */
export const Users = {
  STANDARD: {
    username: getEnv('STANDARD_USER', 'standard_user'),
    password: getEnv('USER_PASSWORD', 'secret_sauce'),
  },
  LOCKED_OUT: {
    username: getEnv('LOCKED_OUT_USER', 'locked_out_user'),
    password: getEnv('USER_PASSWORD', 'secret_sauce'),
  },
  PROBLEM: {
    username: getEnv('PROBLEM_USER', 'problem_user'),
    password: getEnv('USER_PASSWORD', 'secret_sauce'),
  },
  PERFORMANCE_GLITCH: {
    username: getEnv('PERFORMANCE_GLITCH_USER', 'performance_glitch_user'),
    password: getEnv('USER_PASSWORD', 'secret_sauce'),
  },
  ERROR: {
    username: getEnv('ERROR_USER', 'error_user'),
    password: getEnv('USER_PASSWORD', 'secret_sauce'),
  },
  VISUAL: {
    username: getEnv('VISUAL_USER', 'visual_user'),
    password: getEnv('USER_PASSWORD', 'secret_sauce'),
  },
  INVALID: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const;

export type UserCredentials = { username: string; password: string };
