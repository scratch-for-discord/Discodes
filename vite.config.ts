import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"]
	},
	// REQUIRED FOR WEB CONTAINERS! DO NOT REMOVE
	server: {
		headers: {
			"Cross-Origin-Embedder-Policy": "require-corp",
			"Cross-Origin-Opener-Policy": "same-origin"
		}
	}
});
