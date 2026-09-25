export interface Env {
	p6: D1Database;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const { results } = await env.p6
			.prepare("SELECT * FROM users")
			.all();

		return Response.json(results);
	},
} satisfies ExportedHandler<Env>;