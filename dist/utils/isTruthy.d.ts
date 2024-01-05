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
export declare const isTruthy: <T>(value?: false | T | null | undefined) => value is T;
