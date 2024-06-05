import { LooseObject } from "./types";

export type AdaptorResponse = LooseObject | null;

export type Adaptor = (
	entry: LooseObject,
) => Promise<AdaptorResponse> | AdaptorResponse;

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

const getEntryId = (data: LooseObject): string => data?.sys?.id || "";

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
	#adaptData = async <T>(
		data: T,
		parentIdMap: Record<string, boolean> = {},
	): Promise<T | Array<unknown> | null> => {
		//? Falsy data should always be null so it's parsable by NextJS, 'undefined' throws
		if (!data) return null;

		//? If we get an array loop the data so we resolved adapted data
		if (Array.isArray(data)) {
			const formattedData: unknown[] = [];

			for (const dataEntry of data) {
				formattedData.push(await this.#adaptData(dataEntry, parentIdMap));
			}

			return formattedData;
		}

		if (typeof data !== "object") return data;

		const contentType = getEntryContentType(data);

		if (contentType === "") {
			const fieldType = getFieldType(data);
			const fieldAdaptor = this.#fieldAdaptors[fieldType];

			if (!!fieldAdaptor) return await fieldAdaptor(data);
		}

		//? If the current entry is already adapted as a parent, abort to fix circular runtime
		const contentId = getEntryId(data);
		if (contentId && parentIdMap[contentId]) return data;

		const adaptedData: LooseObject = {};

		for (const [key, val] of Object.entries(data)) {
			adaptedData[key] = await this.#adaptData(
				val,
				contentId ? { ...parentIdMap, [contentId]: true } : parentIdMap,
			);
		}

		const adaptor = this.#contentAdaptors[contentType];

		if (!adaptor) return adaptedData;
		return await adaptor(adaptedData);
	};

	adapt = async <T extends LooseObject>(data: T) => {
		if (typeof data !== "object" && !Array.isArray(data)) return null;

		const contentType = getEntryContentType(data);

		const pageAdaptor = this.#pageAdaptors[contentType] || fallbackPageAdaptor;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return await pageAdaptor(await this.#adaptData(data as any));
	};
}
