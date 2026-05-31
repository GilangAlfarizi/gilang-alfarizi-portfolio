import { motion } from "motion/react";

import { easeOut } from "@/lib/motion/presets";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/skill";

import { SkillIcon } from "./SkillIcon";

interface SkillTileProps {
	skill: Skill;
	className?: string;
}

export function SkillTile({ skill, className }: SkillTileProps) {
	return (
		<motion.button
			type="button"
			className={cn(
				"group relative flex size-9 shrink-0 items-center justify-center rounded-md border border-white/12 bg-black/45 outline-none transition-colors hover:border-emerald-400/40 focus-visible:border-emerald-400/50 focus-visible:ring-2 focus-visible:ring-emerald-400/40 sm:size-10",
				className,
			)}
			initial={false}
			whileHover={{ scale: 1.06 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2, ease: easeOut }}
			aria-label={skill.title}>
			<span className="pointer-events-none absolute -top-7 left-1/2 z-20 max-w-36 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-black/90 px-2 py-0.5 text-[10px] font-medium text-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
				{skill.title}
			</span>
			<SkillIcon slug={skill.icon} title={skill.title} size={18} />
		</motion.button>
	);
}
