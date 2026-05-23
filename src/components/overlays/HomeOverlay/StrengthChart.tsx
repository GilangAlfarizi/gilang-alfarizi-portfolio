import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { TECH_CATEGORIES } from "@/data/tech-stack";
import { fadeUp, staggerContainer } from "@/lib/motion/presets";

export function StrengthChart() {
	const maxStrength = Math.max(
		...TECH_CATEGORIES.map((category) => category.strength),
	);

	return (
		<motion.div
			variants={staggerContainer}
			initial="hidden"
			animate="visible"
			className="flex flex-col gap-3"
		>
			<motion.div variants={fadeUp}>
				<p className="text-[10px] tracking-[0.2em] text-emerald-400/90 uppercase">
					Strength profile
				</p>
				<p className="mt-1 text-xs text-white/55">
					Relative depth across disciplines — higher means primary focus.
				</p>
			</motion.div>

			<GlassPanel className="space-y-4 rounded-2xl p-4 sm:p-5">
				{TECH_CATEGORIES.map((category) => {
					const isPrimary =
						category.strength === maxStrength;

					return (
						<motion.div
							key={category.id}
							variants={fadeUp}
							className="space-y-2"
						>
							<div className="flex items-center justify-between gap-3">
								<span className="text-xs font-medium tracking-wide text-white/85">
									{category.label}
								</span>
								<span
									className={
										isPrimary
											? "text-xs font-semibold text-emerald-400"
											: "text-xs text-white/55"
									}
								>
									{category.strength}%
									{isPrimary ? " · Primary" : ""}
								</span>
							</div>

							<div className="h-2 overflow-hidden rounded-full bg-white/10">
								<motion.div
									className={
										isPrimary
											? "h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
											: "h-full rounded-full bg-gradient-to-r from-white/35 to-white/55"
									}
									initial={{ width: 0 }}
									animate={{
										width: `${category.strength}%`,
									}}
									transition={{
										duration: 0.9,
										delay: 0.15,
										ease: [0.22, 1, 0.36, 1],
									}}
								/>
							</div>
						</motion.div>
					);
				})}
			</GlassPanel>
		</motion.div>
	);
}
