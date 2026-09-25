export interface Env {
	p6: D1Database;
}

export async function getUsers(db: D1Database) {
	const { results } = await db
		.prepare("SELECT * FROM users")
		.all();

	return results;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const results = await getUsers(env.p6);

		return Response.json(results);
	},
} satisfies ExportedHandler<Env>;