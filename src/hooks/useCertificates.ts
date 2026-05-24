import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api/client";
import { fetchCertificates } from "@/lib/api/certificates";
import type { Certificate } from "@/types/certificate";
import { CERTIFICATES_PAGE_SIZE } from "@/types/certificate";

interface UseCertificatesResult {
	certificates: Certificate[];
	page: number;
	totalPages: number;
	total: number;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useCertificates(page: number): UseCertificatesResult {
	const [certificates, setCertificates] = useState<Certificate[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [reloadKey, setReloadKey] = useState(0);

	const refetch = useCallback(() => {
		setReloadKey((key) => key + 1);
	}, []);

	useEffect(() => {
		let cancelled = false;

		async function load() {
			setLoading(true);
			setError(null);

			try {
				const result = await fetchCertificates({
					page,
					pageSize: CERTIFICATES_PAGE_SIZE,
				});

				if (!cancelled) {
					setCertificates(result.data);
					setTotalPages(Math.max(result.totalPages, 1));
					setTotal(result.total);
				}
			} catch (err) {
				if (!cancelled) {
					const message =
						err instanceof ApiError
							? err.message
							: "Failed to load certificates";
					setError(message);
					setCertificates([]);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		load();

		return () => {
			cancelled = true;
		};
	}, [page, reloadKey]);

	return {
		certificates,
		page,
		totalPages,
		total,
		loading,
		error,
		refetch,
	};
}
