import { env } from "cloudflare:test";

import { describe, it, expect } from "vitest";
import worker from "../src/index";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("Cloudflare Worker with D1", () => {
	it("reads users from the D1 database", async () => {
		await env.p6
			.prepare(
				"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)"
			)
			.run();

		await env.p6.prepare("DELETE FROM users").run();

		await env.p6
			.prepare("INSERT INTO users (name, age) VALUES (?, ?)")
			.bind("Test User", 23)
			.run();

		const request = new IncomingRequest("http://example.com");

		const response = await worker.fetch(request, env);

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data).toEqual([
			{
				id: 1,
				name: "Test User",
				age: 23,
			},
		]);
	});
});