import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { fadeUp } from "@/lib/motion/presets";

import { HeroSection } from "../HeroSection";
import { InfoCards } from "../InfoCards";
import { ScrollHint } from "../ScrollHint";

export function HeroBeat() {
	return (
		<div className="relative flex size-full min-h-0 justify-center px-4 pr-10 sm:px-6 sm:pr-12">
			<HeroSection />

			<div className="pointer-events-none absolute right-4 bottom-1/2 hidden max-w-xs translate-y-1/2 lg:block xl:right-8">
				<InfoCards />
			</div>

			<div className="absolute inset-x-4 bottom-32 flex gap-3 lg:hidden">
				<MobileCard label="Core Tech" value="React & NestJs" />
				<MobileCard label="Creative" value="Three.js & GLSL" />
			</div>

			<ScrollHint />
		</div>
	);
}

function MobileCard({ label, value }: { label: string; value: string }) {
	return (
		<motion.div
			className="flex-1"
			initial="hidden"
			animate="visible"
			variants={fadeUp}
		>
			<GlassPanel className="rounded-xl px-3 py-2.5">
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
