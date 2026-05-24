import { apiGet } from "@/lib/api/client";
import type {
	CertificatesQuery,
	PaginatedCertificates,
} from "@/types/certificate";
import { CERTIFICATES_PAGE_SIZE } from "@/types/certificate";

interface CertificatesApiResponse {
	data: PaginatedCertificates;
}

export async function fetchCertificates(
	query: CertificatesQuery = {},
): Promise<PaginatedCertificates> {
	const response = await apiGet<CertificatesApiResponse>("/certificate", {
		page: query.page ?? 1,
		pageSize: query.pageSize ?? CERTIFICATES_PAGE_SIZE,
	});

	return response.data;
}
