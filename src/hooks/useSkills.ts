import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/lib/api/client";
import { fetchSkills } from "@/lib/api/skills";
import type { Skill } from "@/types/skill";

interface UseSkillsResult {
	skills: Skill[];
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useSkills(): UseSkillsResult {
	const [skills, setSkills] = useState<Skill[]>([]);
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
				const data = await fetchSkills();
				if (!cancelled) {
					setSkills(data);
				}
			} catch (err) {
				if (!cancelled) {
					const message =
						err instanceof ApiError
							? err.message
							: "Failed to load skills";
					setError(message);
					setSkills([]);
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

	return { skills, loading, error, refetch };
}
