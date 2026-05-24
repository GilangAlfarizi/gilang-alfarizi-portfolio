import { apiGet } from "@/lib/api/client";
import type { Project, ProjectsListResponse } from "@/types/project";

export async function fetchProjects(): Promise<Project[]> {
	const response = await apiGet<ProjectsListResponse>("/project");
	return response.data ?? [];
}
