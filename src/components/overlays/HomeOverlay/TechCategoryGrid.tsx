import { motion } from "motion/react";

import { SkillTile } from "@/components/skills/SkillTile";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { SkillCategoryGroup } from "@/lib/skills/groupSkillsByType";
import { fadeUp } from "@/lib/motion/presets";

interface TechCategoryGridProps {
	category: SkillCategoryGroup;
}

export function TechCategoryGrid({ category }: TechCategoryGridProps) {
	return (
		<motion.div variants={fadeUp} className="space-y-2">
			<p className="text-[10px] font-medium tracking-[0.22em] text-white/80 uppercase sm:text-[11px]">
				{category.label}
			</p>

			<GlassPanel className="min-h-14 rounded-xl px-3 py-3 sm:min-h-16 sm:px-4 sm:py-3.5">
				{category.skills.length > 0 ? (
					<div className="flex flex-wrap gap-2 sm:gap-2.5">
						{category.skills.map((skill) => (
							<SkillTile key={skill.id} skill={skill} />
						))}
					</div>
				) : (
					<p className="text-xs text-white/35">No skills in this category yet.</p>
				)}
			</GlassPanel>
		</motion.div>
	);
}
