"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifySafe = void 0;
const json_stringify_safe_1 = __importDefault(require("json-stringify-safe"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifySafe = (data) => {
    return Object.defineProperty(data, "stringifySafe", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: (serializer = null, indent = "") => {
            return (0, json_stringify_safe_1.default)(this, serializer, indent, (_key, value) => {
                return {
                    sys: {
                        type: "Link",
                        linkType: "Entry",
                        id: value.sys.id,
                        circular: true,
                    },
                };
            });
        },
    });
};
exports.stringifySafe = stringifySafe;
