"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentfulFetcher = exports.enableLivePreview = exports.ContentfulAdaptor = void 0;
var contentful_graphql_1 = require("@buildinams/contentful-graphql");
Object.defineProperty(exports, "ContentfulAdaptor", { enumerable: true, get: function () { return contentful_graphql_1.ContentfulAdaptor; } });
var getIndicatorProps_1 = require("@buildinams/contentful-graphql/dist/getIndicatorProps");
Object.defineProperty(exports, "enableLivePreview", { enumerable: true, get: function () { return getIndicatorProps_1.enableLivePreview; } });
var fetcher_1 = require("./fetcher");
Object.defineProperty(exports, "ContentfulFetcher", { enumerable: true, get: function () { return fetcher_1.ContentfulFetcher; } });
