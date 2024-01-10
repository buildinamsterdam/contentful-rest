"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ContentfulAdaptor_pageAdaptors, _ContentfulAdaptor_contentAdaptors, _ContentfulAdaptor_adaptData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentfulAdaptor = void 0;
const fallbackPageAdaptor = (x) => x;
/**
 * @function ContentfulAdaptor
 * @description Generate a client to adapt the provided data
 */
class ContentfulAdaptor {
    constructor(args) {
        _ContentfulAdaptor_pageAdaptors.set(this, {});
        _ContentfulAdaptor_contentAdaptors.set(this, {});
        /**
         * @function adaptContentType
         * @description
         */
        _ContentfulAdaptor_adaptData.set(this, (data) => {
            //? Falsey data should always be null so it's parseble by NextJS, 'undefined' throws
            if (!data)
                return null;
            //? If we get an array loop the data so we resolved adapted data
            if (Array.isArray(data)) {
                return data.map((dataEntry) => __classPrivateFieldGet(this, _ContentfulAdaptor_adaptData, "f").call(this, dataEntry));
            }
            if (typeof data !== "object")
                return data;
            const adaptedData = Object.entries(data).reduce((acc, [key, val]) => {
                acc[key] = __classPrivateFieldGet(this, _ContentfulAdaptor_adaptData, "f").call(this, val);
                return acc;
            }, {});
            const adaptor = __classPrivateFieldGet(this, _ContentfulAdaptor_contentAdaptors, "f")[adaptedData.__typename];
            if (!adaptor)
                return adaptedData;
            return adaptor(adaptedData);
        });
        this.adapt = (data) => {
            var _a, _b, _c;
            if (typeof data !== "object" && !Array.isArray(data))
                return null;
            const contentType = ((_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.sys) === null || _a === void 0 ? void 0 : _a.contentType) === null || _b === void 0 ? void 0 : _b.sys) === null || _c === void 0 ? void 0 : _c.id) || "";
            const pageAdaptor = __classPrivateFieldGet(this, _ContentfulAdaptor_pageAdaptors, "f")[contentType] || fallbackPageAdaptor;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return pageAdaptor(__classPrivateFieldGet(this, _ContentfulAdaptor_adaptData, "f").call(this, data));
        };
        const { contentAdaptors = {}, pageAdaptors = {} } = args || {};
        __classPrivateFieldSet(this, _ContentfulAdaptor_contentAdaptors, contentAdaptors, "f");
        __classPrivateFieldSet(this, _ContentfulAdaptor_pageAdaptors, pageAdaptors, "f");
    }
}
exports.ContentfulAdaptor = ContentfulAdaptor;
_ContentfulAdaptor_pageAdaptors = new WeakMap(), _ContentfulAdaptor_contentAdaptors = new WeakMap(), _ContentfulAdaptor_adaptData = new WeakMap();
