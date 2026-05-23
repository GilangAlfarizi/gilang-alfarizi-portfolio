import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import type { TechCategory } from "@/data/tech-stack";
import { fadeUp, staggerContainer } from "@/lib/motion/presets";

interface TechCategoryGridProps {
	category: TechCategory;
}

export function TechCategoryGrid({ category }: TechCategoryGridProps) {
	return (
		<motion.div
			variants={staggerContainer}
			initial="hidden"
			animate="visible"
			className="flex flex-col gap-2"
		>
			<motion.p
				variants={fadeUp}
				className="text-[10px] tracking-[0.2em] text-emerald-400/90 uppercase"
			>
				{category.label}
			</motion.p>

			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
				{category.items.map((item) => {
					const Icon = item.icon;
					return (
						<motion.div key={item.name} variants={fadeUp}>
							<GlassPanel className="flex items-center gap-2 rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5">
								<div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 sm:size-8">
									<Icon
										className="size-3.5 sm:size-4"
										strokeWidth={1.75}
									/>
								</div>
								<span className="truncate text-[11px] font-medium text-white/90 sm:text-xs">
									{item.name}
								</span>
							</GlassPanel>
						</motion.div>
					);
				})}
			</div>
		</motion.div>
	);
}
