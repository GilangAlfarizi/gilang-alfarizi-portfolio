export type SkillType = "FRONTEND" | "BACKEND" | "UI_UX";

export interface Skill {
	id: number;
	title: string;
	icon: string;
	type: SkillType;
}

export interface SkillsResponse {
	data: Skill[];
}

export const SKILL_TYPE_ORDER: SkillType[] = [
	"FRONTEND",
	"BACKEND",
	"UI_UX",
];

/** Stacked rows on Capabilities beat (matches design mockup). */
export const CAPABILITIES_DISPLAY_ORDER: SkillType[] = [
	"BACKEND",
	"FRONTEND",
	"UI_UX",
];

export const SKILL_TYPE_LABELS: Record<SkillType, string> = {
	FRONTEND: "Frontend",
	BACKEND: "Backend",
	UI_UX: "UI / UX",
};
