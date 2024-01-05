/**
 * @description Checks if a value is truthy.
 *
 * @param value - The value to check.
 * @returns Whether the value is truthy.
 *
 * @example
 * ```ts
 * isTruthy("foo"); // true
 * isTruthy(""); // false
 * ```
 *
 */
export const isTruthy = <T>(value?: T | undefined | null | false): value is T =>
	!!value;
