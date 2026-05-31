import { motion } from "motion/react";
import { forwardRef, useMemo, useState } from "react";

import { useSkills } from "@/hooks/useSkills";
import { groupSkillsByType } from "@/lib/skills/groupSkillsByType";
import type { SkillCategoryGroup } from "@/lib/skills/groupSkillsByType";
import { fadeUp, staggerContainer } from "@/lib/motion/presets";

import { CapabilitiesErrorState } from "../CapabilitiesErrorState";
import { CapabilitiesLoadingState } from "../CapabilitiesLoadingState";
import { CapabilitiesMobileCategories } from "../CapabilitiesMobileCategories";
import { SkillsCategorySheet } from "../SkillsCategorySheet";
import { StrengthChart } from "../StrengthChart";
import { TechCategoryGrid } from "../TechCategoryGrid";

export const CapabilitiesBeat = forwardRef<HTMLDivElement>(
	function CapabilitiesBeat(_, ref) {
		const { skills, loading, error, refetch } = useSkills();
		const categories = useMemo(() => groupSkillsByType(skills), [skills]);
		const [sheetCategory, setSheetCategory] =
			useState<SkillCategoryGroup | null>(null);

		if (loading) {
			return (
				<div ref={ref} className="size-full">
					<CapabilitiesLoadingState />
				</div>
			);
		}

		if (error) {
			return (
				<div ref={ref} className="size-full">
					<CapabilitiesErrorState message={error} onRetry={refetch} />
				</div>
			);
		}

		if (skills.length === 0) {
			return (
				<div
					ref={ref}
					className="flex size-full items-center justify-center px-6 text-center text-sm text-white/55">
					No skills published yet.
				</div>
			);
		}

		return (
			<>
				<div
					ref={ref}
					className="size-full overflow-y-auto overflow-x-hidden px-4 pr-10 pb-6 sm:px-6 sm:pr-12 md:overflow-hidden">
					<motion.div
						className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center gap-5 py-2 md:max-h-full md:grid md:grid-cols-[1.35fr_0.65fr] md:items-stretch md:gap-6 lg:gap-8"
						variants={staggerContainer}
						initial="hidden"
						animate="visible">
						<div className="flex min-h-0 flex-col gap-4 md:gap-5">
							<motion.div
								variants={fadeUp}
								className="shrink-0 text-center md:text-left">
								<p className="text-[10px] tracking-[0.22em] text-emerald-400 uppercase sm:text-xs">
									Arsenal
								</p>
								<h2 className="mt-2 font-display text-2xl font-bold tracking-[0.06em] text-white uppercase sm:text-3xl lg:text-4xl">
									Capabilities & Arsenal
								</h2>
								<p className="mt-2 max-w-xl text-xs leading-relaxed text-white/65 sm:text-sm">
									Various technologies and disciplines I use to build your
									coherent application.
								</p>
							</motion.div>

							<CapabilitiesMobileCategories
								categories={categories}
								onSelect={setSheetCategory}
							/>

							<div className="hidden flex-col gap-4 lg:flex lg:gap-5">
								{categories.map((category) => (
									<TechCategoryGrid key={category.id} category={category} />
								))}
							</div>
						</div>

						<motion.div
							variants={fadeUp}
							className="shrink-0 md:flex md:min-h-0 md:flex-col">
							<StrengthChart categories={categories} className="md:h-full" />
						</motion.div>
					</motion.div>
				</div>

				<SkillsCategorySheet
					category={sheetCategory}
					onClose={() => setSheetCategory(null)}
				/>
			</>
		);
	},
);
