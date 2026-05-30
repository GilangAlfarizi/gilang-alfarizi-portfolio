import type { Skill, SkillType } from "@/types/skill";
import {
	CAPABILITIES_DISPLAY_ORDER,
	SKILL_TYPE_LABELS,
} from "@/types/skill";

export interface SkillCategoryGroup {
	id: SkillType;
	label: string;
	skills: Skill[];
	strength: number;
	isPrimary: boolean;
}

export function groupSkillsByType(skills: Skill[]): SkillCategoryGroup[] {
	const buckets: Record<SkillType, Skill[]> = {
		FRONTEND: [],
		BACKEND: [],
		UI_UX: [],
	};

	for (const skill of skills) {
		if (buckets[skill.type]) {
			buckets[skill.type].push(skill);
		}
	}

	const total = skills.length || 1;

	const groups = CAPABILITIES_DISPLAY_ORDER.map((type) => {
		const items = [...buckets[type]].sort((a, b) =>
			a.title.localeCompare(b.title),
		);
		return {
			id: type,
			label: SKILL_TYPE_LABELS[type],
			skills: items,
			strength: Math.round((items.length / total) * 100),
			isPrimary: false,
		};
	});

	const maxStrength = Math.max(...groups.map((g) => g.strength), 0);

	return groups.map((group) => ({
		...group,
		isPrimary: group.strength === maxStrength && maxStrength > 0,
	}));
}
