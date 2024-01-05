import jsonStringifySafe from "json-stringify-safe";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringifySafe = (data: any) => {
	return Object.defineProperty(data, "stringifySafe", {
		enumerable: false,
		configurable: false,
		writable: false,
		value: (serializer = null, indent = "") => {
			return jsonStringifySafe(this, serializer, indent, (_key, value) => {
				return {
					sys: {
						type: "Link",
						linkType: "Entry",
						id: value.sys.id,
						circular: true,
					},
				};
			});
		},
	});
};
