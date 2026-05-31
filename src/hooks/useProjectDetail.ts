import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api/client";
import { fetchProjectById } from "@/lib/api/projects";
import type { ProjectDetail } from "@/types/project";

interface UseProjectDetailResult {
	project: ProjectDetail | null;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useProjectDetail(
	projectId: number | null,
): UseProjectDetailResult {
	const [project, setProject] = useState<ProjectDetail | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [reloadKey, setReloadKey] = useState(0);

	const refetch = useCallback(() => {
		setReloadKey((key) => key + 1);
	}, []);

	useEffect(() => {
		if (projectId === null) {
			setProject(null);
			setLoading(false);
			setError(null);
			return;
		}

		let cancelled = false;
		const id = projectId;

		async function load() {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchProjectById(id);
				if (!cancelled) {
					setProject(data);
				}
			} catch (err) {
				if (!cancelled) {
					const message =
						err instanceof ApiError
							? err.message
							: "Failed to load project";
					setError(message);
					setProject(null);
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
	}, [projectId, reloadKey]);

	return { project, loading, error, refetch };
}
