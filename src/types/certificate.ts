export interface Certificate {
	id: number;
	title: string;
	issuer: string;
	issuedAt: string;
	image: string | null;
	credential: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface PaginatedCertificates {
	data: Certificate[];
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface CertificatesQuery {
	page?: number;
	pageSize?: number;
}

export const CERTIFICATES_PAGE_SIZE = 6;
export const CERTIFICATES_DESKTOP_PAGE_SIZE = 6;
export const CERTIFICATES_MOBILE_PAGE_SIZE = 3;
export const CERTIFICATES_GRID_COLS = 3;
export const CERTIFICATES_DESKTOP_ROWS = 2;
