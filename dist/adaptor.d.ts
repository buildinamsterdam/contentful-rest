import { LooseObject } from "./types";
export type Adaptor = (entry: LooseObject) => LooseObject;
export type AdaptorTypes = {
    [x: string | number | symbol]: Adaptor;
};
export type ContentfulAdaptorArgs = {
    contentAdaptors: AdaptorTypes;
    pageAdaptors: AdaptorTypes;
};
/**
 * @function ContentfulAdaptor
 * @description Generate a client to adapt the provided data
 */
export declare class ContentfulAdaptor {
    #private;
    constructor(args?: ContentfulAdaptorArgs);
    adapt: <T extends LooseObject>(data: T) => LooseObject | null;
}
