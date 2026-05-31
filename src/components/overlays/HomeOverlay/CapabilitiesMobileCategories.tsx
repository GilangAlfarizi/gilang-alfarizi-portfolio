import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { MotionButton } from "@/components/ui/motion-button";
import type { SkillCategoryGroup } from "@/lib/skills/groupSkillsByType";
import { fadeUp } from "@/lib/motion/presets";

interface CapabilitiesMobileCategoriesProps {
	categories: SkillCategoryGroup[];
	onSelect: (category: SkillCategoryGroup) => void;
}

export function CapabilitiesMobileCategories({
	categories,
	onSelect,
}: CapabilitiesMobileCategoriesProps) {
	return (
		<div className="flex flex-col gap-2 lg:hidden">
			{categories.map((category) => (
				<motion.div key={category.id} variants={fadeUp}>
					<MotionButton
						variant="glass"
						className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left"
						onClick={() => onSelect(category)}
					>
						<span className="font-display text-sm font-bold tracking-[0.12em] text-white uppercase">
							{category.label}
						</span>
						<span className="flex items-center gap-2 text-[11px] text-white/55">
							{category.skills.length} skills
							<ChevronRight className="size-4 text-emerald-400/80" />
						</span>
					</MotionButton>
				</motion.div>
			))}
		</div>
	);
}
