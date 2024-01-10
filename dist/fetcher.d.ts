import { Entry } from "contentful";
import { EntriesResponse, Query } from "./types";
type ContentfulConfig = {
    spaceId: string;
    environment?: string;
    accessToken: string;
    previewToken?: string;
};
export type ContentfulAdaptorClass = {
    adapt: <T>(x: any) => T;
};
type ContentfulFetcherArgs = {
    config: ContentfulConfig;
    adaptor: ContentfulAdaptorClass;
    isPreview?: boolean;
};
type getEntriesArg = {
    query: Query;
    preview?: boolean;
    unAdaptedData?: boolean;
    options?: RequestInit;
};
export declare class ContentfulFetcher {
    #private;
    constructor({ config, adaptor, isPreview }: ContentfulFetcherArgs);
    /**
     * @async @function getEntry
     * @description Make a Contentful request to a single entry
     */
    getEntry: <T extends Entry<import("contentful").EntrySkeletonType<import("contentful").FieldsType, string>, import("contentful").ChainModifiers, string>>(entryId: string, preview?: boolean, unAdaptedData?: boolean) => Promise<T | null>;
    /**
     * @async @function getEntries
     * @description Make a Contentful request to retrieve multiple entries
     */
    getEntries: <T extends Entry<import("contentful").EntrySkeletonType<import("contentful").FieldsType, string>, import("contentful").ChainModifiers, string>>({ query, preview, unAdaptedData, options, }: getEntriesArg) => Promise<EntriesResponse<T> | null>;
    /**
     * @async @function getInitialEntry
     * @description Make a Contentful request to retrieve multiple entries and return the first result if found
     */
    getInitialEntry: <T extends Entry<import("contentful").EntrySkeletonType<import("contentful").FieldsType, string>, import("contentful").ChainModifiers, string>>(arg: getEntriesArg) => Promise<T | undefined>;
}
export {};
