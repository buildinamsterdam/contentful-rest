import { ContentfulAdaptor } from "../src";

const DATA = {
	sys: {
		id: "691tO7BJhybu2T4Hg8KrPZ",
		contentType: {
			sys: {
				id: "page",
			},
		},
	},
	fields: {
		title: "Page title",
		body: [
			{
				sys: {
					id: "691tO7BJhybu2T4Hg8KrPZ1",
					contentType: {
						sys: {
							id: "content",
						},
					},
				},
				fields: { title: "Block title" },
			},
			{
				sys: {
					id: "691tO7BJhybu2T4Hg8KrPZ2",
					contentType: {
						sys: {
							id: "media",
						},
					},
				},
				fields: {
					src: {
						sys: {
							type: "Asset",
						},
						fields: {
							src: "http://",
						},
					},
				},
			},
		],
	},
};

const CIRCULAR_DATA = {
	sys: {
		id: "691tO7BJhybu2T4Hg8KrPZ",
		contentType: {
			sys: {
				id: "page",
			},
		},
	},
	fields: {
		title: "Original",
		link: {
			sys: {
				id: "691tO7BJhybu2T4Hg8KrPZ",
				contentType: {
					sys: {
						id: "page",
					},
				},
			},
			fields: {
				title: "Original",
				link: "test",
			},
		},
	},
};

describe("ContentfulAdaptor", () => {
	it("should adapt sync adaptors", async () => {
		const Adaptor = new ContentfulAdaptor({
			fieldAdaptors: {
				Asset: (data) => data.fields.src,
			},
			contentAdaptors: {
				content: (data) => {
					return { ...data, subtitle: "Block subtitle" };
				},
			},
			pageAdaptors: {
				page: (data) => {
					return { ...data, title: "Adapted page title" };
				},
			},
		});

		const outcome = (await Adaptor.adapt(DATA)) || {};

		expect(outcome.title).toBe("Adapted page title");
		expect(outcome.fields.body[0].subtitle).toBe("Block subtitle");
		expect(outcome.fields.body[1].fields.src).toBe("http://");
	});

	it("should work with async adaptors", async () => {
		const Adaptor = new ContentfulAdaptor({
			fieldAdaptors: {
				Asset: async () => "test-123",
			},
			contentAdaptors: {
				content: async (data) => {
					return { ...data, subtitle: "Awaited block subtitle" };
				},
			},
			pageAdaptors: {
				page: (data) => {
					return { ...data, title: "Adapted page title" };
				},
			},
		});

		const outcome = (await Adaptor.adapt(DATA)) || {};

		expect(outcome.title).toBe("Adapted page title");
		expect(outcome.fields.body[0].subtitle).toBe("Awaited block subtitle");
		expect(outcome.fields.body[1].fields.src).toBe("test-123");
	});

	it("should work with adaptors returning null", async () => {
		const Adaptor = new ContentfulAdaptor({
			fieldAdaptors: {
				Asset: async () => "test-123",
			},
			contentAdaptors: {
				content: () => {
					return null;
				},
			},
			pageAdaptors: {
				page: (data) => {
					return { ...data, title: "Adapted page title" };
				},
			},
		});

		const outcome = (await Adaptor.adapt(DATA)) || {};

		expect(outcome.title).toBe("Adapted page title");
		expect(outcome.fields.body[0]).toBe(null);
	});

	it("should work references to itself", async () => {
		const Adaptor = new ContentfulAdaptor({
			pageAdaptors: {
				page: (data) => {
					return { ...data, title: "Adapted page title" };
				},
			},
		});
		const outcome = (await Adaptor.adapt(CIRCULAR_DATA)) || {};

		//? First title should be adapted the link should not since the IDs of the entries are the same
		expect(outcome.title).toBe("Adapted page title");
		expect(outcome.fields.link.fields.title).toBe("Original");
	});
});
