import { describe, it, expect, expectTypeOf } from "vitest";
import { LOG_CODE, LOG_WARNINGS } from "$lib/constants/debug";
import salt from "$lib/utils/helpers/salt";

describe("All debug variables are false", () => {
	it("Code doesn't log", () => {
		expect(LOG_CODE).toBe(false);
	});

	it("Warnings log", () => {
		expect(LOG_WARNINGS).toBe(false);
	});
});

describe("salt function works", () => {
	it("Salt returns a string", () => {
		expectTypeOf(salt(10)).toMatchTypeOf<string>();
	});
	it("Salt returns correct length", () => {
		expect(salt(10).length).toBe(10);
	});
});
