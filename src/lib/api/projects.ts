import { apiGet } from "@/lib/api/client";
import type {
	Project,
	ProjectDetail,
	ProjectDetailResponse,
	ProjectsListResponse,
} from "@/types/project";

export async function fetchProjects(): Promise<Project[]> {
	const response = await apiGet<ProjectsListResponse>("/project");
	return response.data ?? [];
}

export async function fetchProjectById(id: number): Promise<ProjectDetail> {
	const response = await apiGet<ProjectDetailResponse>(`/project/${id}`);
	return response.data;
}
