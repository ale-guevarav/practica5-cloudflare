import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["test/**/*.unit.spec.ts"],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "html"],
			include: ["src/**/*.ts"],
		},
	},
});