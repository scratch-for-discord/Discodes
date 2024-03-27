import { describe, it, expect } from 'vitest';
import { LOG_CODE, LOG_WARNINGS } from '$lib/constants/debug';

describe('All debug variables are false', () => {
	it('Code doesnt log', () => {
		expect(LOG_CODE).toBe(false);
	});

	it("Warnings doesn't log", () => {
		expect(LOG_WARNINGS).toBe(false)
	})
});
