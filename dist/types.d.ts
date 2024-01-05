import { Entry } from "contentful";
export type LooseObject = {
    [x: string | number | symbol]: any;
};
export type SearchParams = Record<string, string | number>;
export type Query = SearchParams & {
    content_type?: string;
    locale?: string;
    include?: number;
};
export type EntriesList = {
    items: Entry[];
    total: number;
    skip: number;
    limit: number;
};
export type SimplifiedSys = {
    id: string;
    contentType: string;
    createdAt: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
    updatedAt: `${number}-${number}-${number}T${number}:${number}:${number}Z`;
};
export type ContentAdaptors = {
    [EntryName in string]: AdaptorFunction;
};
export type AdaptorConfig = {
    stripSysData: boolean;
    _parents: string[];
};
export type AdaptorArgs = {
    contentAdaptors?: ContentAdaptors;
    config?: {
        stripSysData?: boolean;
    };
};
export type AdaptorFunction = (entry: LooseObject, config: AdaptorConfig) => LooseObject;
export type EntriesResponse<T extends LooseObject> = {
    items: T[];
    total: number;
    skip: number;
    limit: number;
};
