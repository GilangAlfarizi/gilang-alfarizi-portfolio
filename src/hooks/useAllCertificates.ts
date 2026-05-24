import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api/client";
import { fetchCertificates } from "@/lib/api/certificates";
import type { Certificate } from "@/types/certificate";

interface UseAllCertificatesResult {
	certificates: Certificate[];
	total: number;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

const FETCH_PAGE_SIZE = 100;

export function useAllCertificates(): UseAllCertificatesResult {
	const [certificates, setCertificates] = useState<Certificate[]>([]);
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
					page: 1,
					pageSize: FETCH_PAGE_SIZE,
				});

				if (!cancelled) {
					setCertificates(result.data);
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
					setTotal(0);
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
	}, [reloadKey]);

	return { certificates, total, loading, error, refetch };
}
