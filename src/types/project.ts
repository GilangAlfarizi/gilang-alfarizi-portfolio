export interface Project {
	id: number;
	title: string;
	description: string;
	coverImageUrl: string | null;
}

export interface ProjectImage {
	id: number;
	slug: string;
	image: string;
	description: string;
	projectId: number;
	createdAt: string;
	updatedAt: string;
}

export interface ProjectDetail {
	id: number;
	title: string;
	description: string;
	images: ProjectImage[];
	createdAt: string;
	updatedAt: string;
}

export interface ProjectsListResponse {
	data: Project[];
}

export interface ProjectDetailResponse {
	data: ProjectDetail;
}
