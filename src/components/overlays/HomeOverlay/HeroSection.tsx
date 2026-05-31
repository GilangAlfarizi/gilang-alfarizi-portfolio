import { motion } from "motion/react";

import { MotionButton } from "@/components/ui/motion-button";
import { useNavigation } from "@/hooks/useNavigation";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion/presets";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ScrollHint } from "./ScrollHint";

const HEADLINE_LINES = [
	"Fabricating",
	"Creative-Complex",
	"Applications",
] as const;

export function HeroSection() {
	const { setActiveSection } = useNavigation();

	return (
		<motion.section
			className="flex w-full max-w-3xl flex-col items-center px-1 text-center mt-0 lg:mt-6 lg:max-w-4xl xl:max-w-5xl"
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
			aria-label="Introduction">
			<motion.p
				variants={fadeUp}
				className="mb-6 text-xs font-medium tracking-[0.2em] text-emerald-400 uppercase sm:text-sm">
				Status: Exploratory Phase
			</motion.p>

			<h1 className="font-display space-y-1 text-3xl leading-[1.05] font-bold tracking-[0.08em] text-white uppercase sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
				{HEADLINE_LINES.map((line) => (
					<motion.span key={line} variants={fadeUp} className="block">
						{line}
					</motion.span>
				))}
			</h1>

			<motion.p
				variants={fadeUp}
				className="mt-8 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
				Fullstack Developer casually cooking high-performance backend
				architecture, complex logic, sprinkled with cinematic and fresh web
				design for comfortable experiences.
			</motion.p>

			<motion.div variants={fadeUp} className="mt-10">
				<MotionButton
					variant="glass"
					className="px-8 py-3 text-xs tracking-[0.2em] uppercase sm:text-sm"
					onClick={() => setActiveSection("projects")}>
					Explore My Collection
				</MotionButton>
			</motion.div>

			<motion.div variants={fadeIn} className="mt-5">
				<div className=" inset-x-4 bottom-24 flex justify-center gap-3 lg:hidden">
					<MobileCard label="Server Side" value="APIs & Architecture" />
					<MobileCard label="Client Side" value="ReactJs & NextJs" />
				</div>
			</motion.div>

		</motion.section>
	);
}

function MobileCard({ label, value }: { label: string; value: string }) {
	return (
		<motion.div
			className=""
			initial="hidden"
			animate="visible"
			variants={fadeUp}>
			<GlassPanel className="rounded-xl px-3 py-2.5 max-w-52">
				<p className="text-[9px] tracking-wider text-white/50 uppercase">
					{label}
				</p>
				<p className="mt-0.5 truncate text-xs font-semibold text-white">
					{value}
				</p>
			</GlassPanel>
		</motion.div>
	);
}
