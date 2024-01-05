"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTruthy = void 0;
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
const isTruthy = (value) => !!value;
exports.isTruthy = isTruthy;
