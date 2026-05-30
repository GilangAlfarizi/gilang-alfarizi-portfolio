import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import type { SkillCategoryGroup } from "@/lib/skills/groupSkillsByType";
import { fadeUp, staggerContainer } from "@/lib/motion/presets";
import { cn } from "@/lib/utils";

interface StrengthChartProps {
	categories: SkillCategoryGroup[];
	className?: string;
}

export function StrengthChart({ categories, className }: StrengthChartProps) {
	if (categories.length === 0) return null;

	const maxStrength = Math.max(...categories.map((c) => c.strength), 1);

	return (
		<motion.div
			variants={staggerContainer}
			initial="hidden"
			animate="visible"
			className={cn("flex h-full flex-col", className)}>
			<motion.div variants={fadeUp} className="mb-3 hidden md:block">
				<p className="text-[10px] tracking-[0.2em] text-emerald-400/90 uppercase">
					Strength profile
				</p>
			</motion.div>

			<GlassPanel className="flex min-h-48 flex-1 flex-col rounded-xl p-4 sm:min-h-56 sm:p-5 md:min-h-[min(52vh,420px)] md:rounded-2xl">
				{/* Mobile: compact horizontal bars */}
				<div className="space-y-3 md:hidden">
					{categories.map((category) => (
						<motion.div
							key={category.id}
							variants={fadeUp}
							className="space-y-1.5">
							<div className="flex items-center justify-between gap-2 text-[11px]">
								<span className="font-medium text-white/85">
									{category.label}
								</span>
								<span
									className={
										category.isPrimary
											? "font-semibold text-emerald-400"
											: "text-white/50"
									}>
									{category.strength}%
								</span>
							</div>
							<div className="h-1.5 overflow-hidden rounded-full bg-white/10">
								<motion.div
									className={
										category.isPrimary
											? "h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-300"
											: "h-full rounded-full bg-white/40"
									}
									initial={{ width: 0 }}
									animate={{ width: `${category.strength}%` }}
									transition={{
										duration: 0.8,
										ease: [0.22, 1, 0.36, 1],
									}}
								/>
							</div>
						</motion.div>
					))}
				</div>

				{/* Desktop: vertical bar chart (mockup-style) */}
				<div className="hidden flex-1 flex-col md:flex">
					<div className="flex flex-1 items-end justify-center gap-6 px-2 pb-2 pt-4">
						{categories.map((category, index) => {
							const barHeight = Math.max(
								12,
								Math.round((category.strength / maxStrength) * 100),
							);
							console.log(barHeight);

							return (
								<motion.div
									key={category.id}
									variants={fadeUp}
									className="flex min-w-0 flex-1 flex-col items-center gap-2	">
									
									<div className="relative h-96 w-12">
										<motion.div
											className={cn(
												"absolute bottom-0 left-0 w-full max-w-12 rounded-t-sm",
												category.isPrimary
													? "bg-linear-to-t from-emerald-600 to-emerald-300"
													: "bg-white/35",
											)}
											initial={{ height: 0 }}
											animate={{ height: `${barHeight}%` }}
											transition={{
												duration: 0.85,
												delay: index * 0.08,
												ease: [0.22, 1, 0.36, 1],
											}}
										/>
									</div>

									<span
										className={cn(
											"text-[10px] font-medium tabular-nums",
											category.isPrimary ? "text-emerald-400" : "text-white/50",
										)}>
										{category.strength}%
									</span>

									<span className="text-center text-[10px] font-medium tracking-[0.14em] text-white/75 uppercase">
										{category.label}
									</span>
								</motion.div>
							);
						})}
					</div>
				</div>
			</GlassPanel>
		</motion.div>
	);
}
