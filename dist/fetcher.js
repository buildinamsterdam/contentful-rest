"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ContentfulFetcher_config, _ContentfulFetcher_adaptor, _ContentfulFetcher_defaultIsPreview, _ContentfulFetcher_cfFetch;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentfulFetcher = void 0;
const contentful_resolve_response_1 = __importDefault(require("contentful-resolve-response"));
const contentful_graphql_1 = require("@buildinams/contentful-graphql");
const stringifySafe_1 = require("./utils/stringifySafe");
const API_BASE_URL = "https://cdn.contentful.com";
const API_PREVIEW_URL = "https://preview.contentful.com";
class ContentfulFetcher {
    constructor({ config, adaptor, isPreview }) {
        _ContentfulFetcher_config.set(this, void 0);
        _ContentfulFetcher_adaptor.set(this, void 0);
        _ContentfulFetcher_defaultIsPreview.set(this, false);
        _ContentfulFetcher_cfFetch.set(this, (args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isPreview = (args.preview || __classPrivateFieldGet(this, _ContentfulFetcher_defaultIsPreview, "f")) &&
                    Boolean(__classPrivateFieldGet(this, _ContentfulFetcher_config, "f").previewToken);
                const baseUrl = isPreview ? API_PREVIEW_URL : API_BASE_URL;
                const params = new URLSearchParams(Object.assign(Object.assign({}, args.searchParams), { access_token: (isPreview && __classPrivateFieldGet(this, _ContentfulFetcher_config, "f").previewToken) || __classPrivateFieldGet(this, _ContentfulFetcher_config, "f").accessToken }));
                const res = yield fetch(`${baseUrl}/spaces/${__classPrivateFieldGet(this, _ContentfulFetcher_config, "f").spaceId}/environments/${__classPrivateFieldGet(this, _ContentfulFetcher_config, "f").environment || "master"}/${args.path}?${params.toString()}`, args.options);
                return yield res.json();
            }
            catch (e) {
                console.error(e);
                return null;
            }
        }));
        /**
         * @async @function getEntry
         * @description Make a Contentful request to a single entry
         */
        this.getEntry = (entryId, preview = false, unAdaptedData = false) => __awaiter(this, void 0, void 0, function* () {
            const data = yield __classPrivateFieldGet(this, _ContentfulFetcher_cfFetch, "f").call(this, {
                path: `entries/${entryId}`,
                preview,
            });
            if (!data)
                return null;
            if (unAdaptedData)
                return data;
            return __classPrivateFieldGet(this, _ContentfulFetcher_adaptor, "f").adapt(data);
        });
        /**
         * @async @function getEntries
         * @description Make a Contentful request to retrieve multiple entries
         */
        this.getEntries = ({ query, preview = false, unAdaptedData = false, options, }) => __awaiter(this, void 0, void 0, function* () {
            const cfData = yield __classPrivateFieldGet(this, _ContentfulFetcher_cfFetch, "f").call(this, {
                path: `entries`,
                searchParams: query,
                preview,
                options,
            });
            if (!cfData)
                return null;
            const wrappedData = (0, stringifySafe_1.stringifySafe)(cfData);
            const formattedData = {
                items: (0, contentful_resolve_response_1.default)(wrappedData, {
                    removeUnresolved: true,
                    itemEntryPoints: ["fields"],
                }),
                total: cfData.total,
                skip: cfData.skip,
                limit: cfData.limit,
            };
            if (!unAdaptedData) {
                formattedData.items = formattedData.items.map((item) => __classPrivateFieldGet(this, _ContentfulFetcher_adaptor, "f").adapt(item));
            }
            return formattedData;
        });
        /**
         * @async @function getInitialEntry
         * @description Make a Contentful request to retrieve multiple entries and return the first result if found
         */
        this.getInitialEntry = (arg) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield this.getEntries(arg);
            return (_a = data === null || data === void 0 ? void 0 : data.items) === null || _a === void 0 ? void 0 : _a[0];
        });
        __classPrivateFieldSet(this, _ContentfulFetcher_config, config, "f");
        __classPrivateFieldSet(this, _ContentfulFetcher_adaptor, adaptor || new contentful_graphql_1.ContentfulAdaptor(), "f");
        __classPrivateFieldSet(this, _ContentfulFetcher_defaultIsPreview, isPreview || false, "f");
    }
}
exports.ContentfulFetcher = ContentfulFetcher;
_ContentfulFetcher_config = new WeakMap(), _ContentfulFetcher_adaptor = new WeakMap(), _ContentfulFetcher_defaultIsPreview = new WeakMap(), _ContentfulFetcher_cfFetch = new WeakMap();
