import { Cloud, Code2, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { getSimpleIcon } from "@/lib/skills/simpleIconRegistry";
import { normalizeIconSlug } from "@/lib/skills/simpleIconAliases";
import { cn } from "@/lib/utils";

interface SkillIconProps {
	slug: string;
	title: string;
	className?: string;
	size?: number;
}

const LUCIDE_FALLBACKS: Record<string, LucideIcon> = {
	amazonwebservices: Cloud,
	monitor: Monitor,
};

function LucideFallback({
	slug,
	title,
	size,
	className,
}: SkillIconProps) {
	const normalized = normalizeIconSlug(slug);
	const Icon =
		LUCIDE_FALLBACKS[normalized] ?? LUCIDE_FALLBACKS[slug] ?? Code2;

	return (
		<Icon
			className={cn("text-emerald-400", className)}
			size={size}
			strokeWidth={1.75}
			aria-label={title}
		/>
	);
}

export function SkillIcon({
	slug,
	title,
	className,
	size = 16,
}: SkillIconProps) {
	const icon = getSimpleIcon(slug);

	if (!icon) {
		return (
			<LucideFallback
				slug={slug}
				title={title}
				size={size}
				className={className}
			/>
		);
	}

	return (
		<svg
			role="img"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			className={cn("shrink-0 text-emerald-400", className)}
			aria-label={title}
		>
			<title>{title}</title>
			<path fill="currentColor" d={icon.path} />
		</svg>
	);
}
