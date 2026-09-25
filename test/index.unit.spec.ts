import { describe, it, expect, vi } from "vitest";
import { getUsers } from "../src/index";

describe("getUsers", () => {
	it("returns users from the database", async () => {
		const mockUsers = [
			{
				id: 1,
				name: "Test User",
				age: 23,
			},
		];

		const mockAll = vi.fn().mockResolvedValue({
			results: mockUsers,
		});

		const mockPrepare = vi.fn().mockReturnValue({
			all: mockAll,
		});

		const mockDb = {
			prepare: mockPrepare,
		} as unknown as D1Database;

		const result = await getUsers(mockDb);

		expect(mockPrepare).toHaveBeenCalledWith(
			"SELECT * FROM users"
		);

		expect(mockAll).toHaveBeenCalled();

		expect(result).toEqual(mockUsers);
	});
});