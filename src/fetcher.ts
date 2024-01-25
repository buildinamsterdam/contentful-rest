import { Entry } from "contentful";
import resolveResponse from "contentful-resolve-response";

import { ContentfulAdaptor } from "./adaptor";
import { stringifySafe } from "./utils/stringifySafe";
import {
	EntriesList,
	EntriesResponse,
	LooseObject,
	SearchParams,
	getEntriesArg,
	getEntryArg,
} from "./types";

const API_BASE_URL = "https://cdn.contentful.com";
const API_PREVIEW_URL = "https://preview.contentful.com";

type ContentfulConfig = {
	spaceId: string;
	environment?: string;
	accessToken: string;
	previewToken?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContentfulAdaptorClass = any;

type ContentfulFetcherArgs = {
	config: ContentfulConfig;
	adaptor: ContentfulAdaptorClass;
	isPreview?: boolean;
};

type FetchArgs = {
	path: string;
	searchParams?: SearchParams;
	preview?: boolean;
	options?: RequestInit;
};

export class ContentfulFetcher {
	#config: ContentfulConfig;
	#adaptor: ContentfulAdaptorClass;
	#defaultIsPreview = false;

	constructor({ config, adaptor, isPreview }: ContentfulFetcherArgs) {
		this.#config = config;
		this.#adaptor = adaptor || new ContentfulAdaptor();
		this.#defaultIsPreview = isPreview || false;
	}

	#cfFetch = async <T extends LooseObject>(
		args: FetchArgs,
	): Promise<T | null> => {
		try {
			const isPreview =
				(args.preview || this.#defaultIsPreview) &&
				Boolean(this.#config.previewToken);
			const baseUrl = isPreview ? API_PREVIEW_URL : API_BASE_URL;

			const params = new URLSearchParams({
				...args.searchParams,
				access_token:
					(isPreview && this.#config.previewToken) || this.#config.accessToken,
			});

			const res = await fetch(
				`${baseUrl}/spaces/${this.#config.spaceId}/environments/${
					this.#config.environment || "master"
				}/${args.path}?${params.toString()}`,
				args.options,
			);
			return await res.json();
		} catch (e) {
			console.error(e);
			return null;
		}
	};

	/**
	 * @async @function getEntry
	 * @description Make a Contentful request to a single entry
	 */
	getEntry = async <T extends LooseObject>({
		entryId,
		preview = false,
		unAdaptedData = false,
		options,
	}: getEntryArg) => {
		const data = await this.#cfFetch<Entry>({
			path: `entries/${entryId}`,
			preview,
			options,
		});

		if (!data) return null;
		if (unAdaptedData) return data as unknown as T;
		return this.#adaptor.adapt(data) as T;
	};

	/**
	 * @async @function getEntries
	 * @description Make a Contentful request to retrieve multiple entries
	 */
	getEntries = async <T extends LooseObject>({
		query,
		preview = false,
		unAdaptedData = false,
		options,
	}: getEntriesArg) => {
		const cfData = await this.#cfFetch<EntriesList>({
			path: `entries`,
			searchParams: query,
			preview,
			options,
		});

		if (!cfData) return null;

		const wrappedData = stringifySafe(cfData);

		const formattedData = {
			items: resolveResponse(wrappedData, {
				removeUnresolved: true,
				itemEntryPoints: ["fields"],
			}) as T[],
			total: cfData.total,
			skip: cfData.skip,
			limit: cfData.limit,
		};

		if (!unAdaptedData) {
			formattedData.items = formattedData.items.map((item) =>
				this.#adaptor.adapt(item),
			);
		}

		return formattedData as EntriesResponse<T>;
	};

	/**
	 * @async @function getInitialEntry
	 * @description Make a Contentful request to retrieve multiple entries and return the first result if found
	 */
	getInitialEntry = async <T extends LooseObject>(arg: getEntriesArg) => {
		const data = await this.getEntries<T>(arg);
		return data?.items?.[0];
	};
}
