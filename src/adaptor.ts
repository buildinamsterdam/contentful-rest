import { LooseObject } from "./types";

export type Adaptor = (entry: LooseObject) => LooseObject;

export type AdaptorTypes = {
	[x: string | number | symbol]: Adaptor;
};

export type ContentfulAdaptorArgs = {
	contentAdaptors: AdaptorTypes;
	pageAdaptors: AdaptorTypes;
};

const fallbackPageAdaptor: Adaptor = (x) => x;

/**
 * @function ContentfulAdaptor
 * @description Generate a client to adapt the provided data
 */
export class ContentfulAdaptor {
	#pageAdaptors: AdaptorTypes = {};
	#contentAdaptors: AdaptorTypes = {};

	constructor(args?: ContentfulAdaptorArgs) {
		const { contentAdaptors = {}, pageAdaptors = {} } = args || {};
		this.#contentAdaptors = contentAdaptors;
		this.#pageAdaptors = pageAdaptors;
	}

	/**
	 * @function adaptContentType
	 * @description
	 */
	#adaptData = <T>(data: T): T | Array<unknown> | null => {
		//? Falsey data should always be null so it's parseble by NextJS, 'undefined' throws
		if (!data) return null;

		//? If we get an array loop the data so we resolved adapted data
		if (Array.isArray(data)) {
			return data.map((dataEntry: unknown) => this.#adaptData(dataEntry));
		}

		if (typeof data !== "object") return data;

		const adaptedData = Object.entries(data).reduce(
			(acc: LooseObject, [key, val]) => {
				acc[key] = this.#adaptData(val);
				return acc;
			},
			{},
		);

		const adaptor = this.#contentAdaptors[adaptedData.__typename];

		if (!adaptor) return adaptedData;
		return adaptor(adaptedData);
	};

	adapt = <T extends LooseObject>(data: T) => {
		if (typeof data !== "object" && !Array.isArray(data)) return null;

		const contentType = data?.sys?.contentType?.sys?.id || "";

		const pageAdaptor = this.#pageAdaptors[contentType] || fallbackPageAdaptor;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return pageAdaptor(this.#adaptData(data as any));
	};
}
