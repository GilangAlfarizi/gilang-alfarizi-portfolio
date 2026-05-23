import { motion } from "motion/react";
import { forwardRef } from "react";

import { TECH_CATEGORIES } from "@/data/tech-stack";
import { fadeUp, staggerContainer } from "@/lib/motion/presets";

import { StrengthChart } from "../StrengthChart";
import { TechCategoryGrid } from "../TechCategoryGrid";

export const CapabilitiesBeat = forwardRef<HTMLDivElement>(
	function CapabilitiesBeat(_, ref) {
	return (
		<div
			ref={ref}
			className="size-full overflow-y-auto overflow-x-hidden px-4 pb-6 sm:px-6 lg:overflow-hidden"
		>
			<motion.div
				className="mx-auto flex min-h-full max-w-6xl flex-col justify-center gap-6 py-2 md:grid md:max-h-full md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-8 lg:gap-10"
				variants={staggerContainer}
				initial="hidden"
				animate="visible"
			>
				<div className="space-y-4 md:space-y-5">
					<motion.div variants={fadeUp} className="text-center md:text-left">
						<p className="text-[10px] tracking-[0.22em] text-emerald-400 uppercase sm:text-xs">
							Arsenal
						</p>
						<h2 className="mt-2 font-display text-2xl font-bold tracking-[0.06em] text-white uppercase sm:text-3xl lg:text-4xl">
							Capabilities & Arsenal
						</h2>
						<p className="mt-2 max-w-xl text-xs leading-relaxed text-white/65 sm:text-sm">
							Tools and disciplines I use to ship cinematic interfaces and
							reliable fullstack systems.
						</p>
					</motion.div>

					<div className="grid gap-4 sm:gap-5 md:grid-cols-1 lg:grid-cols-3">
						{TECH_CATEGORIES.map((category) => (
							<TechCategoryGrid
								key={category.id}
								category={category}
							/>
						))}
					</div>
				</div>

				<div className="md:pt-4">
					<StrengthChart />
				</div>
			</motion.div>
		</div>
	);
},
);
