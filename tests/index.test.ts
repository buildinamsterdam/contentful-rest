import { ContentfulAdaptor } from "../src";

const DATA = {
	sys: {
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

describe("ContentfulAdaptor", () => {
	it("should work with the first argument", () => {
		const Adaptor = new ContentfulAdaptor({
			fieldAdaptors: {
				Asset: (data) => data.fields.src,
			},
			contentAdaptors: {
				content: (data) => ({ ...data, subtitle: "Block subtitle" }),
			},
			pageAdaptors: {
				page: (data) => ({ ...data, title: "Adapted page title" }),
			},
		});

		const outcome = Adaptor.adapt(DATA) || {};

		expect(outcome.title).toBe("Adapted page title");
		expect(outcome.fields.body[0].subtitle).toBe("Block subtitle");
		expect(outcome.fields.body[1].fields.src).toBe("http://");
	});
});
