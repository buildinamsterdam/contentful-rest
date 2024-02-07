import { LooseObject } from "./types";

export type Adaptor = (entry: LooseObject) => LooseObject;

export type AdaptorTypes = {
	[x: string | number | symbol]: Adaptor;
};

export type ContentfulAdaptorArgs = {
	fieldAdaptors?: AdaptorTypes;
	contentAdaptors?: AdaptorTypes;
	pageAdaptors?: AdaptorTypes;
};

const fallbackPageAdaptor: Adaptor = (x) => x;

const getEntryContentType = (data: LooseObject): string =>
	data?.sys?.contentType?.sys?.id || "";

const getFieldType = (data: LooseObject): string => data?.sys?.type || "";

/**
 * @function ContentfulAdaptor
 * @description Generate a client to adapt the provided data
 */
export class ContentfulAdaptor {
	#fieldAdaptors: AdaptorTypes = {};
	#pageAdaptors: AdaptorTypes = {};
	#contentAdaptors: AdaptorTypes = {};

	constructor(args?: ContentfulAdaptorArgs) {
		const {
			fieldAdaptors = {},
			contentAdaptors = {},
			pageAdaptors = {},
		} = args || {};

		this.#fieldAdaptors = fieldAdaptors;
		this.#contentAdaptors = contentAdaptors;
		this.#pageAdaptors = pageAdaptors;
	}

	/**
	 * @function adaptContentType
	 * @description
	 */
	#adaptData = <T>(data: T): T | Array<unknown> | null => {
		//? Falsy data should always be null so it's parsable by NextJS, 'undefined' throws
		if (!data) return null;

		//? If we get an array loop the data so we resolved adapted data
		if (Array.isArray(data)) {
			return data.map((dataEntry: unknown) => this.#adaptData(dataEntry));
		}

		if (typeof data !== "object") return data;

		const contentType = getEntryContentType(data);

		if (contentType === "") {
			const fieldType = getFieldType(data);
			const fieldAdaptor = this.#fieldAdaptors[fieldType];

			if (!!fieldAdaptor) return fieldAdaptor(data);
		}

		const adaptedData = Object.entries(data).reduce(
			(acc: LooseObject, [key, val]) => {
				acc[key] = this.#adaptData(val);
				return acc;
			},
			{},
		);

		const adaptor = this.#contentAdaptors[contentType];

		if (!adaptor) return adaptedData;
		return adaptor(adaptedData);
	};

	adapt = <T extends LooseObject>(data: T) => {
		if (typeof data !== "object" && !Array.isArray(data)) return null;

		const contentType = getEntryContentType(data);

		const pageAdaptor = this.#pageAdaptors[contentType] || fallbackPageAdaptor;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return pageAdaptor(this.#adaptData(data as any));
	};
}
