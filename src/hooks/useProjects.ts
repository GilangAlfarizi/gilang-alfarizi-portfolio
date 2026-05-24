import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api/client";
import { fetchProjects } from "@/lib/api/projects";
import type { Project } from "@/types/project";

interface UseProjectsResult {
	projects: Project[];
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useProjects(): UseProjectsResult {
	const [projects, setProjects] = useState<Project[]>([]);
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
				const data = await fetchProjects();
				if (!cancelled) {
					setProjects(data);
				}
			} catch (err) {
				if (!cancelled) {
					const message =
						err instanceof ApiError
							? err.message
							: "Failed to load projects";
					setError(message);
					setProjects([]);
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

	return { projects, loading, error, refetch };
}
