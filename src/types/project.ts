export interface Project {
	id: number;
	title: string;
	description: string;
	coverImageUrl: string | null;
}

export interface ProjectsListResponse {
	data: Project[];
}
