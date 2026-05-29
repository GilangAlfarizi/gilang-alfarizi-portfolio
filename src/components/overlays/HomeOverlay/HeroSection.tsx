import { motion } from "motion/react";

import { MotionButton } from "@/components/ui/motion-button";
import { useNavigation } from "@/hooks/useNavigation";
import { fadeUp, staggerContainer } from "@/lib/motion/presets";

const HEADLINE_LINES = ["Engineering", "Motion-Driven", "Interfaces"] as const;

export function HeroSection() {
	const { setActiveSection } = useNavigation();

	return (
		<motion.section
			className="flex max-w-3xl flex-col items-center text-center mt-0 lg:mt-8"
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
			aria-label="Introduction">
			<motion.p
				variants={fadeUp}
				className="mb-6 text-xs font-medium tracking-[0.2em] text-emerald-400 uppercase sm:text-sm">
				Status: Exploratory Phase
			</motion.p>

			<h1 className="font-display space-y-1 text-4xl leading-[1.05] font-bold tracking-[0.08em] text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl">
				{HEADLINE_LINES.map((line) => (
					<motion.span key={line} variants={fadeUp} className="block">
						{line}
					</motion.span>
				))}
			</h1>

			<motion.p
				variants={fadeUp}
				className="mt-8 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
				Fullstack Developer & Creative Technologist exploring the intersection
				of design and cinematic web experiences.
			</motion.p>

			<motion.div variants={fadeUp} className="mt-10">
				<MotionButton
					variant="glass"
					className="px-8 py-3 text-xs tracking-[0.2em] uppercase sm:text-sm"
					onClick={() => setActiveSection("projects")}>
					Explore My World
				</MotionButton>
			</motion.div>
		</motion.section>
	);
}
