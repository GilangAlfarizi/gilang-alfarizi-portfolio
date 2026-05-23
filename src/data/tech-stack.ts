import {
	Box,
	Braces,
	Cloud,
	Code2,
	Container,
	Database,
	GitBranch,
	Globe,
	Layers,
	Palette,
	PenTool,
	Server,
	Sparkles,
	Wind,
	type LucideIcon,
} from "lucide-react";

export type TechCategoryId = "frontend" | "uiUx" | "backend";

export interface TechItem {
	name: string;
	icon: LucideIcon;
}

export interface TechCategory {
	id: TechCategoryId;
	label: string;
	strength: number;
	items: TechItem[];
}

export const TECH_CATEGORIES: TechCategory[] = [
	{
		id: "frontend",
		label: "Frontend",
		strength: 92,
		items: [
			{ name: "React", icon: Layers },
			{ name: "TypeScript", icon: Braces },
			{ name: "Next.js", icon: Globe },
			{ name: "Vite", icon: Sparkles },
			{ name: "Motion", icon: Code2 },
			{ name: "Three.js", icon: Box },
		],
	},
	{
		id: "uiUx",
		label: "UI / UX",
		strength: 86,
		items: [
			{ name: "Figma", icon: PenTool },
			{ name: "Tailwind", icon: Wind },
			{ name: "Design Systems", icon: Palette },
			{ name: "Prototyping", icon: PenTool },
			{ name: "Motion UI", icon: Sparkles },
			{ name: "Accessibility", icon: Layers },
		],
	},
	{
		id: "backend",
		label: "Backend",
		strength: 88,
		items: [
			{ name: "NestJS", icon: Server },
			{ name: "Node.js", icon: Braces },
			{ name: "PostgreSQL", icon: Database },
			{ name: "REST APIs", icon: Cloud },
			{ name: "Git", icon: GitBranch },
			{ name: "Docker", icon: Container },
		],
	},
];
