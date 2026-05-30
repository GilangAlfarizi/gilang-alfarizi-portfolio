import { apiGet } from "@/lib/api/client";
import type { Skill, SkillsResponse } from "@/types/skill";

export async function fetchSkills(): Promise<Skill[]> {
	const response = await apiGet<SkillsResponse>("/skill");
	return response.data ?? [];
}
