import { motion } from "motion/react";

import { fadeUp } from "@/lib/motion/presets";

interface OverlaySectionHeaderProps {
	eyebrow: string;
	title: string;
}

export function OverlaySectionHeader({
	eyebrow,
	title,
}: OverlaySectionHeaderProps) {
	return (
		<motion.header
			className="pointer-events-none shrink-0 px-4 pt-4 text-center sm:px-6"
			initial="hidden"
			animate="visible"
			variants={fadeUp}
		>
			<p className="text-[10px] tracking-[0.22em] text-emerald-400 uppercase sm:text-xs">
				{eyebrow}
			</p>
			<h2 className="font-display mt-2 text-2xl font-bold tracking-[0.06em] text-white uppercase sm:text-3xl lg:text-4xl">
				{title}
			</h2>
		</motion.header>
	);
}
