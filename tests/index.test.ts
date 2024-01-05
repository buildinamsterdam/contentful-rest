import { renderHook } from "@testing-library/react";

import useHook from "../dist";

describe("The hook", () => {
  it("should work with the first argument", () => {
    const baz = renderHook(() => useHook({ foo: "foo" }));
    expect(baz.result.current).toEqual("foo");
  });

  it("should work with both arguments", () => {
    const baz = renderHook(() => useHook({ foo: "foo", bar: "bar" }));
    expect(baz.result.current).toEqual("foobar");
  });
});
